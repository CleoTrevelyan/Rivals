import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { MatchCardProps } from "@/interface/types";
import { homeStyles } from "@/styles/pageStyles/homeStyles";

const MatchCard = ({
  match,
  onPress,
  width,
}: {
  match: MatchCardProps;
  onPress: () => void;
  width?: number;
}) => {
  const windowWidth = Dimensions.get("window").width;
  const isMobile = windowWidth < 768;
  const cardWidth = width || (isMobile ? windowWidth - 32 : 260); 

  const getGameIcon = (game: string): JSX.Element => {
    switch (game) {
      case "Dota 2":
        return (
          <FontAwesome5
            name="steam"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
            style={homeStyles.gameIcon}
          />
        );
      case "FIFA 23":
        return (
          <FontAwesome5
            name="futbol"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
            style={homeStyles.gameIcon}
          />
        );
      case "CS:GO":
        return (
          <FontAwesome5
            name="crosshairs"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
            style={homeStyles.gameIcon}
          />
        );
      case "Noughts & Crosses":
        return (
          <FontAwesome5
            name="times"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
            style={homeStyles.gameIcon}
          />
        );
      default:
        return (
          <FontAwesome5
            name="gamepad"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
            style={homeStyles.gameIcon}
          />
        );
    }
  };

  // Style for the card based on screen size
  const cardStyle = {
    ...homeStyles.matchCard,
    width: cardWidth,
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={homeStyles.matchHeader}>
        <View style={homeStyles.gameInfo}>
          {getGameIcon(match.game)}
          <Text style={homeStyles.matchType}>{match.type}</Text>
        </View>
        {match.isLive ? (
          <View style={homeStyles.liveBadge}>
            <Text style={homeStyles.liveIndicatorText}>LIVE</Text>
          </View>
        ) : (
          <Text style={homeStyles.startTimeText}>
            {"startTime" in match && match.startTime}
          </Text>
        )}
      </View>

      <View style={homeStyles.teamsContainer}>
        {match.teams.map((team, index) => (
          <View
            key={index}
            style={[homeStyles.teamRow, isMobile && homeStyles.mobileTeamRow]}
          >
            <Text style={homeStyles.teamName}>{team.name}</Text>
            {team.score !== null && team.score !== undefined && (
              <Text style={homeStyles.teamScore}>{team.score}</Text>
            )}
            {match.game === "Noughts & Crosses" && "symbol" in team && (
              <View style={homeStyles.noughtsContainer}>
                <Text style={homeStyles.noughtsSymbol}>{team.symbol}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {"viewers" in match && match.viewers !== undefined && (
        <View style={homeStyles.matchFooter}>
          <Text style={homeStyles.viewersCount}>{match.viewers}</Text>
          <Ionicons
            name="star-outline"
            size={isMobile ? 16 : 20}
            color="#8F9BB3"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MatchCard;
