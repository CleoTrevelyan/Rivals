import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonProps } from "@/interface/types";
import { homeStyles } from "@/styles/pageStyles/homeStyles";

const TeamButton: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={homeStyles.teamButton} onPress={onPress}>
      <Text style={homeStyles.teamButtonText}>Team</Text>
      <Ionicons name="people" size={18} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default TeamButton;
