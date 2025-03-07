import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { Ionicons } from "@expo/vector-icons";
import { RivalsServer } from "@/components/constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GameStage = "join" | "searching" | "ready" | "playing" | "results";

interface Player {
  id?: any; // Changed to optional
  name: string;
  avatar?: string;
  imageSource?: any; // Added for local images
  isReady: boolean;
  symbol: "X" | "O";
  score: number;
  colors?: string[];
  level?: number; // Added level property
}

interface GameModalProps {
  visible: boolean;
  onClose: () => void;
}

const JoinGameModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  const [stage, setStage] = useState<GameStage>("join");
  const [isLoading, setIsLoading] = useState(false);
  const [playerID, setPlayerID] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: null,
    name: "VikingDestroyer",
    avatar: "V",
    imageSource: require("@/assets/images/placeholders/haaland.png"),
    isReady: false,
    symbol: "X",
    score: 20,
    level: 9,
    colors: ["#80ff80", "#ff8080", "#80ff80", "#ff8080", "#80ff80"], // W L W L W
  });

  const [opponent, setOpponent] = useState<Player>({
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
    time: "16:30"
  });
  
  // Selected options for the game
  const [selectedFormat, setSelectedFormat] = useState<string>("PUBLIC");
  const [selectedStake, setSelectedStake] = useState<string>("£0.00");
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<string>("UNLIMITED");
  const [selectedFirstMove, setSelectedFirstMove] = useState<string>("RANDOM");

  // Reset to initial stage when modal is opened
  useEffect(() => {
    if (visible) {
      setStage("join");
      setCurrentPlayer(prev => ({...prev, isReady: false}));
      if (opponent) {
        setOpponent(prev => ({...prev, isReady: false}));
      }
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
  }, []);

  const simulateFlow = (action: string) => {
    switch (action) {
      case "startSearch":
        setIsLoading(true);
        setStage("searching");
        // Simulate finding a match after 2 seconds
        setTimeout(() => {
          setIsLoading(false);
          setStage("ready");
        }, 2000);
        break;

      case "cancelSearch":
        setStage("join");
        break;

      case "playerReady":
        setCurrentPlayer((prev) => ({ ...prev, isReady: true }));
        // Simulate opponent getting ready after 1.5 seconds
        setTimeout(() => {
          if (opponent) {
            setOpponent((prev) => ({ ...prev, isReady: true }));
            // Start game after both players ready
            setTimeout(() => {
              setStage("playing");
            }, 1000);
          }
        }, 1500);
        break;

      case "endGame":
        // Simulate game ending with player winning
        setStage("results");
        break;

      case "playAgain":
        setStage("ready");
        setCurrentPlayer((prev) => ({ ...prev, isReady: false }));
        if (opponent) {
          setOpponent((prev) => ({ ...prev, isReady: false }));
        }
        break;
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

  // Join game stage
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
              {["PUBLIC", "PRIVATE"].map((option) => (
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
          onPress={() => simulateFlow("startSearch")}
        >
          <Text style={gameModalStyles.actionButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Searching for opponent stage
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
            onPress={() => simulateFlow("cancelSearch")}
          >
            <Text style={gameModalStyles.cancelButtonText}>Cancel Search</Text>
          </TouchableOpacity>
        </View>
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
            <Text style={gameModalStyles.playerLevel}>Level {currentPlayer.level}</Text>
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
            <Text style={gameModalStyles.playerLevel}>Level {opponent.level}</Text>
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
          onPress={() => simulateFlow("playerReady")}
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
      </View>
    );
  };

  // Game stage
  const renderPlayingStage = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>

        {/* Simplified game view for the example */}
        <View style={gameModalStyles.gameboardContainer}>
          <View style={gameModalStyles.gameboard}>
            <View style={gameModalStyles.gameRow}>
              <View style={gameModalStyles.gameCell}>
                <Text style={gameModalStyles.cellX}>X</Text>
              </View>
              <View style={gameModalStyles.gameCell}></View>
              <View style={gameModalStyles.gameCell}>
                <Text style={gameModalStyles.cellO}>O</Text>
              </View>
            </View>
            <View style={gameModalStyles.gameRow}>
              <View style={gameModalStyles.gameCell}></View>
              <View style={gameModalStyles.gameCell}>
                <Text style={gameModalStyles.cellX}>X</Text>
              </View>
              <View style={gameModalStyles.gameCell}></View>
            </View>
            <View style={gameModalStyles.gameRow}>
              <View style={gameModalStyles.gameCell}>
                <Text style={gameModalStyles.cellO}>O</Text>
              </View>
              <View style={gameModalStyles.gameCell}></View>
              <View style={gameModalStyles.gameCell}>
                <Text style={gameModalStyles.cellX}>X</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => simulateFlow("endGame")}
        >
          <Text style={gameModalStyles.actionButtonText}>End Game (Demo)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Results stage
  const renderResultsStage = () => {
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
            <Text style={[gameModalStyles.xpText, { color: "#4AE9A0" }]}>
              + {currentPlayer.score}XP
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
            <Text style={gameModalStyles.playerLevel}>Level {currentPlayer.level}</Text>
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
            <Text style={[gameModalStyles.xpText, { color: "#FF3D71" }]}>
              - {Math.abs(opponent.score)}XP
            </Text>
            {opponent.imageSource ? (
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
            <Text style={gameModalStyles.playerName}>{opponent.name}</Text>
            <Text style={gameModalStyles.playerLevel}>Level {opponent.level}</Text>
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
          onPress={() => simulateFlow("playAgain")}
        >
          <Text style={gameModalStyles.actionButtonText}>REMATCH?</Text>
        </TouchableOpacity>
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
        <View style={gameModalStyles.modalContainer}>
          <View style={gameModalStyles.modalHeader}>
            {renderBreadcrumb()}
            <TouchableOpacity
              style={gameModalStyles.closeButton}
              onPress={onClose}
            >
              <Text style={gameModalStyles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={gameModalStyles.modalContent}>{renderContent()}</View>
        </View>
      </View>
    </Modal>
  );
};

export default JoinGameModal;