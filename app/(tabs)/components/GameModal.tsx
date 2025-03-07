import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { Ionicons } from "@expo/vector-icons";
import PageLoader from "@/components/pageLoader";

type GameStage = "join" | "searching" | "ready" | "playing" | "results";

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isReady: boolean;
  symbol: "X" | "O";
  score: number;
}

interface GameModalProps {
  visible: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ visible, onClose }) => {
  const [stage, setStage] = useState<GameStage>("join");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: "player1",
    name: "You",
    avatar: "J",
    isReady: false,
    symbol: "X",
    score: 0,
  });
  const [opponent, setOpponent] = useState<Player | null>(null);

  const handleAction = () => {
    switch (stage) {
      case "join":
        // Start searching for opponent
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setStage("searching");

          // Simulate finding an opponent after some time
          setTimeout(() => {
            setOpponent({
              id: "opponent1",
              name: "Opponent",
              avatar: "O",
              isReady: false,
              symbol: "O",
              score: 0,
            });
            setStage("ready");
          }, 2000);
        }, 1000);
        break;

      case "ready":
        // Mark player as ready
        setCurrentPlayer((prev) => ({ ...prev, isReady: true }));

        // Simulate opponent getting ready
        setTimeout(() => {
          if (opponent) {
            setOpponent({ ...opponent, isReady: true });

            // After both players ready, start the game
            setTimeout(() => {
              setStage("playing");
            }, 1500);
          }
        }, 2000);
        break;

      case "playing":
        // Simulate game ending
        setTimeout(() => {
          // Update scores (player wins in this example)
          setCurrentPlayer((prev) => ({ ...prev, score: prev.score + 1 }));
          setStage("results");
        }, 2000);
        break;

      case "results":
        // Start a new game
        setStage("ready");
        setCurrentPlayer((prev) => ({ ...prev, isReady: false }));
        if (opponent) {
          setOpponent({ ...opponent, isReady: false });
        }
        break;
    }
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

  // Join game stage
  const renderJoinStage = () => {
    return (
      <View style={gameModalStyles.contentContainer}>
        <Text style={gameModalStyles.modalTitle}>NOUGHTS & CROSSES</Text>

        <View style={gameModalStyles.joinOptions}>
          <TouchableOpacity
            style={gameModalStyles.joinOption}
            onPress={() => handleAction()}
          >
            <Text style={gameModalStyles.joinOptionLabel}>PUBLIC</Text>
          </TouchableOpacity>

          <TouchableOpacity style={gameModalStyles.joinOption}>
            <Text style={gameModalStyles.joinOptionLabel}>PRIVATE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={gameModalStyles.joinOption}>
            <Text style={gameModalStyles.joinOptionLabel}>FRIEND</Text>
          </TouchableOpacity>

          <TouchableOpacity style={gameModalStyles.joinOption}>
            <Text style={gameModalStyles.joinOptionLabel}>BOT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={gameModalStyles.primaryButton}
          onPress={() => handleAction()}
        >
          <Text style={gameModalStyles.primaryButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Searching for opponent stage
  const renderSearchingStage = () => {
    return (
      <View style={gameModalStyles.contentContainer}>
        <Text style={gameModalStyles.modalTitle}>NOUGHTS & CROSSES</Text>

        <View style={gameModalStyles.searchingContainer}>
          <Text style={gameModalStyles.searchingText}>
            LOOKING FOR AN OPPONENT...
          </Text>
          <TouchableOpacity
            style={gameModalStyles.cancelButton}
            onPress={() => setStage("join")}
          >
            <Text style={gameModalStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Ready up stage (opponent found)
  const renderReadyStage = () => {
    if (!opponent) return null;

    return (
      <View style={gameModalStyles.contentContainer}>
        <Text style={gameModalStyles.modalTitle}>NOUGHTS & CROSSES</Text>

        <View style={gameModalStyles.playersContainer}>
          {/* Current player */}
          <View style={gameModalStyles.playerColumn}>
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
            <Text style={gameModalStyles.playerName}>{currentPlayer.name}</Text>
            {currentPlayer.isReady ? (
              <View style={gameModalStyles.readyIndicator}>
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
              </View>
            ) : null}
          </View>

          {/* VS */}
          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
          </View>

          {/* Opponent */}
          <View style={gameModalStyles.playerColumn}>
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
            <Text style={gameModalStyles.playerName}>{opponent.name}</Text>
            {opponent.isReady ? (
              <View style={gameModalStyles.readyIndicator}>
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
                <View style={gameModalStyles.readyDot} />
              </View>
            ) : null}
          </View>
        </View>

        {!currentPlayer.isReady ? (
          <TouchableOpacity
            style={gameModalStyles.primaryButton}
            onPress={() => handleAction()}
          >
            <Text style={gameModalStyles.primaryButtonText}>Ready</Text>
          </TouchableOpacity>
        ) : (
          <View style={gameModalStyles.waitingForOpponent}>
            <Text style={gameModalStyles.waitingText}>
              {opponent.isReady
                ? "Starting game..."
                : "Waiting for opponent..."}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Game stage
  const renderPlayingStage = () => {
    return (
      <View style={gameModalStyles.contentContainer}>
        <Text style={gameModalStyles.modalTitle}>NOUGHTS & CROSSES</Text>

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
          style={gameModalStyles.primaryButton}
          onPress={() => handleAction()}
        >
          <Text style={gameModalStyles.primaryButtonText}>End Game (Demo)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Results stage
  const renderResultsStage = () => {
    if (!opponent) return null;

    return (
      <View style={gameModalStyles.contentContainer}>
        <Text style={gameModalStyles.modalTitle}>NOUGHTS & CROSSES</Text>

        <View style={gameModalStyles.scoreboardContainer}>
          <Text style={gameModalStyles.resultTitle}>RESULT</Text>

          <View style={gameModalStyles.playersContainer}>
            {/* Current player */}
            <View style={gameModalStyles.playerColumn}>
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {currentPlayer.avatar}
                </Text>
              </View>
              <Text style={gameModalStyles.playerName}>
                {currentPlayer.name}
              </Text>
              <Text style={gameModalStyles.playerScore}>
                {currentPlayer.score}
              </Text>
            </View>

            {/* VS */}
            <View style={gameModalStyles.vsContainer}>
              <Text style={gameModalStyles.vsText}>VS</Text>
            </View>

            {/* Opponent */}
            <View style={gameModalStyles.playerColumn}>
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {opponent.avatar}
                </Text>
              </View>
              <Text style={gameModalStyles.playerName}>{opponent.name}</Text>
              <Text style={gameModalStyles.playerScore}>{opponent.score}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={gameModalStyles.primaryButton}
          onPress={() => handleAction()}
        >
          <Text style={gameModalStyles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
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
          <TouchableOpacity
            style={gameModalStyles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>

          {renderContent()}

          <PageLoader isLoading={isLoading} />
        </View>
      </View>
    </Modal>
  );
};

export default GameModal;
