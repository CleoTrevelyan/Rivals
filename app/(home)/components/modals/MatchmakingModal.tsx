import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { GameModalProps, Player } from "@/interface/types";
import Loader from "../loaders/Loader";

// MatchmakingModal has the same props as other game modals
const MatchmakingModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  // State to track the current stage of matchmaking
  const [matchmakingStage, setMatchmakingStage] = useState<
    "rules" | "searching" | "opponentFound" | "ready" | "postGame"
  >("rules");

  // Selected game details
  const gameInfo = {
    name: "NOUGHTS & CROSSES",
    icon: "⚔️",
  };

  // State for game configuration
  const [gameConfig, setGameConfig] = useState({
    game: "Noughts & Crosses",
    teamSize: "1v1",
    format: "Single Game",
    stake: "$10",
    prize: "$18.9",
  });

  // Mock player data (you could replace this with actual user data)
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "current-user",
      name: "VikingDestroyer",
      avatar: "V",
      imageSource: require("@/assets/images/placeholders/haaland.png"),
      ready: false,
      score: 0,
      level: 9,
      color: ["#80ff80", "#ff8080", "#80ff80", "#ff8080", "#80ff80"], // W L W L W
    },
    {
      id: "opponent",
      name: "Xx_KaiCenat_xX",
      avatar: "K",
      imageSource: require("@/assets/images/placeholders/kai_cenat.png"),
      ready: false,
      score: 0,
      level: 7,
      color: ["#ff8080", "#ff8080", "#80ff80", "#80ff80", "#ff8080"], // L L W W L
    },
  ]);

  // Reset to initial stage when opened
  useEffect(() => {
    if (visible) {
      setMatchmakingStage("rules");
      // Reset player ready status
      setPlayers(
        players.map((player) => ({
          ...player,
          ready: false,
          score: 0,
        }))
      );
    }
  }, [visible]);

  // Simulate matchmaking flow for demo purposes
  useEffect(() => {
    if (matchmakingStage === "searching") {
      // Simulate finding an opponent after a delay
      const timer = setTimeout(() => {
        setMatchmakingStage("opponentFound");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [matchmakingStage]);

  // Start matchmaking
  const handleStartSearch = () => {
    setMatchmakingStage("searching");
  };

  // Cancel search
  const handleCancelSearch = () => {
    setMatchmakingStage("rules");
  };

  // Mark player as ready
  const handleReady = () => {
    // Update the current player's ready status
    setPlayers(
      players.map((player) =>
        player.id === "current-user" ? { ...player, ready: true } : player
      )
    );

    // Simulate opponent getting ready after a delay
    setTimeout(() => {
      setPlayers(players.map((player) => ({ ...player, ready: true })));
      setMatchmakingStage("ready");

      // Simulate game ending and showing results
      setTimeout(() => {
        // Update scores for post-game view
        setPlayers([
          { ...players[0], score: 20 },
          { ...players[1], score: -20 },
        ]);
        setMatchmakingStage("postGame");
      }, 2000);
    }, 1500);
  };

  // Play again
  const handlePlayAgain = () => {
    setMatchmakingStage("rules");
    setPlayers(
      players.map((player) => ({
        ...player,
        ready: false,
        score: 0,
      }))
    );
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
        <Text style={gameModalStyles.navTitle}>
          {matchmakingStage === "rules" ? "Matchmaking" : gameInfo.name}
        </Text>
      </View>
    );
  };

  // Render Rules Configuration Step
  const renderRulesStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <Text style={gameModalStyles.chooseGameTitle}>{gameInfo.name}</Text>

        <View style={gameModalStyles.rulesContainer}>
          <Text style={gameModalStyles.rulesSectionTitle}>RULES</Text>

          <View style={gameModalStyles.ruleRow}>
            <View style={gameModalStyles.ruleLabelContainer}>
              <Text style={gameModalStyles.ruleLabel}>GAME</Text>
            </View>
            <View style={gameModalStyles.ruleValueContainer}>
              <Text style={gameModalStyles.ruleValue}>{gameConfig.game}</Text>
            </View>
          </View>

          <View style={gameModalStyles.ruleRow}>
            <View style={gameModalStyles.ruleLabelContainer}>
              <Text style={gameModalStyles.ruleLabel}>TEAM SIZE</Text>
            </View>
            <View style={gameModalStyles.ruleValueContainer}>
              <Text style={gameModalStyles.ruleValue}>
                {gameConfig.teamSize}
              </Text>
            </View>
          </View>

          <View style={gameModalStyles.ruleRow}>
            <View style={gameModalStyles.ruleLabelContainer}>
              <Text style={gameModalStyles.ruleLabel}>FORMAT</Text>
            </View>
            <View style={gameModalStyles.ruleValueContainer}>
              <Text style={gameModalStyles.ruleValue}>{gameConfig.format}</Text>
            </View>
          </View>

          <View style={gameModalStyles.ruleRow}>
            <View style={gameModalStyles.ruleLabelContainer}>
              <Text style={gameModalStyles.ruleLabel}>STAKE IN</Text>
            </View>
            <View style={gameModalStyles.ruleValueContainer}>
              <Text style={gameModalStyles.ruleValue}>{gameConfig.stake}</Text>
            </View>
          </View>

          <View style={gameModalStyles.ruleRow}>
            <View style={gameModalStyles.ruleLabelContainer}>
              <Text style={gameModalStyles.ruleLabel}>PRIZE</Text>
            </View>
            <View style={gameModalStyles.ruleValueContainer}>
              <Text style={gameModalStyles.ruleValue}>{gameConfig.prize}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.nextButton}
          onPress={handleStartSearch}
        >
          <Text style={gameModalStyles.nextButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Searching step
  const renderSearchingStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <Text style={gameModalStyles.chooseGameTitle}>{gameInfo.name}</Text>

        <View style={gameModalStyles.searchingContainer}>
          <Text style={gameModalStyles.searchingTitle}>
            LOOKING FOR AN OPPONENT...
          </Text>

          {/* Using the new Loader component instead of ActivityIndicator */}
          <Loader
            size="large"
            color="#00E096"
            containerStyle={{ marginVertical: 20 }}
          />
        </View>

        <TouchableOpacity
          style={gameModalStyles.cancelSearchButton}
          onPress={handleCancelSearch}
        >
          <Text style={gameModalStyles.cancelButtonText}>Cancel Search</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Opponent Found step (not ready yet)
  const renderOpponentFoundStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <Text style={gameModalStyles.chooseGameTitle}>{gameInfo.name}</Text>

        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.nextButton}
          onPress={handleReady}
        >
          <Text style={gameModalStyles.nextButtonText}>Ready</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Ready step (both players ready)
  const renderReadyStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <Text style={gameModalStyles.chooseGameTitle}>{gameInfo.name}</Text>

        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* This would typically auto-start the game */}
        <TouchableOpacity
          style={gameModalStyles.nextButton}
          onPress={() => setMatchmakingStage("postGame")}
        >
          <Text style={gameModalStyles.nextButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Post Game step
  const renderPostGameStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <Text style={gameModalStyles.chooseGameTitle}>{gameInfo.name}</Text>

        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            <Text style={[gameModalStyles.xpText, { color: "#4AE9A0" }]}>
              + {players[0].score}XP
            </Text>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            <Text style={[gameModalStyles.xpText, { color: "#FF3D71" }]}>
              - {Math.abs(players[1].score ?? 0)}XP
            </Text>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.nextButton}
          onPress={handlePlayAgain}
        >
          <Text style={gameModalStyles.nextButtonText}>REMATCH?</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render current step content
  const renderStepContent = () => {
    switch (matchmakingStage) {
      case "rules":
        return renderRulesStep();
      case "searching":
        return renderSearchingStep();
      case "opponentFound":
        return renderOpponentFoundStep();
      case "ready":
        return renderReadyStep();
      case "postGame":
        return renderPostGameStep();
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

          <View style={gameModalStyles.modalContent}>
            {renderStepContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MatchmakingModal;
