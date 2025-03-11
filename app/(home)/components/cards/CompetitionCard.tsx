import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { CompetitionCardProps } from "@/interface/types";
import { homeStyles } from "@/styles/pageStyles/homeStyles";

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onPress,
}) => {
  return (
    <TouchableOpacity style={homeStyles.competitionCard} onPress={onPress}>
      <View style={homeStyles.competitionContent}>
        <FontAwesome5
          name={competition.icon}
          size={20}
          color="#3366FF"
          style={homeStyles.competitionIcon}
        />
        <Text style={homeStyles.competitionName}>{competition.name}</Text>
      </View>
      <View style={homeStyles.competitionCountBadge}>
        <Text style={homeStyles.competitionCount}>{competition.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CompetitionCard;
