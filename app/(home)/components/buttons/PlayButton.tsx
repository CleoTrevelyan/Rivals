import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps } from "@/interface/types";
import homeStyles from "../../styles/homeStyles";

const PlayButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={homeStyles.playButton} onPress={onPress}>
      <Text style={homeStyles.playButtonText}>Play</Text>
      <Ionicons name="play" size={18} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default PlayButton;
