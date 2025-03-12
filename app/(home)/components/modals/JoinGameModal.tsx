import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { RivalsServer } from "@/components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTicTacToeGame from "../../../(games)/(tictactoe)/hooks/useTicTacToeGame";
import useLocalTicTacToeGame from "../../../(games)/(tictactoe)/hooks/useLocalTicTacToeGame";
import { GamePlayer, GameStage, GameModalProps } from "@/interface/types";
import { getGameSocket } from "../../../(games)/(tictactoe)/services/gameSocket";

// Import the modular components
import GameOptionsSelector from "../gameplay/GameOptionsSelector";
import SearchingScreen from "../gameplay/SearchingScreen";
import ReadyScreen from "../gameplay/ReadyScreen";
import ResultsScreen from "../gameplay/ResultsScreen";
import GameplayScreen from "../gameplay/GameplayScreen";

/**
 * Modal component for joining and playing Tic-Tac-Toe games
 * This component manages the overall game flow but delegates UI rendering
 * to specialized components for each stage
 */
const JoinGameModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  // Game session state
  const [stage, setStage] = useState<GameStage>("join");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalPlay, setIsLocalPlay] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // Player and opponent information
  const [playerID, setPlayerID] = useState<string | null>(null);
  const [gameID, setGameID] = useState<string | null>(null);
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

  // Match information
  const [matchInfo, setMatchInfo] = useState({
    date: "05 March, 2025",
    time: "16:30",
  });

  // Game options
  const [gameOptions, setGameOptions] = useState({
    format: "PUBLIC",
    stake: "£0.00",
    timeLimit: "UNLIMITED",
    firstMove: "RANDOM",
  });

  // Socket instance for online play
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Game socket service
  const gameSocket = getGameSocket(RivalsServer);

  // Always initialize both hooks but only use the one needed
  const localGameHook = useLocalTicTacToeGame();
  const onlineGameHook = useTicTacToeGame({
    socket,
    gameID: gameID || undefined,
    playerID: playerID || undefined,
    onGameEnd: (result) => {
      console.log(`Game ended: ${result}`);
      // Game end will be handled by UI buttons instead of automatic transition
      setStage("results");
    },
    initialPlayerSymbol: currentPlayer.symbol,
    timeLimit: gameOptions.timeLimit === "5 MIN" ? 300 : undefined,
  });

  // Choose which hook to use based on local play mode
  const gameHook = isLocalPlay ? localGameHook : onlineGameHook;

  // Reset to initial stage when modal is opened
  useEffect(() => {
    if (visible) {
      setStage("join");
      setCurrentPlayer((prev) => ({ ...prev, isReady: false }));
      if (opponent) {
        setOpponent((prev) => ({ ...prev, isReady: false }));
      }
      setIsLocalPlay(false);
      setIsConnected(false);
      setConnectionAttempts(0);
      setMessage("");
    }
  }, [visible]);

  // Load playerID from AsyncStorage
  useEffect(() => {
    const loadPlayerID = async () => {
      try {
        const id = await AsyncStorage.getItem("playerID");
        console.log("Loaded playerID:", id);

        if (!id) {
          // Generate a new player ID if none exists
          const newId = `user-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;
          await AsyncStorage.setItem("playerID", newId);
          setPlayerID(newId);
          setCurrentPlayer((prev) => ({ ...prev, id: newId }));
          console.log("Generated new playerID:", newId);
        } else {
          setPlayerID(id);
          setCurrentPlayer((prev) => ({ ...prev, id: id }));
        }
      } catch (error) {
        console.error("Error loading playerID:", error);
        // Set fallback for demo
        const fallbackId = `user-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;
        setPlayerID(fallbackId);
        setCurrentPlayer((prev) => ({ ...prev, id: fallbackId }));
      }
    };
    loadPlayerID();
  }, [isLocalPlay]);

  // Connection error handler
  const handleConnectionError = useCallback(() => {
    if (connectionAttempts < 3) {
      setConnectionAttempts((prev) => prev + 1);
      setMessage(
        `Connection failed. Retrying... (${connectionAttempts + 1}/3)`
      );

      // Retry connection after a delay
      setTimeout(() => {
        if (visible && !isLocalPlay) {
          console.log("Retrying connection...");
          connectSocket();
        }
      }, 2000);
    } else {
      setMessage(
        "Connection failed after multiple attempts. Please try again later."
      );

      // Offer local play as a fallback
      Alert.alert(
        "Connection Failed",
        "Unable to connect to the game server. Would you like to play locally against AI instead?",
        [
          {
            text: "Play Locally",
            onPress: setupLocalGame,
          },
          {
            text: "Cancel",
            onPress: () => setStage("join"),
            style: "cancel",
          },
        ]
      );
    }
  }, [connectionAttempts, visible, isLocalPlay]);

  // Socket connection function
  const connectSocket = useCallback(async () => {
    try {
      console.log("Connecting to socket...");
      const connected = await gameSocket.connect(
        gameID || undefined,
        playerID || undefined
      ).then(() => true).catch(() => false);

      if (!connected) {
        console.error("Failed to connect to socket");
        handleConnectionError();
        return false;
      }

      setIsConnected(true);
      console.log("Connected to socket successfully");
      setMessage("");

      // Register handlers for game events
      gameSocket.registerHandler("matchFound", (data) => {
        console.log("Opponent found:", data);
        setOpponent((prev) => ({
          ...prev,
          name: data.opponentName,
          id: data.opponentId || "opponent-id",
        }));
        setStage("ready");
        setIsLoading(false);
      });

      gameSocket.registerHandler("searchingForMatch", () => {
        console.log("Searching for match...");
        setStage("searching");
        setIsLoading(true);
      });

      gameSocket.registerHandler("enteringMatch", (data) => {
        console.log("Entering match with data:", data);

        // Update opponent ready status
        setOpponent((prev) => ({ ...prev, isReady: true }));

        // Update symbol assignment from server
        if (data.playerSymbol) {
          console.log("Server assigned symbol:", data.playerSymbol);

          setCurrentPlayer((prev) => ({
            ...prev,
            symbol: data.playerSymbol,
            isReady: true,
          }));

          // Set opponent to the opposite symbol
          setOpponent((prev) => ({
            ...prev,
            symbol: data.playerSymbol === "X" ? "O" : "X",
            isReady: true,
          }));

          // Update the game hook's player symbol
          if (gameHook.setPlayerSymbol) {
            gameHook.setPlayerSymbol(data.playerSymbol);
          }
        }

        // Set game ID when match starts
        if (data.gameID) {
          setGameID(data.gameID);
        }

        // Start the game
        setStage("playing");
      });

      gameSocket.registerHandler("waitingForOpponent", () => {
        console.log("Waiting for opponent...");
        setOpponent((prev) => ({ ...prev, isReady: false }));
      });

      gameSocket.registerHandler("gameUpdate", (data) => {
        console.log("Game update received:", data);
        // This should be handled by the useTicTacToeGame hook
      });

      gameSocket.registerHandler("gameMove", (data) => {
        console.log("Move received from opponent:", data);
        // Should be handled by the game hook, but we can log it here
      });

      gameSocket.registerHandler("gameStarted", (data) => {
        console.log("Game started event received:", data);
        // Update initial game state if provided
        if (data.initialState && gameHook.setBoard) {
          gameHook.setBoard(data.initialState.board);
        }

        if (data.currentTurn) {
          // Set whether it's the player's turn
          const isPlayerTurn = data.currentTurn === currentPlayer.symbol;
          if (gameHook.setIsPlayerTurn) {
            gameHook.setIsPlayerTurn(isPlayerTurn);
          }
        }
      });

      gameSocket.registerHandler("connectionStatus", (data) => {
        console.log("Connection status:", data);
        setIsConnected(data.connected);
        if (!data.connected && stage === "playing") {
          setMessage("Connection to server lost. Attempting to reconnect...");
        }
      });

      gameSocket.registerHandler("error", (data) => {
        console.log("Error from server:", data.error);
        setMessage(data.error || "Unknown error occurred");
      });

      return true;
    } catch (error) {
      console.error("Exception while connecting to game server:", error);
      setIsConnected(false);
      handleConnectionError();
      return false;
    }
  }, [
    gameID,
    playerID,
    handleConnectionError,
    currentPlayer.symbol,
    gameHook,
    stage,
  ]);

  // Setup WebSocket connection
  useEffect(() => {
    if (visible && !isLocalPlay) {
      console.log("Setting up socket connection");
      const setupConnection = async () => {
        const success = await connectSocket();
        console.log("Connection setup result:", success);
      };

      setupConnection();

      return () => {
        console.log("Cleaning up socket connection...");
        gameSocket.clearHandlers();
        gameSocket.disconnect();
        setIsConnected(false);
      };
    }
  }, [visible, isLocalPlay, connectSocket]);

  // Keep WebSocket alive with ping
  useEffect(() => {
    let pingInterval: NodeJS.Timeout;

    if (isConnected && !isLocalPlay) {
      pingInterval = setInterval(() => {
        console.log("Sending ping to keep connection alive");
        if (gameSocket.ping) {
          gameSocket.ping();
        } else {
          console.warn("gameSocket.ping method is not available");
        }
      }, 30000); // Send ping every 30 seconds
    }

    return () => {
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [isConnected, isLocalPlay]);

  // Debug log when game starts
  useEffect(() => {
    if (stage === "playing") {
      console.log("Game started with:", {
        playerSymbol: currentPlayer.symbol,
        opponentSymbol: opponent.symbol,
        isPlayerTurn: gameHook.isPlayerTurn,
        board: gameHook.board,
        playerID: playerID,
        opponentID: opponent.id,
        gameID: gameID,
        isConnected: isConnected,
      });
    }
  }, [
    stage,
    currentPlayer.symbol,
    opponent.symbol,
    gameHook,
    playerID,
    opponent.id,
    gameID,
    isConnected,
  ]);

  // Setup local game
  const setupLocalGame = () => {
    // Set local play mode
    setIsLocalPlay(true);
    setIsConnected(true); // Local play is always "connected"
    setMessage("");

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

    // Update the game hook's player symbol
    if (gameHook.setPlayerSymbol) {
      gameHook.setPlayerSymbol("X");
    }

    // Initialize game state for local play
    if (gameHook.setBoard) {
      gameHook.setBoard(Array(9).fill(null));
    }

    if (gameHook.setIsPlayerTurn) {
      // Local player always goes first
      gameHook.setIsPlayerTurn(true);
    }

    // Move directly to playing stage
    setStage("playing");
  };

  // Game flow control functions
  const startSearch = async () => {
    if (gameOptions.format === "LOCAL") {
      setupLocalGame();
      return;
    }

    // Reset connection attempts
    setConnectionAttempts(0);

    if (!isConnected) {
      setMessage("Connecting to server...");
      const success = await connectSocket();
      if (!success) {
        return; // Don't proceed if connection failed
      }
    }

    console.log("Starting matchmaking with player ID:", playerID);
    setIsLoading(true);
    gameSocket.startMatchmaking("TTT");
  };

  const cancelSearch = () => {
    if (!isLocalPlay && isConnected) {
      gameSocket.cancelMatchmaking();
    }
    setIsLoading(false);
    setStage("join");
  };

  const playerReady = () => {
    setCurrentPlayer((prev) => ({ ...prev, isReady: true }));

    // For online play, send ready signal
    if (!isLocalPlay) {
      if (isConnected) {
        gameSocket.playerReady();
      } else {
        setMessage("Connection to server lost. Please try again.");
        setStage("join");
      }
    } else {
      // For local play, immediately start the game
      setStage("playing");
    }
  };

  const handleGameAction = (action: string) => {
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

        // Reset game state
        if (gameHook.resetGame) {
          gameHook.resetGame();
        }
        break;
      case "makeMove":
        // This will be handled by the game hook
        break;
      case "reconnect":
        // Attempt to reconnect to the server
        connectSocket();
        break;
    }
  };

  // Handle option changes
  const handleOptionChange = (option: string, value: string) => {
    setGameOptions((prev) => ({ ...prev, [option]: value }));

    // If format is changed to LOCAL, update isLocalPlay
    if (option === "format" && value === "LOCAL") {
      setIsLocalPlay(true);
    } else if (option === "format" && value !== "LOCAL") {
      setIsLocalPlay(false);
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

  // Render content based on current stage
  const renderContent = () => {
    switch (stage) {
      case "join":
        return (
          <GameOptionsSelector
            options={gameOptions}
            onOptionChange={handleOptionChange}
            onContinue={startSearch}
          />
        );
      case "searching":
        return (
          <SearchingScreen
            onCancel={cancelSearch}
            onPlayLocal={setupLocalGame}
            isLoading={isLoading}
          />
        );
      case "ready":
        return (
          <ReadyScreen
            currentPlayer={currentPlayer}
            opponent={opponent}
            matchInfo={matchInfo}
            onReady={playerReady}
          />
        );
      case "playing":
        return (
          <GameplayScreen
            currentPlayer={currentPlayer}
            opponent={opponent}
            gameHook={gameHook}
            isLocalPlay={isLocalPlay}
            matchInfo={matchInfo}
            onAction={handleGameAction}
            timeLimit={gameOptions.timeLimit === "5 MIN" ? 300 : undefined}
            isConnected={isConnected}
            onReconnect={() => handleGameAction("reconnect")}
          />
        );
      case "results":
        return (
          <ResultsScreen
            currentPlayer={currentPlayer}
            opponent={opponent}
            winner={gameHook.winner}
            playerSymbol={currentPlayer.symbol as "X" | "O"}
            matchInfo={matchInfo}
            isLocalPlay={isLocalPlay}
            onRematch={() =>
              isLocalPlay
                ? gameHook.requestRematch()
                : handleGameAction("playAgain")
            }
            onExit={() => handleGameAction("exitGame")}
          />
        );
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

              {/* Display error message if any */}
              {message ? (
                <View
                  style={[
                    gameModalStyles.errorBanner,
                    { marginTop: 10, width: "80%" },
                  ]}
                >
                  <Text style={gameModalStyles.errorText}>{message}</Text>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default JoinGameModal;
