import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const maxConnectionAttempts = 3; // Maximum connection attempts

  // Ref to track if the modal is visible to prevent state updates when hidden
  const visibleRef = useRef(visible);

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

  // Keep a reference to the gameSocket
  const gameSocketRef = useRef(getGameSocket(RivalsServer));

  // Always initialize both hooks but only use the one needed
  const localGameHook = useLocalTicTacToeGame();
  const onlineGameHook = useTicTacToeGame({
    socket: null, // Socket will be passed via handlers instead
    gameID: gameID || undefined,
    playerID: playerID || undefined,
    onGameEnd: (result) => {
      console.log(`Game ended: ${result}`);
      // Game end will be handled by UI buttons instead of automatic transition
      if (visibleRef.current) {
        setStage("results");
      }
    },
    initialPlayerSymbol: currentPlayer.symbol,
    timeLimit: gameOptions.timeLimit === "5 MIN" ? 300 : undefined,
  });

  // Choose which hook to use based on local play mode
  const gameHook = isLocalPlay ? localGameHook : onlineGameHook;

  // Update visibleRef when visible prop changes
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

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

      // Reset game state
      if (gameHook.resetGame) {
        gameHook.resetGame();
      }
    }
  }, [visible]);

  // Load playerID from AsyncStorage
  useEffect(() => {
    if (!visible) return;

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
  }, [visible, isLocalPlay]);

  // Connection error handler - improved with more robust recovery
  const handleConnectionError = useCallback(() => {
    if (!visibleRef.current) return; // Don't handle if modal is not visible

    if (connectionAttempts < maxConnectionAttempts) {
      const newAttemptCount = connectionAttempts + 1;
      setConnectionAttempts(newAttemptCount);
      setMessage(
        `Connection failed. Retrying... (${newAttemptCount}/${maxConnectionAttempts})`
      );

      // Retry connection after a delay - exponential backoff
      const backoffDelay = Math.min(
        1000 * Math.pow(1.5, newAttemptCount),
        5000
      );

      setTimeout(() => {
        if (visibleRef.current && !isLocalPlay) {
          console.log("Retrying connection...");
          connectSocket();
        }
      }, backoffDelay);
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
  }, [connectionAttempts, isLocalPlay]);

  // Socket connection function - improved with better error handling
  const connectSocket = useCallback(async () => {
    try {
      // Reset the gameSocket instance if we've had trouble connecting
      if (connectionAttempts > 0) {
        try {
          gameSocketRef.current.disconnect();
        } catch (e) {
          console.log("Error disconnecting previous socket:", e);
        }

        // Get a fresh instance to avoid potential issues with previous connection
        gameSocketRef.current = getGameSocket(RivalsServer);
      }

      console.log("Connecting to socket...");

      // Improve connection timeout handling
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Connection timeout")), 5000);
      });

      // Race the connection against a timeout
      const connected = await Promise.race([
        gameSocketRef.current
          .connect(gameID || undefined, playerID || undefined)
          .then(() => true)
          .catch((err) => {
            console.error("Connection error:", err);
            return false;
          }),
        timeoutPromise.then(() => false).catch(() => false),
      ]);

      if (!connected) {
        console.error("Failed to connect to socket");
        handleConnectionError();
        return false;
      }

      setIsConnected(true);
      console.log("Connected to socket successfully");
      setConnectionAttempts(0);
      setMessage("");

      // Register handlers for game events
      setupSocketHandlers();

      return true;
    } catch (error) {
      console.error("Exception while connecting to game server:", error);
      setIsConnected(false);
      handleConnectionError();
      return false;
    }
  }, [gameID, playerID, handleConnectionError, connectionAttempts]);

  // Setup socket handlers in a separate function for cleaner code
  const setupSocketHandlers = useCallback(() => {
    const gameSocket = gameSocketRef.current;

    // Register handlers for game events
    gameSocket.registerHandler("matchFound", (data) => {
      console.log("Opponent found:", data);
      if (!visibleRef.current) return;

      setOpponent((prev) => ({
        ...prev,
        name: data.opponentName || "Opponent",
        id: data.opponentId || "opponent-id",
      }));
      setStage("ready");
      setIsLoading(false);
    });

    gameSocket.registerHandler("searchingForMatch", () => {
      console.log("Searching for match...");
      if (!visibleRef.current) return;

      setStage("searching");
      setIsLoading(true);
    });

    gameSocket.registerHandler("enteringMatch", (data) => {
      console.log("Entering match with data:", data);
      if (!visibleRef.current) return;

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
      if (!visibleRef.current) return;

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
      if (!visibleRef.current) return;

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
      if (!visibleRef.current) return;

      setIsConnected(data.connected);
      if (!data.connected && stage === "playing") {
        setMessage("Connection to server lost. Attempting to reconnect...");

        // Attempt to reconnect automatically
        setTimeout(() => {
          if (visibleRef.current && !isLocalPlay) {
            connectSocket();
          }
        }, 2000);
      }
    });

    gameSocket.registerHandler("error", (data) => {
      console.log("Error from server:", data.error);
      if (!visibleRef.current) return;

      setMessage(data.error || "Unknown error occurred");

      // If we get a critical error, we might want to offer local play
      if (data.critical) {
        Alert.alert(
          "Server Error",
          "There was a problem with the game server. Would you like to play locally instead?",
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
    });
  }, [currentPlayer.symbol, gameHook, stage]);

  // Keep WebSocket alive with ping - improved reliability
  useEffect(() => {
    let pingInterval: NodeJS.Timeout;

    if (isConnected && !isLocalPlay && visible) {
      // Send ping more frequently to prevent timeouts
      pingInterval = setInterval(() => {
        console.log("Sending ping to keep connection alive");
        try {
          if (gameSocketRef.current && gameSocketRef.current.ping) {
            const pingSuccess = gameSocketRef.current.ping();

            // If ping fails, try to reconnect
            if (!pingSuccess && visibleRef.current) {
              console.warn("Ping failed, attempting to reconnect");
              setIsConnected(false);
              connectSocket();
            }
          } else {
            console.warn("gameSocket.ping method is not available");
          }
        } catch (e) {
          console.error("Error during ping:", e);
        }
      }, 15000); // Send ping every 15 seconds (reduced from 30s)
    }

    return () => {
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [isConnected, isLocalPlay, visible, connectSocket]);

  // Clean up socket connection when component unmounts or modal closes
  useEffect(() => {
    if (!visible && gameSocketRef.current) {
      console.log("Cleaning up socket connection due to modal close");
      try {
        gameSocketRef.current.clearHandlers();
        gameSocketRef.current.disconnect();
      } catch (e) {
        console.error("Error cleaning up socket:", e);
      }
      setIsConnected(false);
    }

    return () => {
      // This runs when component unmounts
      if (gameSocketRef.current) {
        console.log("Cleaning up socket connection on unmount");
        try {
          gameSocketRef.current.clearHandlers();
          gameSocketRef.current.disconnect();
        } catch (e) {
          console.error("Error cleaning up socket on unmount:", e);
        }
      }
    };
  }, [visible]);

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
  const setupLocalGame = useCallback(() => {
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
  }, [gameHook]);

  // Game flow control functions
  const startSearch = useCallback(async () => {
    // Handle local game option separately
    if (gameOptions.format === "LOCAL") {
      setupLocalGame();
      return;
    }

    // Reset connection attempts
    setConnectionAttempts(0);
    setMessage("");

    // Attempt to connect if not already connected
    if (!isConnected) {
      setMessage("Connecting to server...");
      const success = await connectSocket();
      if (!success) {
        return; // Don't proceed if connection failed
      }
    }

    console.log("Starting matchmaking with player ID:", playerID);
    setIsLoading(true);
    try {
      gameSocketRef.current.startMatchmaking("TTT");
    } catch (error) {
      console.error("Error starting matchmaking:", error);
      setMessage("Failed to start matchmaking. Please try again.");
      setIsLoading(false);
    }
  }, [
    gameOptions.format,
    setupLocalGame,
    isConnected,
    connectSocket,
    playerID,
  ]);

  const cancelSearch = useCallback(() => {
    if (!isLocalPlay && isConnected) {
      try {
        gameSocketRef.current.cancelMatchmaking();
      } catch (error) {
        console.error("Error canceling matchmaking:", error);
      }
    }
    setIsLoading(false);
    setStage("join");
  }, [isLocalPlay, isConnected]);

  const playerReady = useCallback(() => {
    setCurrentPlayer((prev) => ({ ...prev, isReady: true }));

    // For online play, send ready signal
    if (!isLocalPlay) {
      if (isConnected) {
        try {
          gameSocketRef.current.playerReady();
        } catch (error) {
          console.error("Error sending ready signal:", error);
          setMessage("Failed to send ready signal. Please try again.");
        }
      } else {
        setMessage("Connection to server lost. Please try again.");
        setStage("join");
      }
    } else {
      // For local play, immediately start the game
      setStage("playing");
    }
  }, [isLocalPlay, isConnected]);

  const handleGameAction = useCallback(
    (action: string) => {
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
    },
    [opponent, gameHook, connectSocket]
  );

  // Handle option changes
  const handleOptionChange = useCallback((option: string, value: string) => {
    setGameOptions((prev) => ({ ...prev, [option]: value }));

    // If format is changed to LOCAL, update isLocalPlay
    if (option === "format" && value === "LOCAL") {
      setIsLocalPlay(true);
    } else if (option === "format" && value !== "LOCAL") {
      setIsLocalPlay(false);
    }
  }, []);

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
