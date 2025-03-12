import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { GameButtonProps } from "@/interface/types";
import homeStyles from "../../styles/homeStyles";

const GameButton: React.FC<GameButtonProps> = ({ game, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        homeStyles.gameButton,
        game.functional && homeStyles.functionalGame,
      ]}
      onPress={onPress}
    >
      <FontAwesome5
        name={game.icon}
        size={24}
        color={game.id === "trending" ? "#3366FF" : "#8F9BB3"}
      />
      <Text style={homeStyles.gameButtonText}>{game.title}</Text>
    </TouchableOpacity>
  );
};

export default GameButton;
