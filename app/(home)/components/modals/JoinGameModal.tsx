import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { gameModalStyles } from "@/styles/componentStyles/gameModalStyles";
import { ticTacToeStyles } from "@/styles/componentStyles/tictactoeStyles";
import { Ionicons } from "@expo/vector-icons";
import { RivalsServer } from "@/components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TicTacToeGame from "../../../(games)/TicTacToeGame";
import useTicTacToeGame, { GameMessageTypes } from "@/hooks/useTicTacToeGame";
import { GamePlayer, GameStage, GameModalProps } from "@/interface/types";

const JoinGameModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [stage, setStage] = useState<GameStage>("join");
  const [isLoading, setIsLoading] = useState(false);
  const [playerID, setPlayerID] = useState<string | null>(null);
  const [gameID, setGameID] = useState<string | null>(null);
  const [isLocalPlay, setIsLocalPlay] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>({
    id: null,
    name: "VikingDestroyer",
    avatar: "V",
    imageSource: require("@/assets/images/placeholders/haaland.png"),
    isReady: false,
    symbol: "X" as "X" | "O",
    score: 20,
    level: 9,
    colors: ["#80ff80", "#ff8080", "#80ff80", "#ff8080", "#80ff80"], // W L W L W
  });

  const [opponent, setOpponent] = useState<GamePlayer>({
    id: "opponent-id",
    name: "Xx_KaiCenat_xX",
    avatar: "K",
    imageSource: require("@/assets/images/placeholders/kai_cenat.png"),
    isReady: false,
    symbol: "O",
    score: -20,
    level: 7,
    colors: ["#ff8080", "#ff8080", "#80ff80", "#80ff80", "#ff8080"], // L L W W L
  });

  // Match date and time
  const [matchInfo, setMatchInfo] = useState({
    date: "05 March, 2025",
    time: "16:30",
  });

  // Selected options for the game
  const [selectedFormat, setSelectedFormat] = useState<string>("PUBLIC");
  const [selectedStake, setSelectedStake] = useState<string>("£0.00");
  const [selectedTimeLimit, setSelectedTimeLimit] =
    useState<string>("UNLIMITED");
  const [selectedFirstMove, setSelectedFirstMove] = useState<string>("RANDOM");

  // Add a local play function to set up a game without server
  const setupLocalGame = () => {
    // Set local play mode
    setIsLocalPlay(true);

    // Generate a local game ID
    const localGameID = "local-" + Date.now();
    setGameID(localGameID);

    // Set up players
    setCurrentPlayer((prev) => ({
      ...prev,
      isReady: true,
      symbol: "X",
    }));

    setOpponent((prev) => ({
      ...prev,
      isReady: true,
      name: "AI Opponent",
      avatar: "AI",
      symbol: "O",
    }));

    // Move directly to playing stage
    setStage("playing");
  };

  // Add a modified version of the hook for local play
  const useLocalTicTacToeGame = () => {
    const [localBoard, setLocalBoard] = useState<Array<"X" | "O" | null>>(
      Array(9).fill(null)
    );
    const [localTurn, setLocalTurn] = useState<"X" | "O">("X");
    const [localWinner, setLocalWinner] = useState<"X" | "O" | "draw" | null>(
      null
    );
    const [localLastMove, setLocalLastMove] = useState<number | null>(null);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [rematchRequested, setRematchRequested] = useState(false);

    // Function to check for winner
    const checkWinner = (board: Array<"X" | "O" | null>) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];

      for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }

      // Check for draw
      if (!board.includes(null)) {
        return "draw";
      }

      return null;
    };

    // GamePlayer move handler
    const makePlayerMove = (position: number) => {
      if (
        !isActive ||
        localBoard[position] !== null ||
        localTurn !== "X" ||
        localWinner
      ) {
        return false;
      }

      // Update board with player's move
      const newBoard = [...localBoard];
      newBoard[position] = "X";
      setLocalBoard(newBoard);
      setLocalLastMove(position);
      setLocalTurn("O");

      // Check for winner after player's move
      const winner = checkWinner(newBoard);
      if (winner) {
        setLocalWinner(winner);
        setIsActive(false);
        return true;
      }

      // If no winner, AI will make a move after a short delay
      setTimeout(() => {
        makeAIMove(newBoard);
      }, Math.random() * 500 + 2000);

      return true;
    };

    // AI move handler
    const makeAIMove = (currentBoard: Array<"X" | "O" | null>) => {
      // If game is over or not AI's turn, don't make a move
      if (!isActive || localWinner) return;

      // Find all empty cells
      const emptyCells = currentBoard
        .map((cell, index) => (cell === null ? index : -1))
        .filter((index) => index !== -1);

      if (emptyCells.length === 0) return;

      // First check if AI can win in one move
      for (const cell of emptyCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "O";
        if (checkWinner(testBoard) === "O") {
          // AI can win, make this move
          setLocalBoard(testBoard);
          setLocalLastMove(cell);
          setLocalTurn("X");
          setLocalWinner("O");
          setIsActive(false);
          return;
        }
      }

      // Then check if player can win in one move and block it
      for (const cell of emptyCells) {
        const testBoard = [...currentBoard];
        testBoard[cell] = "X";
        if (checkWinner(testBoard) === "X") {
          // Block player's winning move
          const blockBoard = [...currentBoard];
          blockBoard[cell] = "O";
          setLocalBoard(blockBoard);
          setLocalLastMove(cell);
          setLocalTurn("X");

          // Check if this move creates a draw
          const winner = checkWinner(blockBoard);
          if (winner) {
            setLocalWinner(winner);
            setIsActive(false);
          }
          return;
        }
      }

      // If center is empty, take it
      if (currentBoard[4] === null) {
        const newBoard = [...currentBoard];
        newBoard[4] = "O";
        setLocalBoard(newBoard);
        setLocalLastMove(4);
        setLocalTurn("X");

        // Check if this move creates a win or draw
        const winner = checkWinner(newBoard);
        if (winner) {
          setLocalWinner(winner);
          setIsActive(false);
        }
        return;
      }

      // Otherwise, make a random move
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const position = emptyCells[randomIndex];

      const newBoard = [...currentBoard];
      newBoard[position] = "O";
      setLocalBoard(newBoard);
      setLocalLastMove(position);
      setLocalTurn("X");

      // Check if this move creates a win or draw
      const winner = checkWinner(newBoard);
      if (winner) {
        setLocalWinner(winner);
        setIsActive(false);
      }
    };

    // Reset game
    const resetGame = () => {
      setLocalBoard(Array(9).fill(null));
      setLocalTurn("X");
      setLocalWinner(null);
      setLocalLastMove(null);
      setIsActive(true);
      setRematchRequested(false);
    };

    // Simulate forfeit
    const forfeitGame = () => {
      setLocalWinner("O");
      setIsActive(false);
    };

    // Request rematch
    const requestRematch = () => {
      setRematchRequested(true);
      // In local mode, AI always accepts, so auto-reset after a brief delay
      setTimeout(() => {
        resetGame();
      }, 500);
    };

    return {
      board: localBoard,
      currentTurn: localTurn,
      playerSymbol: "X",
      isPlayerTurn: localTurn === "X",
      winner: localWinner,
      isActive,
      lastMove: localLastMove,
      opponentName: "AI Opponent",
      isConnected: true,
      error: null,
      rematchOffered: rematchRequested,
      makeMove: makePlayerMove,
      forfeitGame,
      requestRematch,
      acceptRematch: resetGame,
    };
  };

  // Always call both hooks but only use the one needed
  const localGameHook = useLocalTicTacToeGame();
  const onlineGameHook = useTicTacToeGame({
    socket,
    gameID: gameID || undefined,
    playerID: playerID || undefined,
    onGameEnd: (result) => {
      console.log(`Game ended: ${result}`);
      // Game end will be handled by UI buttons instead of automatic transition
    },
    initialPlayerSymbol: currentPlayer.symbol,
    timeLimit: selectedTimeLimit === "5 MIN" ? 300 : undefined,
  });

  // Choose which hook to use based on local play mode
  const gameHook = isLocalPlay ? localGameHook : onlineGameHook;

  // Destructure the game hook variables
  const {
    board,
    currentTurn,
    playerSymbol,
    isPlayerTurn,
    winner,
    isActive,
    lastMove,
    opponentName,
    isConnected,
    error,
    rematchOffered,
    makeMove,
    forfeitGame,
    requestRematch,
    acceptRematch,
  } = gameHook;

  // Function to handle player move
  const handlePlayerMove = (position: number) => {
    if (isLocalPlay) {
      makeMove(position);
    } else if (socket && gameID && playerID) {
      socket.send(
        JSON.stringify({
          type: "makeMove",
          gameID,
          playerID,
          position,
          symbol: playerSymbol,
        })
      );
    }
  };

  // Reset to initial stage when modal is opened
  useEffect(() => {
    if (visible) {
      setStage("join");
      setCurrentPlayer((prev) => ({ ...prev, isReady: false }));
      if (opponent) {
        setOpponent((prev) => ({ ...prev, isReady: false }));
      }
      setIsLocalPlay(false);
    }
  }, [visible]);

  const matchmakeFlow = (action: string) => {
    switch (action) {
      case "endGame":
        setStage("results");
        break;
      case "playAgain":
        setStage("ready");
        setCurrentPlayer((prev) => ({ ...prev, isReady: false }));
        if (opponent) {
          setOpponent((prev) => ({ ...prev, isReady: false }));
        }
        break;
      case "exitGame":
        // Return to join stage
        setStage("join");
        setIsLocalPlay(false);
        break;
    }
  };

  // Load playerID from AsyncStorage
  useEffect(() => {
    const loadPlayerID = async () => {
      try {
        const id = await AsyncStorage.getItem("playerID");
        setPlayerID(id || "user-123"); // Fallback for demo
        setCurrentPlayer((prev) => ({ ...prev, id: id || "user-123" }));
      } catch (error) {
        console.error("Error loading playerID:", error);
        // Set fallback for demo
        setPlayerID("user-123");
        setCurrentPlayer((prev) => ({ ...prev, id: "user-123" }));
      }
    };
    loadPlayerID();
  }, [isLocalPlay]);

  useEffect(() => {
    if (visible) {
      const ws = new WebSocket(RivalsServer);

      ws.onopen = async () => {
        console.log("Connected to the WebSocket server");
        setSocket(ws);

        gameHook.isConnected = true;
        // Send stored JWT for authentication
        const authToken = await AsyncStorage.getItem("authToken");
        
        if (authToken) {
          setTimeout(() => {
            ws.send(
              JSON.stringify({
                type: "authTokenVerification",
                authToken: authToken,
              })
            );
          }, 100);
        }
      };
      
      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);
          
          switch (data.type) {
            case "matchFound":
              console.log("Opponent: ", data.opponentName);
              setOpponent((prev) => ({ ...prev, name: data.opponentName }));
              setStage("ready");
              break;

            case "searchingForMatch":
              setStage("searching");
              setIsLoading(true);
              break;

            case "enteringMatch":
              console.log(gameHook.isConnected);
              setOpponent((prev) => ({ ...prev, isReady: true }));
              setStage("playing");
              console.log("Starting game");

              // Set game ID when match starts
              if (data.gameID) {
                setGameID(data.gameID);
              }
              break;

            case "waitingForOpponent":
              setOpponent((prev) => ({ ...prev, isReady: false }));
              console.log("waiting for opponent");
              break;

            case "error":
              console.log(data.error);
              break;
            case "gameState":
              gameHook.board = data.board;
              gameHook.currentTurn = data.currentTurn;
              gameHook.winner = data.winner;
              gameHook.isActive = !data.winner;
              break;
              default:
                // Other game-related messages are handled by useTicTacToeGame
                break;
              }
            } catch (err) {
          console.error(
            "Error parsing message:",
            err,
            "Raw message:",
            event.data
          );
        }
      };
      
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      
      ws.onclose = () => {
        gameHook.isConnected = false;
        console.log("Disconnected from the WebSocket server");
      };

      return () => {
        ws.close();
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [visible]);

  const startSearch = async () => {
    const playerID = await AsyncStorage.getItem("playerID");
    console.log("Matchmaking");
    socket?.send(
      JSON.stringify({
        type: "matchmake",
        playerID: playerID,
        game: "NnC",
      })
    );
    if (socket) {
      console.log(socket);
    }
  };

  const cancelSearch = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "cancelMatchmaking",
        })
      );
    }
    setStage("join");
  };

  const playerReady = () => {
    setCurrentPlayer((prev) => ({ ...prev, isReady: true }));

    // For online play, send ready signal
    if (!isLocalPlay && socket) {
      socket.send(
        JSON.stringify({
          type: "isReady",
          gameID,
          playerID,
        })
      );
      console.log("Sent ready signal:", { type: "isReady", gameID, playerID });
    } else if (isLocalPlay) {
      // For local play, immediately start the game
      setStage("playing");
    }
  };

  // Render breadcrumb navigation
  const renderBreadcrumb = () => {
    return (
      <View style={gameModalStyles.breadcrumbContainer}>
        <Image
          source={require("@/assets/images/logo-original.svg")}
          style={gameModalStyles.navLogo}
          resizeMode="contain"
        />
        <Text style={gameModalStyles.navBrand}>RIVALS</Text>
        <Text style={gameModalStyles.navSeparator}>{">"}</Text>
        <Text style={gameModalStyles.navTitle}>Join Game</Text>
      </View>
    );
  };

  // Join game stage with LOCAL option
  const renderJoinStage = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>

        <View style={gameModalStyles.optionsGrid}>
          <View style={gameModalStyles.optionRow}>
            <Text style={gameModalStyles.optionLabel}>FORMAT</Text>
            <View style={gameModalStyles.optionButtonContainer}>
              {["PUBLIC", "PRIVATE", "LOCAL"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    gameModalStyles.optionButton,
                    selectedFormat === option &&
                      gameModalStyles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedFormat(option)}
                >
                  <Text
                    style={
                      selectedFormat === option
                        ? gameModalStyles.selectedOptionText
                        : gameModalStyles.optionText
                    }
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={gameModalStyles.optionRow}>
            <Text style={gameModalStyles.optionLabel}>STAKE</Text>
            <View style={gameModalStyles.optionButtonContainer}>
              <TouchableOpacity
                style={[
                  gameModalStyles.optionButton,
                  selectedStake === "£0.00" &&
                    gameModalStyles.selectedOptionButton,
                ]}
                onPress={() => setSelectedStake("£0.00")}
              >
                <Text
                  style={
                    selectedStake === "£0.00"
                      ? gameModalStyles.selectedOptionText
                      : gameModalStyles.optionText
                  }
                >
                  £0.00
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={gameModalStyles.optionRow}>
            <Text style={gameModalStyles.optionLabel}>TIME LIMIT</Text>
            <View style={gameModalStyles.optionButtonContainer}>
              {["5 MIN", "UNLIMITED"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    gameModalStyles.optionButton,
                    selectedTimeLimit === option &&
                      gameModalStyles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedTimeLimit(option)}
                >
                  <Text
                    style={
                      selectedTimeLimit === option
                        ? gameModalStyles.selectedOptionText
                        : gameModalStyles.optionText
                    }
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={gameModalStyles.optionRow}>
            <Text style={gameModalStyles.optionLabel}>FIRST MOVE</Text>
            <View style={gameModalStyles.optionButtonContainer}>
              {["PLAYER", "RANDOM"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    gameModalStyles.optionButton,
                    selectedFirstMove === option &&
                      gameModalStyles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedFirstMove(option)}
                >
                  <Text
                    style={
                      selectedFirstMove === option
                        ? gameModalStyles.selectedOptionText
                        : gameModalStyles.optionText
                    }
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => {
            if (selectedFormat === "LOCAL") {
              setupLocalGame();
            } else {
              startSearch();
            }
          }}
        >
          <Text style={gameModalStyles.actionButtonText}>
            {selectedFormat === "LOCAL" ? "Play vs AI" : "Continue"}
          </Text>
        </TouchableOpacity>

        {/* If in LOCAL mode, show explanation */}
        {selectedFormat === "LOCAL" && (
          <Text
            style={{
              color: "#8F9BB3",
              fontSize: 12,
              textAlign: "center",
              marginTop: 10,
              paddingHorizontal: 20,
            }}
          >
            Local play lets you play against an AI opponent without requiring
            server connection.
          </Text>
        )}
      </View>
    );
  };

  // Searching for opponent stage with local play option
  const renderSearchingStage = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>

        <View style={gameModalStyles.searchingContainer}>
          <Text style={gameModalStyles.searchingText}>
            LOOKING FOR AN OPPONENT...
          </Text>
          <TouchableOpacity
            style={gameModalStyles.cancelButton}
            onPress={() => cancelSearch()}
          >
            <Text style={gameModalStyles.cancelButtonText}>Cancel Search</Text>
          </TouchableOpacity>

          {/* Add local play option */}
          <TouchableOpacity
            style={[
              gameModalStyles.actionButton,
              { marginTop: 20, backgroundColor: "#4AE9A0" },
            ]}
            onPress={setupLocalGame}
          >
            <Text style={gameModalStyles.actionButtonText}>
              Play Locally (vs AI)
            </Text>
          </TouchableOpacity>
        </View>

        {__DEV__ && (
          <TouchableOpacity
            style={[gameModalStyles.actionButton, { marginTop: 10 }]}
            onPress={() => {
              // Simulate finding an opponent
              setOpponent((prev) => ({
                ...prev,
                name: "Test Opponent",
                id: "test-id",
              }));
              setStage("ready");
            }}
          >
            <Text style={gameModalStyles.actionButtonText}>
              DEV: Skip to Ready
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Ready up stage (opponent found)
  const renderReadyStage = () => {
    if (!opponent) return null;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>

        <View style={gameModalStyles.playersContainer}>
          {/* Current player */}
          <View style={gameModalStyles.playerContainer}>
            {currentPlayer.imageSource ? (
              <Image
                source={currentPlayer.imageSource}
                style={[
                  gameModalStyles.playerImage,
                  currentPlayer.isReady && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  currentPlayer.isReady && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {currentPlayer.avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{currentPlayer.name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {currentPlayer.level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {currentPlayer.colors?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
            {!currentPlayer.isReady && (
              <Text style={gameModalStyles.notReadyText}>
                Click Ready to start!
              </Text>
            )}
          </View>

          {/* VS */}
          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          {/* Opponent */}
          <View style={gameModalStyles.playerContainer}>
            {opponent.imageSource ? (
              <Image
                source={opponent.imageSource}
                style={[
                  gameModalStyles.playerImage,
                  opponent.isReady && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  opponent.isReady && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {opponent.avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{opponent.name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {opponent.level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {opponent.colors?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => playerReady()}
          disabled={currentPlayer.isReady}
        >
          <Text style={gameModalStyles.actionButtonText}>
            {currentPlayer.isReady
              ? opponent.isReady
                ? "Start Game"
                : "Waiting..."
              : "Ready"}
          </Text>
        </TouchableOpacity>

        {__DEV__ && (
          <TouchableOpacity
            style={[
              gameModalStyles.actionButton,
              { marginTop: 10, backgroundColor: "#02F199" },
            ]}
            onPress={() => {
              // Force transition to playing stage
              setOpponent((prev) => ({ ...prev, isReady: true }));
              setStage("playing");
              // Generate a fake game ID if needed
              if (!gameID) setGameID("test-game-" + Date.now());
            }}
          >
            <Text style={gameModalStyles.actionButtonText}>
              DEV: Start Game
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Game stage with integrated Tic-Tac-Toe component
  const renderPlayingStage = () => {
    return (
      <View
        style={[
          gameModalStyles.stepContainer,
          { width: "100%", paddingBottom: 20 },
        ]}
      >
        {/* Game title with local indicator */}
        <View
          style={[gameModalStyles.gameHeaderContainer, { marginBottom: 10 }]}
        >
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
          {isLocalPlay && (
            <View
              style={{
                backgroundColor: "#4AE9A0",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                LOCAL
              </Text>
            </View>
          )}
        </View>
        {/* GamePlayer information - more compact layout */}
        <View
          style={[
            gameModalStyles.playersContainer,
            { width: "95%", maxWidth: 480 },
          ]}
        >
          {/* Current player */}
          <View
            style={[gameModalStyles.playerInfo, { flex: 1, maxWidth: 100 }]}
          >
            <View
              style={[
                gameModalStyles.playerTurnIndicator,
                isPlayerTurn && gameModalStyles.activePlayerIndicator,
              ]}
            >
              <Text style={gameModalStyles.playerTurnText}>
                {isPlayerTurn ? "YOUR TURN" : ""}
              </Text>
            </View>
            {currentPlayer.imageSource ? (
              <Image
                source={currentPlayer.imageSource}
                style={[
                  gameModalStyles.playerAvatar,
                  isPlayerTurn && gameModalStyles.activePlayerAvatar,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatarFallback,
                  isPlayerTurn && gameModalStyles.activePlayerAvatar,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {currentPlayer.avatar}
                </Text>
              </View>
            )}
            <Text
              style={gameModalStyles.playerName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentPlayer.name}
            </Text>
            <Text style={gameModalStyles.playerSymbolText}>{playerSymbol}</Text>
          </View>

          {/* VS */}
          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          {/* Opponent */}
          <View
            style={[gameModalStyles.playerInfo, { flex: 1, maxWidth: 100 }]}
          >
            <View
              style={[
                gameModalStyles.playerTurnIndicator,
                !isPlayerTurn && gameModalStyles.activePlayerIndicator,
              ]}
            >
              <Text style={gameModalStyles.playerTurnText}>
                {!isPlayerTurn ? "THEIR TURN" : ""}
              </Text>
            </View>
            {opponent.imageSource ? (
              <Image
                source={opponent.imageSource}
                style={[
                  gameModalStyles.playerAvatar,
                  !isPlayerTurn && gameModalStyles.activePlayerAvatar,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatarFallback,
                  !isPlayerTurn && gameModalStyles.activePlayerAvatar,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {opponent.avatar}
                </Text>
              </View>
            )}
            <Text
              style={gameModalStyles.playerName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isLocalPlay ? "AI Opponent" : opponentName || opponent.name}
            </Text>
            <Text style={gameModalStyles.playerSymbolText}>
              {playerSymbol === "X" ? "O" : "X"}
            </Text>
          </View>
        </View>

        {/* Game board */}
        <View
          style={[gameModalStyles.gameboardContainer, { marginVertical: 10 }]}
        >
          <TicTacToeGame
            playerSymbol={playerSymbol as "X" | "O"}
            gameState={board}
            currentTurn={currentTurn}
            isPlayerTurn={isPlayerTurn}
            onMove={handlePlayerMove}
            active={isActive}
            timeLimit={selectedTimeLimit === "5 MIN" ? 300 : undefined}
            winner={winner}
          />
        </View>
        {/* Status messages */}
        {!isConnected && !isLocalPlay && (
          <View style={[gameModalStyles.errorBanner, { width: "70%" }]}>
            <Text style={gameModalStyles.errorText}>
              Reconnecting to server...
            </Text>
          </View>
        )}

        {error && (
          <View style={[gameModalStyles.errorBanner, { width: "70%" }]}>
            <Text style={gameModalStyles.errorText}>{error}</Text>
          </View>
        )}

        {/* Game actions - more compact */}
        <View style={[gameModalStyles.gameActionsContainer, { marginTop: 5 }]}>
          {winner ? (
            // Game over actions
            <View style={[gameModalStyles.gameOverActions, { width: "70%" }]}>
              <TouchableOpacity
                style={[
                  gameModalStyles.actionButton,
                  gameModalStyles.rematchButton,
                  { paddingVertical: 8, minWidth: 120 },
                ]}
                onPress={requestRematch}
              >
                <Text
                  style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}
                >
                  {rematchOffered ? "Accept Rematch" : "Rematch"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  gameModalStyles.actionButton,
                  gameModalStyles.exitButton,
                  { paddingVertical: 8, minWidth: 120 },
                ]}
                onPress={() =>
                  isLocalPlay
                    ? matchmakeFlow("exitGame")
                    : matchmakeFlow("endGame")
                }
              >
                <Text
                  style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}
                >
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // In-game actions
            <TouchableOpacity
              style={[
                gameModalStyles.actionButton,
                gameModalStyles.forfeitButton,
                { paddingVertical: 8, width: "40%", minWidth: 120 },
              ]}
              onPress={forfeitGame}
            >
              <Text
                style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}
              >
                Forfeit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Rematch offer notification - more compact */}
        {rematchOffered && (
          <View
            style={[
              gameModalStyles.rematchNotification,
              { width: "70%", padding: 10, marginBottom: 10 },
            ]}
          >
            <Text style={[gameModalStyles.rematchText, { fontSize: 14 }]}>
              {isLocalPlay ? "AI Opponent" : "Opponent"} has requested a
              rematch!
            </Text>
            <View style={gameModalStyles.rematchButtonsContainer}>
              <TouchableOpacity
                style={[
                  gameModalStyles.actionButton,
                  gameModalStyles.acceptButton,
                  { paddingVertical: 6 },
                ]}
                onPress={acceptRematch}
              >
                <Text
                  style={[gameModalStyles.actionButtonText, { fontSize: 12 }]}
                >
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  gameModalStyles.actionButton,
                  gameModalStyles.declineButton,
                  { paddingVertical: 6 },
                ]}
                onPress={() =>
                  isLocalPlay
                    ? matchmakeFlow("exitGame")
                    : matchmakeFlow("endGame")
                }
              >
                <Text
                  style={[gameModalStyles.actionButtonText, { fontSize: 12 }]}
                >
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  // Results stage
  const renderResultsStage = () => {
    if (!opponent) return null;

    const playerResult =
      winner === playerSymbol ? "win" : winner === "draw" ? "draw" : "loss";
    const opponentResult =
      winner === playerSymbol ? "loss" : winner === "draw" ? "draw" : "win";

    // Calculate XP changes based on results
    const playerXPChange =
      playerResult === "win" ? 20 : playerResult === "draw" ? 5 : -15;
    const opponentXPChange =
      opponentResult === "win" ? 20 : opponentResult === "draw" ? 5 : -15;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
          {isLocalPlay && (
            <View
              style={{
                backgroundColor: "#4AE9A0",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                LOCAL
              </Text>
            </View>
          )}
        </View>

        {/* Game result banner */}
        <View
          style={{
            backgroundColor:
              playerResult === "win"
                ? "#4AE9A0"
                : playerResult === "draw"
                ? "#FFA500"
                : "#FF3D71",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {playerResult === "win"
              ? "YOU WON!"
              : playerResult === "draw"
              ? "DRAW!"
              : "YOU LOST!"}
          </Text>
        </View>

        <View style={gameModalStyles.playersContainer}>
          {/* Current player */}
          <View style={gameModalStyles.playerContainer}>
            <Text
              style={[
                gameModalStyles.xpText,
                { color: playerXPChange >= 0 ? "#4AE9A0" : "#FF3D71" },
              ]}
            >
              {playerXPChange >= 0 ? "+" : ""}
              {playerXPChange}XP
            </Text>
            {currentPlayer.imageSource ? (
              <Image
                source={currentPlayer.imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {currentPlayer.avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{currentPlayer.name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {currentPlayer.level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {currentPlayer.colors?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          {/* VS */}
          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          {/* Opponent */}
          <View style={gameModalStyles.playerContainer}>
            <Text
              style={[
                gameModalStyles.xpText,
                { color: opponentXPChange >= 0 ? "#4AE9A0" : "#FF3D71" },
              ]}
            >
              {opponentXPChange >= 0 ? "+" : ""}
              {opponentXPChange}XP
            </Text>
            {opponent.imageSource && !isLocalPlay ? (
              <Image
                source={opponent.imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {opponent.avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>
              {isLocalPlay ? "AI Opponent" : opponent.name}
            </Text>
            {!isLocalPlay && (
              <Text style={gameModalStyles.playerLevel}>
                Level {opponent.level}
              </Text>
            )}
            {!isLocalPlay && opponent.colors && (
              <View style={gameModalStyles.colorIndicators}>
                {opponent.colors.map((color, index) => (
                  <View
                    key={index}
                    style={[
                      gameModalStyles.colorDot,
                      { backgroundColor: color },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "70%",
          }}
        >
          <TouchableOpacity
            style={[
              gameModalStyles.actionButton,
              { flex: 1, marginHorizontal: 5, backgroundColor: "#4AE9A0" },
            ]}
            onPress={() =>
              isLocalPlay ? requestRematch() : matchmakeFlow("playAgain")
            }
          >
            <Text style={gameModalStyles.actionButtonText}>REMATCH</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              gameModalStyles.actionButton,
              { flex: 1, marginHorizontal: 5, backgroundColor: "#8F9BB3" },
            ]}
            onPress={() => matchmakeFlow("exitGame")}
          >
            <Text style={gameModalStyles.actionButtonText}>EXIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render content based on current stage
  const renderContent = () => {
    switch (stage) {
      case "join":
        return renderJoinStage();
      case "searching":
        return renderSearchingStage();
      case "ready":
        return renderReadyStage();
      case "playing":
        return renderPlayingStage();
      case "results":
        return renderResultsStage();
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={gameModalStyles.modalOverlay}>
        <View
          style={[
            gameModalStyles.modalContainer,
            {
              width: "85%",
              maxWidth: 650,
              maxHeight: "90%", // Allow more height
            },
          ]}
        >
          <View style={[gameModalStyles.modalHeader, { paddingVertical: 12 }]}>
            {renderBreadcrumb()}
            <TouchableOpacity
              style={gameModalStyles.closeButton}
              onPress={onClose}
            >
              <Text style={gameModalStyles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Add ScrollView here */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
          >
            <View
              style={[
                gameModalStyles.modalContent,
                { padding: 16, alignItems: "center" },
              ]}
            >
              {renderContent()}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Merge the styles into the gameModalStyles
const mergeStyles = () => {
  Object.assign(gameModalStyles, ticTacToeStyles);
};
mergeStyles();

export default JoinGameModal;
