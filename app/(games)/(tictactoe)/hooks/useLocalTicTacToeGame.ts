import { useState, useCallback } from "react";
import { aiMakeMove } from "../services/aiPlayer";
import { checkWinner } from "../utils/gameUtils";

/**
 * Custom hook for managing a local Tic-Tac-Toe game against AI
 */
const useLocalTicTacToeGame = () => {
  const [board, setBoard] = useState<Array<"X" | "O" | null>>(
    Array(9).fill(null)
  );
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [lastMove, setLastMove] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [rematchRequested, setRematchRequested] = useState<boolean>(false);

  const opponentName = "AI Opponent";

  // GamePlayer move handler
  const makeMove = useCallback(
    (position: number) => {
      if (
        !isActive ||
        board[position] !== null ||
        currentTurn !== playerSymbol ||
        winner
      ) {
        return false;
      }

      // Update board with player's move
      const newBoard = [...board];
      newBoard[position] = playerSymbol;
      setBoard(newBoard);
      setLastMove(position);
      setCurrentTurn(playerSymbol === "X" ? "O" : "X");

      // Check for winner after player's move
      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
        setIsActive(false);
        return true;
      }

      // If no winner, AI will make a move after a short delay
      setTimeout(() => {
        handleAIMove(newBoard);
      }, Math.random() * 500 + 500); // Random delay between 0.5-1s for more natural feeling

      return true;
    },
    [board, currentTurn, playerSymbol, isActive, winner]
  );

  // AI move handler
  const handleAIMove = useCallback(
    (currentBoard: Array<"X" | "O" | null>) => {
      // If game is over or not AI's turn, don't make a move
      if (!isActive || winner) return;

      // Get AI move using the service function
      const aiPosition = aiMakeMove(currentBoard);

      if (aiPosition === null) return;

      // Update board with AI's move
      const newBoard = [...currentBoard];
      newBoard[aiPosition] = playerSymbol === "X" ? "O" : "X";
      setBoard(newBoard);
      setLastMove(aiPosition);
      setCurrentTurn(playerSymbol);

      // Check if this move creates a win or draw
      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
        setIsActive(false);
      }
    },
    [isActive, winner, playerSymbol]
  );

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentTurn("X");
    setWinner(null);
    setLastMove(null);
    setIsActive(true);
    setRematchRequested(false);
  }, []);

  // Simulate forfeit
  const forfeitGame = useCallback(() => {
    setWinner(playerSymbol === "X" ? "O" : "X");
    setIsActive(false);
  }, [playerSymbol]);

  // Request rematch
  const requestRematch = useCallback(() => {
    setRematchRequested(true);
    // In local mode, AI always accepts, so auto-reset after a brief delay
    setTimeout(() => {
      resetGame();
    }, 500);
  }, [resetGame]);

  // Set board directly (primarily for testing)
  const updateBoard = useCallback((newBoard: Array<"X" | "O" | null>) => {
    setBoard(newBoard);
    // Check for winner on the new board
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setIsActive(false);
    }
  }, []);

  // Set player's turn
  const setIsPlayerTurn = useCallback(
    (isPlayerTurn: boolean) => {
      setCurrentTurn(
        isPlayerTurn ? playerSymbol : playerSymbol === "X" ? "O" : "X"
      );
    },
    [playerSymbol]
  );

  // Update player symbol
  const updatePlayerSymbol = useCallback((symbol: "X" | "O") => {
    console.log("Setting local player symbol:", symbol);
    setPlayerSymbol(symbol);
  }, []);

  // Dummy ping method (not needed for local play but required for interface compatibility)
  const ping = useCallback(() => true, []);

  return {
    board,
    currentTurn,
    playerSymbol,
    isPlayerTurn: currentTurn === playerSymbol,
    winner,
    isActive,
    lastMove,
    opponentName,
    isConnected: true, // Always connected in local play
    error: null,
    rematchOffered: rematchRequested,
    makeMove,
    forfeitGame,
    requestRematch,
    acceptRematch: resetGame,
    // Added methods for compatibility with useTicTacToeGame
    setBoard: updateBoard,
    setIsPlayerTurn,
    setPlayerSymbol: updatePlayerSymbol,
    resetGame,
    ping,
  };
};

export default useLocalTicTacToeGame;
