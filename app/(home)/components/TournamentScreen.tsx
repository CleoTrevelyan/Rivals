import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { stylesTournamentPage } from "@/styles/tournamentPage";
import { useWindowDimensions } from "react-native";

// Sample data for tournaments
const SAMPLE_TOURNAMENTS = [
  {
    id: "1",
    name: "NOUGHTS & CROSSES",
    status: "Open",
    startTime: "Wed, March 14, 12:30 PM EST",
    timeRemaining: "00:24:35",
    playersRegistered: 17,
    maxPlayers: 20,
  },
  {
    id: "2",
    name: "WARZONE BATTLE",
    status: "Ongoing",
    startTime: "Thurs, March 15, 3:00 PM EST",
    timeRemaining: "02:15:00",
    playersRegistered: 48,
    maxPlayers: 50,
  },
  {
    id: "3",
    name: "FORTNITE TOURNAMENT",
    status: "Upcoming",
    startTime: "Fri, March 16, 7:00 PM EST",
    timeRemaining: "30:45:12",
    playersRegistered: 32,
    maxPlayers: 100,
  },
];

// Sample data for leaderboard
const SAMPLE_LEADERBOARD = [
  {
    id: "1",
    rank: 1,
    username: "jOnesy",
    avatar: require("@/assets/images/placeholders/placeholder1.png"),
    totalPoints: 1273,
    pointsGained: 81,
    movement: "up",
  },
  {
    id: "2",
    rank: 2,
    username: "FeistyBuck",
    avatar: require("@/assets/images/placeholders/placeholder2.png"),
    totalPoints: 1266,
    pointsGained: 0,
    movement: "down",
  },
  {
    id: "3",
    rank: 3,
    username: "Yum1s",
    avatar: require("@/assets/images/placeholders/placeholder3.png"),
    totalPoints: 1242,
    pointsGained: 78,
    movement: "neutral",
  },
  {
    id: "4",
    rank: 4,
    username: "MrWhite",
    avatar: require("@/assets/images/placeholders/placeholder4.png"),
    totalPoints: 1183,
    pointsGained: 27,
    movement: "up",
  },
  {
    id: "5",
    rank: 5,
    username: "r4gsta",
    avatar: require("@/assets/images/placeholders/placeholder5.png"),
    totalPoints: 1129,
    pointsGained: 34,
    movement: "down",
  },
  {
    id: "6",
    rank: 6,
    username: "Yogo24",
    avatar: require("@/assets/images/placeholders/placeholder1.png"),
    totalPoints: 1099,
    pointsGained: 0,
    movement: "neutral",
  },
  {
    id: "7",
    rank: 7,
    username: "Terminator23",
    avatar: require("@/assets/images/placeholders/placeholder2.png"),
    totalPoints: 1021,
    pointsGained: 17,
    movement: "up",
  },
];

export default function TournamentsScreen() {
  const [selectedTournament, setSelectedTournament] = useState(
    SAMPLE_TOURNAMENTS[0]
  );
  const [activeDetailTab, setActiveDetailTab] = useState("Table");
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  const renderTournamentItem = ({
    item,
  }: {
    item: (typeof SAMPLE_TOURNAMENTS)[0];
  }) => (
    <TouchableOpacity
      style={[
        stylesTournamentPage.tournamentItem,
        selectedTournament.id === item.id &&
          stylesTournamentPage.selectedTournamentItem,
      ]}
      onPress={() => setSelectedTournament(item)}
    >
      <Text style={stylesTournamentPage.tournamentName}>{item.name}</Text>
      <View style={stylesTournamentPage.tournamentMetaContainer}>
        <Text style={stylesTournamentPage.tournamentMeta}>
          {item.playersRegistered}/{item.maxPlayers} Players
        </Text>
        <View
          style={[
            stylesTournamentPage.statusBadge,
            item.status === "Open"
              ? stylesTournamentPage.statusOpen
              : item.status === "Ongoing"
              ? stylesTournamentPage.statusOngoing
              : stylesTournamentPage.statusUpcoming,
          ]}
        >
          <Text style={stylesTournamentPage.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMovementIcon = (movement: string) => {
    if (movement === "up") {
      return <Feather name="chevron-up" size={20} color="#00E096" />;
    } else if (movement === "down") {
      return <Feather name="chevron-down" size={20} color="#FF3D71" />;
    } else {
      return (
        <Feather name="minus" size={20} color="rgba(255, 255, 255, 0.6)" />
      );
    }
  };

  const renderDetailTab = (tabName: string) => {
    return (
      <TouchableOpacity
        style={[
          stylesTournamentPage.detailTabButton,
          activeDetailTab === tabName &&
            stylesTournamentPage.activeDetailTabButton,
        ]}
        onPress={() => setActiveDetailTab(tabName)}
      >
        <Text
          style={[
            stylesTournamentPage.detailTabText,
            activeDetailTab === tabName &&
              stylesTournamentPage.activeDetailTabText,
          ]}
        >
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/placeholders/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={stylesTournamentPage.container}>
        {/* Main Content */}
        <View style={stylesTournamentPage.mainContent}>
          {isDesktop ? (
            <View style={stylesTournamentPage.desktopLayout}>
              {/* Left Panel - Tournament List */}
              <View style={stylesTournamentPage.leftPanel}>
                <Text style={stylesTournamentPage.sectionTitle}>
                  Tournaments
                </Text>
                <FlatList
                  data={SAMPLE_TOURNAMENTS}
                  renderItem={renderTournamentItem}
                  keyExtractor={(item) => item.id}
                  style={stylesTournamentPage.tournamentList}
                />
              </View>

              {/* Right Panel - Tournament Details */}
              <View style={stylesTournamentPage.rightPanel}>
                <View style={stylesTournamentPage.tournamentDetails}>
                  <View style={stylesTournamentPage.tournamentHeader}>
                    <View>
                      <Text style={stylesTournamentPage.tournamentBreadcrumb}>
                        RIVALS {">"} Tournaments
                      </Text>
                      <Text style={stylesTournamentPage.tournamentTitle}>
                        {selectedTournament.name}
                      </Text>
                      <Text style={stylesTournamentPage.tournamentTime}>
                        In about 25 minutes - {selectedTournament.startTime}
                      </Text>
                      {selectedTournament.status === "Open" && (
                        <View style={stylesTournamentPage.statusBadgeSmall}>
                          <Text style={stylesTournamentPage.statusTextSmall}>
                            Open
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={stylesTournamentPage.tournamentActions}>
                      <Text style={stylesTournamentPage.timerText}>
                        Starts in {selectedTournament.timeRemaining}
                      </Text>
                      <TouchableOpacity style={stylesTournamentPage.joinButton}>
                        <Text style={stylesTournamentPage.joinButtonText}>
                          Join Tournament
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={stylesTournamentPage.playersRegistered}>
                    {selectedTournament.playersRegistered}/
                    {selectedTournament.maxPlayers} Players Registered
                  </Text>

                  {/* Tournament Detail Tabs */}
                  <View style={stylesTournamentPage.detailTabs}>
                    {renderDetailTab("Overview")}
                    {renderDetailTab("Table")}
                    {renderDetailTab("Matches")}
                    {renderDetailTab("Players")}
                    {renderDetailTab("Prizes")}
                  </View>

                  {/* Leaderboard */}
                  <View style={stylesTournamentPage.leaderboardContainer}>
                    <View style={stylesTournamentPage.leaderboardHeader}>
                      <Text
                        style={stylesTournamentPage.leaderboardColumnHeader}
                      >
                        #
                      </Text>
                      <Text
                        style={[
                          stylesTournamentPage.leaderboardColumnHeader,
                          stylesTournamentPage.usernameHeader,
                        ]}
                      >
                        Username
                      </Text>
                      <Text
                        style={[
                          stylesTournamentPage.leaderboardColumnHeader,
                          stylesTournamentPage.pointsHeader,
                        ]}
                      >
                        Total Points
                      </Text>
                      <Text
                        style={[
                          stylesTournamentPage.leaderboardColumnHeader,
                          stylesTournamentPage.gainedHeader,
                        ]}
                      >
                        Points Gained
                      </Text>
                    </View>

                    {SAMPLE_LEADERBOARD.map((player) => (
                      <View
                        key={player.id}
                        style={stylesTournamentPage.leaderboardRow}
                      >
                        <View style={stylesTournamentPage.rankContainer}>
                          {renderMovementIcon(player.movement)}
                          <Image
                            source={player.avatar}
                            style={stylesTournamentPage.playerAvatar}
                          />
                          <Text style={stylesTournamentPage.rankText}>
                            {player.rank}
                          </Text>
                        </View>
                        <Text style={stylesTournamentPage.usernameText}>
                          {player.username}
                        </Text>
                        <Text style={stylesTournamentPage.pointsText}>
                          {player.totalPoints} Pts
                        </Text>
                        <Text
                          style={[
                            stylesTournamentPage.gainedText,
                            player.pointsGained > 0 &&
                              stylesTournamentPage.gainedPositive,
                            player.pointsGained === 0 &&
                              stylesTournamentPage.gainedNeutral,
                          ]}
                        >
                          {player.pointsGained > 0 ? "+" : ""}
                          {player.pointsGained} Pts
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            // Mobile layout - Can be implemented based on your needs
            <ScrollView>
              <Text style={stylesTournamentPage.mobileMessage}>
                Please view in desktop mode for the complete tournament
                experience.
              </Text>
              {/* You would add mobile-specific components here */}
            </ScrollView>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
