import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { gameModalStyles } from "@/styles/componentStyles/gameModalStyles";
import { GamePlayer } from "@/interface/types";

interface ResultsScreenProps {
  currentPlayer: GamePlayer;
  opponent: GamePlayer;
  winner: "X" | "O" | "draw" | null;
  playerSymbol: "X" | "O";
  matchInfo: {
    date: string;
    time: string;
  };
  isLocalPlay: boolean;
  onRematch: () => void;
  onExit: () => void;
}

/**
 * Screen displaying game results after a match ends
 */
const ResultsScreen: React.FC<ResultsScreenProps> = ({
  currentPlayer,
  opponent,
  winner,
  playerSymbol,
  matchInfo,
  isLocalPlay,
  onRematch,
  onExit,
}) => {
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
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
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
          onPress={onRematch}
        >
          <Text style={gameModalStyles.actionButtonText}>REMATCH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            gameModalStyles.actionButton,
            { flex: 1, marginHorizontal: 5, backgroundColor: "#8F9BB3" },
          ]}
          onPress={onExit}
        >
          <Text style={gameModalStyles.actionButtonText}>EXIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultsScreen;
