import { useState, useEffect, useCallback } from "react";
import { GameState, UseTicTacToeGameProps } from "@/interface/types";

// WebSocket message types | Can change (unless not needed at all)!
export const GameMessageTypes = {
  // Client -> Server messages
  MAKE_MOVE: "makeMove", // Player makes a move
  REQUEST_GAME_STATE: "getGameState", // Request current game state
  FORFEIT_GAME: "forfeitGame", // Player forfeits the game
  RESET_GAME: "resetGame", // Request to reset the game for a rematch

  // Server -> Client messages
  GAME_START: "gameStart", // Game has started, includes player symbols
  GAME_STATE: "gameState", // Current state of the game board
  GAME_MOVE: "gameMove", // A move was made by a player
  TURN_CHANGE: "turnChange", // Turn has changed
  GAME_OVER: "gameOver", // Game has ended with a result
  PLAYER_FORFEIT: "playerForfeit", // A player has forfeited
  REMATCH_OFFERED: "rematchOffered", // Opponent offers a rematch
  REMATCH_ACCEPTED: "rematchAccepted", // Rematch has been accepted
  ERROR: "error", // Error message
};

/**
 * Custom hook for managing a Tic-Tac-Toe game with WebSocket integration
 *
 * This hook handles:
 * - Game state management
 * - WebSocket communication
 * - Turn management
 * - Move validation
 * - Winner detection
 */
export const useTicTacToeGame = ({
  socket,
  gameID,
  playerID,
  onGameEnd,
  initialPlayerSymbol = "X",
  timeLimit,
}: UseTicTacToeGameProps) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentTurn: "X", // X always goes first
    playerSymbol: initialPlayerSymbol,
    winner: null,
    isActive: true,
    lastMove: null,
  });

  // Connection status
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Rematch state
  const [rematchOffered, setRematchOffered] = useState<boolean>(false);

  // Initialize game and request current state if needed
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN && gameID) {
      setIsConnected(true);

      // Request current game state when connecting
      socket.send(
        JSON.stringify({
          type: GameMessageTypes.REQUEST_GAME_STATE,
          gameID,
          playerID,
        })
      );
    } else {
      setIsConnected(false);
    }
  }, [socket, gameID, playerID]);

  // Process incoming WebSocket messages
  const handleSocketMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received game message:", data.type);

        switch (data.type) {
          case GameMessageTypes.GAME_START:
            // Game started, set initial state
            setGameState({
              board: Array(9).fill(null),
              currentTurn: "X",
              playerSymbol: data.symbol || initialPlayerSymbol,
              winner: null,
              isActive: true,
              lastMove: null,
              opponentID: data.opponentID,
              opponentName: data.opponentName,
            });
            setError(null);
            setRematchOffered(false);
            break;

          case GameMessageTypes.GAME_STATE:
            // Update with current game state
            setGameState({
              board: data.board,
              currentTurn: data.currentTurn,
              playerSymbol: data.playerSymbol || gameState.playerSymbol,
              winner: data.winner || null,
              isActive: data.isActive !== false,
              lastMove: data.lastMove || null,
              opponentID: data.opponentID || gameState.opponentID,
              opponentName: data.opponentName || gameState.opponentName,
            });
            break;

          case GameMessageTypes.GAME_MOVE:
            // Update board with the new move
            setGameState((prev) => {
              // Create a new board with the move
              const newBoard = [...prev.board];
              newBoard[data.position] = data.symbol;

              return {
                ...prev,
                board: newBoard,
                currentTurn: prev.currentTurn === "X" ? "O" : "X",
                lastMove: data.position,
              };
            });
            break;

          case GameMessageTypes.TURN_CHANGE:
            // Update current turn
            setGameState((prev) => ({
              ...prev,
              currentTurn: data.currentTurn,
            }));
            break;

          case GameMessageTypes.GAME_OVER:
            // Game ended
            setGameState((prev) => ({
              ...prev,
              winner: data.winner,
              isActive: false,
            }));

            // Notify parent component
            if (data.winner === "draw") {
              onGameEnd?.("draw");
            } else if (data.winner === gameState.playerSymbol) {
              onGameEnd?.("win");
            } else {
              onGameEnd?.("loss");
            }
            break;

          case GameMessageTypes.PLAYER_FORFEIT:
            // Opponent forfeited
            setGameState((prev) => ({
              ...prev,
              winner: prev.playerSymbol, // If opponent forfeits, player wins
              isActive: false,
            }));

            onGameEnd?.("win");
            break;

          case GameMessageTypes.REMATCH_OFFERED:
            // Opponent offers a rematch
            setRematchOffered(true);
            break;

          case GameMessageTypes.REMATCH_ACCEPTED:
            // Rematch accepted, reset game
            setGameState({
              board: Array(9).fill(null),
              currentTurn: "X",
              playerSymbol: data.symbol || gameState.playerSymbol,
              winner: null,
              isActive: true,
              lastMove: null,
              opponentID: gameState.opponentID,
              opponentName: gameState.opponentName,
            });
            setRematchOffered(false);
            break;

          case GameMessageTypes.ERROR:
            setError(data.message || "Unknown error");
            break;

          default:
            console.log("Unhandled game message type:", data.type);
            break;
        }
      } catch (err) {
        console.error("Error processing game message:", err);
        setError("Failed to process game message");
      }
    },
    [
      gameState.playerSymbol,
      gameState.opponentID,
      initialPlayerSymbol,
      onGameEnd,
    ]
  );

  // Set up WebSocket message handler
  useEffect(() => {
    if (!socket) return;

    const messageHandler = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.gameID === gameID || !gameID) {
          handleSocketMessage(event);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.addEventListener("message", messageHandler);

    return () => {
      socket.removeEventListener("message", messageHandler);
    };
  }, [socket, gameID, handleSocketMessage]);

  // Handle player making a move
  const makeMove = useCallback(
    (position: number) => {
      // Only allow moves if:
      // - Game is active
      // - It's the player's turn
      // - The cell is empty
      // - Connected to server
      if (
        !gameState.isActive ||
        gameState.currentTurn !== gameState.playerSymbol ||
        gameState.board[position] !== null ||
        !isConnected ||
        gameState.winner
      ) {
        return false;
      }

      // Update local state immediately for responsive UI
      setGameState((prev) => {
        const newBoard = [...prev.board];
        newBoard[position] = prev.playerSymbol;

        return {
          ...prev,
          board: newBoard,
          currentTurn: prev.currentTurn === "X" ? "O" : "X",
          lastMove: position,
        };
      });

      // Send move to server
      if (socket && gameID) {
        socket.send(
          JSON.stringify({
            type: GameMessageTypes.MAKE_MOVE,
            gameID,
            playerID,
            position,
            symbol: gameState.playerSymbol,
          })
        );
      }

      return true;
    },
    [
      gameState.isActive,
      gameState.currentTurn,
      gameState.playerSymbol,
      gameState.board,
      gameState.winner,
      isConnected,
      socket,
      gameID,
      playerID,
    ]
  );

  // Forfeit the game
  const forfeitGame = useCallback(() => {
    if (!isConnected || !gameState.isActive) return;

    if (socket && gameID) {
      socket.send(
        JSON.stringify({
          type: GameMessageTypes.FORFEIT_GAME,
          gameID,
          playerID,
        })
      );

      // Update local state immediately
      setGameState((prev) => ({
        ...prev,
        winner: prev.playerSymbol === "X" ? "O" : "X",
        isActive: false,
      }));

      onGameEnd?.("loss");
    }
  }, [
    isConnected,
    gameState.isActive,
    gameState.playerSymbol,
    socket,
    gameID,
    playerID,
    onGameEnd,
  ]);

  // Request a rematch
  const requestRematch = useCallback(() => {
    if (!isConnected || gameState.isActive) return;

    if (socket && gameID) {
      socket.send(
        JSON.stringify({
          type: GameMessageTypes.RESET_GAME,
          gameID,
          playerID,
        })
      );
    }
  }, [isConnected, gameState.isActive, socket, gameID, playerID]);

  // Accept a rematch offer
  const acceptRematch = useCallback(() => {
    if (!isConnected || !rematchOffered) return;

    if (socket && gameID) {
      socket.send(
        JSON.stringify({
          type: GameMessageTypes.RESET_GAME,
          gameID,
          playerID,
          accept: true,
        })
      );
      setRematchOffered(false);
    }
  }, [isConnected, rematchOffered, socket, gameID, playerID]);

  return {
    // Game state
    board: gameState.board,
    currentTurn: gameState.currentTurn,
    playerSymbol: gameState.playerSymbol,
    isPlayerTurn: gameState.currentTurn === gameState.playerSymbol,
    winner: gameState.winner,
    isActive: gameState.isActive,
    lastMove: gameState.lastMove,
    opponentID: gameState.opponentID,
    opponentName: gameState.opponentName,

    // Connection state
    isConnected,
    error,

    // Rematch state
    rematchOffered,

    // Actions
    makeMove,
    forfeitGame,
    requestRematch,
    acceptRematch,
  };
};

export default useTicTacToeGame;
