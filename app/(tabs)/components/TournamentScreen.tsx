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
} from "react-native";
import { Feather } from "@expo/vector-icons";
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
const SAMPLE_LEADERBOARD: {
  id: string;
  rank: number;
  username: string;
  avatar: any;
  totalPoints: number;
  pointsGained: number;
  movement: "up" | "down" | "neutral";
}[] = [
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
        styles.tournamentItem,
        selectedTournament.id === item.id && styles.selectedTournamentItem,
      ]}
      onPress={() => setSelectedTournament(item)}
    >
      <Text style={styles.tournamentName}>{item.name}</Text>
      <View style={styles.tournamentMetaContainer}>
        <Text style={styles.tournamentMeta}>
          {item.playersRegistered}/{item.maxPlayers} Players
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Open"
              ? styles.statusOpen
              : item.status === "Ongoing"
              ? styles.statusOngoing
              : styles.statusUpcoming,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMovementIcon = (movement: "up" | "down" | "neutral") => {
    if (movement === "up") {
      return <Feather name="chevron-up" size={20} color="#4CAF50" />;
    } else if (movement === "down") {
      return <Feather name="chevron-down" size={20} color="#F44336" />;
    } else {
      return <Feather name="minus" size={20} color="#9E9E9E" />;
    }
  };

  const renderDetailTab = (tabName: string) => {
    return (
      <TouchableOpacity
        style={[
          styles.detailTabButton,
          activeDetailTab === tabName && styles.activeDetailTabButton,
        ]}
        onPress={() => setActiveDetailTab(tabName)}
      >
        <Text
          style={[
            styles.detailTabText,
            activeDetailTab === tabName && styles.activeDetailTabText,
          ]}
        >
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoAndSearch}>
          <Image
            source={require("@/assets/images/logo-original.svg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color="#8F9BB3"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by events, teams, and influencers"
              placeholderTextColor="#8F9BB3"
            />
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.balanceText}>$14,230</Text>
          <Feather name="user" size={24} color="#333" />
          <Feather name="menu" size={24} color="#333" style={styles.menuIcon} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {isDesktop ? (
          <View style={styles.desktopLayout}>
            {/* Left Panel - Tournament List */}
            <View style={styles.leftPanel}>
              <Text style={styles.sectionTitle}>Tournaments</Text>
              <FlatList
                data={SAMPLE_TOURNAMENTS}
                renderItem={renderTournamentItem}
                keyExtractor={(item) => item.id}
                style={styles.tournamentList}
              />
            </View>

            {/* Right Panel - Tournament Details */}
            <View style={styles.rightPanel}>
              <View style={styles.tournamentDetails}>
                <View style={styles.tournamentHeader}>
                  <View>
                    <Text style={styles.tournamentBreadcrumb}>
                      RIVALS {">"} Tournaments
                    </Text>
                    <Text style={styles.tournamentTitle}>
                      {selectedTournament.name}
                    </Text>
                    <Text style={styles.tournamentTime}>
                      In about 25 minutes - {selectedTournament.startTime}
                    </Text>
                    {selectedTournament.status === "Open" && (
                      <View style={styles.statusBadgeSmall}>
                        <Text style={styles.statusTextSmall}>Open</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.tournamentActions}>
                    <Text style={styles.timerText}>
                      Starts in {selectedTournament.timeRemaining}
                    </Text>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join Tournament</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.playersRegistered}>
                  {selectedTournament.playersRegistered}/
                  {selectedTournament.maxPlayers} Players Registered
                </Text>

                {/* Tournament Detail Tabs */}
                <View style={styles.detailTabs}>
                  {renderDetailTab("Overview")}
                  {renderDetailTab("Table")}
                  {renderDetailTab("Matches")}
                  {renderDetailTab("Players")}
                  {renderDetailTab("Prizes")}
                </View>

                {/* Leaderboard */}
                <View style={styles.leaderboardContainer}>
                  <View style={styles.leaderboardHeader}>
                    <Text style={styles.leaderboardColumnHeader}>#</Text>
                    <Text
                      style={[
                        styles.leaderboardColumnHeader,
                        styles.usernameHeader,
                      ]}
                    >
                      Username
                    </Text>
                    <Text
                      style={[
                        styles.leaderboardColumnHeader,
                        styles.pointsHeader,
                      ]}
                    >
                      Total Points
                    </Text>
                    <Text
                      style={[
                        styles.leaderboardColumnHeader,
                        styles.gainedHeader,
                      ]}
                    >
                      Points Gained
                    </Text>
                  </View>

                  {SAMPLE_LEADERBOARD.map((player) => (
                    <View key={player.id} style={styles.leaderboardRow}>
                      <View style={styles.rankContainer}>
                        {renderMovementIcon(player.movement)}
                        <Image
                          source={player.avatar}
                          style={styles.playerAvatar}
                        />
                        <Text style={styles.rankText}>{player.rank}</Text>
                      </View>
                      <Text style={styles.usernameText}>{player.username}</Text>
                      <Text style={styles.pointsText}>
                        {player.totalPoints} Pts
                      </Text>
                      <Text
                        style={[
                          styles.gainedText,
                          player.pointsGained > 0 && styles.gainedPositive,
                          player.pointsGained === 0 && styles.gainedNeutral,
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
            <Text style={styles.mobileMessage}>
              Please view in desktop mode for the complete tournament
              experience.
            </Text>
            {/* You would add mobile-specific components here */}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  logoAndSearch: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 80,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF1F7",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 20,
    flex: 1,
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontSize: 14,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  menuIcon: {
    marginLeft: 20,
  },
  mainContent: {
    flex: 1,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  leftPanel: {
    width: 300,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#F0F0F0",
  },
  rightPanel: {
    flex: 1,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tournamentList: {
    flex: 1,
  },
  tournamentItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#F8F9FC",
  },
  selectedTournamentItem: {
    backgroundColor: "#E8F0FE",
    borderLeftWidth: 4,
    borderLeftColor: "#4285F4",
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tournamentMetaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tournamentMeta: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeSmall: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusOpen: {
    backgroundColor: "#E8F5E9",
  },
  statusOngoing: {
    backgroundColor: "#E3F2FD",
  },
  statusUpcoming: {
    backgroundColor: "#FFF8E1",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextSmall: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  tournamentBreadcrumb: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  tournamentTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tournamentTime: {
    fontSize: 14,
    color: "#666",
  },
  tournamentActions: {
    alignItems: "flex-end",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "600",
  },
  playersRegistered: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  detailTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
  },
  detailTabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeDetailTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4285F4",
  },
  detailTabText: {
    fontSize: 16,
    color: "#666",
  },
  activeDetailTabText: {
    color: "#4285F4",
    fontWeight: "600",
  },
  leaderboardContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  leaderboardHeader: {
    flexDirection: "row",
    backgroundColor: "#F8F9FC",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  leaderboardColumnHeader: {
    fontWeight: "600",
    fontSize: 16,
  },
  usernameHeader: {
    flex: 2,
    paddingLeft: 60,
  },
  pointsHeader: {
    flex: 1,
    textAlign: "center",
  },
  gainedHeader: {
    flex: 1,
    textAlign: "right",
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rankContainer: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  playerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  rankText: {
    fontWeight: "600",
    fontSize: 16,
  },
  usernameText: {
    flex: 2,
    fontSize: 16,
  },
  pointsText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  gainedText: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  gainedPositive: {
    color: "#4CAF50",
  },
  gainedNeutral: {
    color: "#9E9E9E",
  },
  mobileMessage: {
    padding: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
