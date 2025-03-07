import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { buttonStyles } from "@/styles/buttonStyles";

interface CreateGameButtonProps {
  onPress: () => void;
}

const CreateGameButton: React.FC<CreateGameButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={buttonStyles.createGameButton} onPress={onPress}>
      <Text style={buttonStyles.createGameText}>Create Game</Text>
      <Ionicons name="add-outline" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default CreateGameButton;
