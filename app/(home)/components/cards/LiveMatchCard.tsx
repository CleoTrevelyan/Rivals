import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { homeStyles } from "../../styles/homeStyles";
import { LiveMatchCardProps } from "@/interface/types";

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match, onPress }) => {
  return (
    <TouchableOpacity style={homeStyles.liveMatchCard} onPress={onPress}>
      <View style={homeStyles.liveMatchHeader}>
        <View style={homeStyles.gameInfo}>
          {match.game === "Dota 2" ? (
            <FontAwesome5
              name="steam"
              size={20}
              color="#8F9BB3"
              style={homeStyles.gameIcon}
            />
          ) : (
            <FontAwesome5
              name="times"
              size={20}
              color="#8F9BB3"
              style={homeStyles.gameIcon}
            />
          )}
          <Text style={homeStyles.matchType}>{match.type}</Text>
        </View>
        <View style={homeStyles.liveBadge}>
          <Text style={homeStyles.liveIndicatorText}>LIVE</Text>
        </View>
      </View>

      <View style={homeStyles.matchTeamsContainer}>
        {match.teams.map((team, index) => (
          <View key={index} style={homeStyles.teamRowHorizontal}>
            <Text style={homeStyles.teamName}>{team.name}</Text>
            {team.score !== null ? (
              <Text style={homeStyles.teamScore}>{team.score}</Text>
            ) : (
              match.game === "Noughts & Crosses" && (
                <View style={homeStyles.noughtsContainer}>
                  <Text style={homeStyles.noughtsSymbol}>
                    {"symbol" in team && team.symbol}
                  </Text>
                </View>
              )
            )}
          </View>
        ))}
      </View>

      {match.viewers && (
        <View style={homeStyles.matchFooter}>
          <Text style={homeStyles.viewersCount}>{match.viewers}</Text>
          <Ionicons name="star-outline" size={20} color="#8F9BB3" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LiveMatchCard;
