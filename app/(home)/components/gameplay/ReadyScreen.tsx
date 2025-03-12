import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { gameModalStyles } from "@/styles/componentStyles/gameModalStyles";
import { GamePlayer } from "@/interface/types";

interface ReadyScreenProps {
  currentPlayer: GamePlayer;
  opponent: GamePlayer;
  matchInfo: {
    date: string;
    time: string;
  };
  onReady: () => void;
}

/**
 * Screen displayed when an opponent is found and players need to ready up
 */
const ReadyScreen: React.FC<ReadyScreenProps> = ({
  currentPlayer,
  opponent,
  matchInfo,
  onReady,
}) => {
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
        onPress={onReady}
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

      {/* Debug functionality in development mode */}
      {__DEV__ && (
        <TouchableOpacity
          style={[
            gameModalStyles.actionButton,
            { marginTop: 10, backgroundColor: "#02F199" },
          ]}
          onPress={() => {
            // Force start game - parent should handle this
            onReady();
          }}
        >
          <Text style={gameModalStyles.actionButtonText}>DEV: Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadyScreen;
