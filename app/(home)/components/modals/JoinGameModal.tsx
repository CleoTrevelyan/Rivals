// JoinGameModal.tsx

import React, { useEffect } from "react";
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
import { useReduxTicTacToeGame } from "@/store/hooks";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setGameStage,
  setLocalPlay,
  updateGameOption,
  setMessage,
  setLoading,
  setPlayerReady,
  setOpponentReady,
  setGameID,
} from "@/store/slices/gameSlice";
import { GameModalProps } from "@/interface/types";

// Import the modular components
import GameOptionsSelector from "../gameplay/GameOptionsSelector";
import SearchingScreen from "../gameplay/SearchingScreen";
import ReadyScreen from "../gameplay/ReadyScreen";
import ResultsScreen from "../gameplay/ResultsScreen";
import GameplayScreen from "../gameplay/GameplayScreen";

/**
 * Modal component for joining and playing Tic-Tac-Toe games
 * This component uses Redux for state management and delegates UI rendering
 * to specialized components for each stage
 */
const JoinGameModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const gameHook = useReduxTicTacToeGame();

  // Get all state from Redux instead of local component state
  const {
    stage,
    isLoading,
    isLocalPlay,
    message,
    isConnected,
    connectionAttempts,
    currentPlayer,
    opponent,
    gameOptions,
    matchInfo,
    gameID,
  } = useAppSelector((state) => state.game);

  // Reset to initial stage when modal is opened
  useEffect(() => {
    if (visible) {
      dispatch(setGameStage("join"));
      dispatch(setPlayerReady(false));
      dispatch(setOpponentReady(false));
      dispatch(setLocalPlay(false));
      dispatch(setMessage(""));
      dispatch(setLoading(false));

      // Reset game state
      gameHook.resetGame();
    }
  }, [visible, dispatch, gameHook]);

  // Clean up socket connection when component unmounts or modal closes
  useEffect(() => {
    if (!visible) {
      gameHook.disconnectSocket();
    }

    return () => {
      gameHook.disconnectSocket();
    };
  }, [visible, gameHook]);

  // Handle connection error
  useEffect(() => {
    const maxConnectionAttempts = 3;

    if (connectionAttempts >= maxConnectionAttempts) {
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
            onPress: () => dispatch(setGameStage("join")),
            style: "cancel",
          },
        ]
      );
    }
  }, [connectionAttempts, dispatch]);

  // Setup local game
  const setupLocalGame = () => {
    dispatch(setLocalPlay(true));
    dispatch(setMessage(""));

    // Generate a local game ID
    const localGameID = "local-" + Date.now();
    dispatch(setGameID(localGameID));

    // Set up players
    dispatch(setPlayerReady(true));
    gameHook.setPlayerSymbol("X");

    // Move directly to playing stage
    dispatch(setGameStage("playing"));
  };

  // Game flow control functions
  const startSearch = async () => {
    // Handle local game option separately
    if (gameOptions.format === "LOCAL") {
      setupLocalGame();
      return;
    }

    dispatch(setMessage(""));

    // Attempt to connect if not already connected
    if (!isConnected) {
      dispatch(setMessage("Connecting to server..."));
      gameHook.connectSocket();
    }

    // Start matchmaking
    dispatch(setLoading(true));
    gameHook.startSearch();
  };

  const cancelSearch = () => {
    if (!isLocalPlay && isConnected) {
      gameHook.cancelSearch();
    }

    dispatch(setLoading(false));
    dispatch(setGameStage("join"));
  };

  const playerReady = () => {
    dispatch(setPlayerReady(true));

    // For online play, send ready signal
    if (!isLocalPlay) {
      if (isConnected) {
        gameHook.playerReady();
      } else {
        dispatch(setMessage("Connection to server lost. Please try again."));
        dispatch(setGameStage("join"));
      }
    } else {
      // For local play, immediately start the game
      dispatch(setGameStage("playing"));
    }
  };

  const handleGameAction = (action: string) => {
    switch (action) {
      case "endGame":
        dispatch(setGameStage("results"));
        break;

      case "playAgain":
        dispatch(setGameStage("ready"));
        dispatch(setPlayerReady(false));
        dispatch(setOpponentReady(false));
        break;

      case "exitGame":
        // Return to join stage
        dispatch(setGameStage("join"));
        dispatch(setLocalPlay(false));

        // Reset game state
        gameHook.resetGame();
        break;

      case "reconnect":
        // Attempt to reconnect to the server
        gameHook.connectSocket();
        break;
    }
  };

  // Handle option changes
  const handleOptionChange = (option: string, value: string) => {
    dispatch(updateGameOption({ option, value }));
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
