import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
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
    }
  }, [visible]);

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
    const loadPlayerName = async () => {
      try {
        const name = await AsyncStorage.getItem("username");
        setCurrentPlayer((prev) => ({ ...prev, name: name || "Player" }));
      } catch (error) {
        console.error("Error loading playerName:", error);
      }
    };
    loadPlayerName();
  }, [isLocalPlay]);

  // Setup WebSocket connection
  useEffect(() => {
    if (visible && !isLocalPlay) {
      const connectSocket = async () => {
        try {
          await gameSocket.connect(gameID || undefined, playerID || undefined);

          // Register handlers for game events
          gameSocket.registerHandler("matchFound", (data) => {
            console.log("Opponent: ", data.opponentName);
            setGameID(data.gameID);
            setOpponent((prev) => ({
              ...prev,
              name: data.opponentName,
              id: data.opponentId || "opponent-id",
            }));
            setStage("ready");
          });

          gameSocket.registerHandler("searchingForMatch", () => {
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
            }

            // Move to playing stage
            setStage("playing");

            // Set game ID when match starts
            if (data.gameID) {
              setGameID(data.gameID);
            }
          });

          gameSocket.registerHandler("waitingForOpponent", () => {
            setOpponent((prev) => ({ ...prev, isReady: false }));
            console.log("waiting for opponent");
          });

          gameSocket.registerHandler("gameUpdate", (data) => {
            console.log("Game update received:", data);
            // This should be handled by the useTicTacToeGame hook
            // But we can add additional logic here if needed
          });

          gameSocket.registerHandler("gameStarted", (data) => {
            console.log("Game started event received:", data);
            // This is just for debugging - the hook should handle this
          });

          gameSocket.registerHandler("error", (data) => {
            console.log("Error from server:", data.error);
            setMessage(data.error || "Unknown error occurred");
          });
        } catch (error) {
          console.error("Failed to connect to game server:", error);
        }
      };

      connectSocket();

      return () => {
        gameSocket.clearHandlers();
        gameSocket.disconnect();
      };
    }
  }, [visible, gameID, playerID, isLocalPlay]);

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
  ]);

  // Setup local game
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

  // Game flow control functions
  const startSearch = async () => {
    if (isLocalPlay) {
      setupLocalGame();
      return;
    }

    const playerID = await AsyncStorage.getItem("playerID");
    gameSocket.startMatchmaking("TTT");
  };

  const cancelSearch = () => {
    if (!isLocalPlay) {
      gameSocket.cancelMatchmaking();
    }
    setStage("join");
  };

  const playerReady = () => {
    setCurrentPlayer((prev) => ({ ...prev, isReady: true }));

    // For online play, send ready signal
    if (!isLocalPlay) {
      gameSocket.playerReady();
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
        break;
      case "makeMove":
        // This will be handled by the game hook
        break;
    }
  };

  // Handle option changes
  const handleOptionChange = (option: string, value: string) => {
    setGameOptions((prev) => ({ ...prev, [option]: value }));
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
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default JoinGameModal;
