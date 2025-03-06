import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { homeStyles } from "@/styles/homeStyles";
import PerlinNoiseBackground from "@/components/perlinHero";
import GameModal from "./components/GameModal";
import TournamentsScreen from "./components/TournamentScreen";

// Simulated user balance
const userBalance = "$14,230";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("TRENDING");
  const windowWidth = Dimensions.get("window").width;
  const [showGameModal, setShowGameModal] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderTab = (tabName: string) => {
    return (
      <TouchableOpacity
        style={[
          homeStyles.tabButton,
          activeTab === tabName && homeStyles.activeTabButton,
        ]}
        onPress={() => setActiveTab(tabName)}
      >
        <Text
          style={[
            homeStyles.tabText,
            activeTab === tabName && homeStyles.activeTabText,
          ]}
        >
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  // Live matches data - now consolidated in one place for reuse
  const liveMatches = [
    {
      id: "match1",
      game: "Dota 2",
      type: "The International 2023",
      teams: [
        { name: "Team Spirit", score: 1 },
        { name: "Virtus Pro", score: 2 },
      ],
      viewers: 1502,
    },
    {
      id: "match2",
      game: "Noughts & Crosses",
      type: "Live Match",
      teams: [
        { name: "Rivals User 3", score: null, symbol: "X" },
        { name: "Rivals User 11", score: null, symbol: "O" },
      ],
      isLive: true,
    },
    {
      id: "match3",
      game: "Dota 2",
      type: "The International 2023",
      teams: [
        { name: "Team Liquid", score: 2 },
        { name: "Evil Geniuses", score: 2 },
      ],
      viewers: 1502,
      isLive: true,
    },
    {
      id: "match4",
      game: "Noughts & Crosses",
      type: "Live Match",
      teams: [
        { name: "Rivals User 2", score: null, symbol: "X" },
        { name: "Rivals User 4", score: null, symbol: "O" },
      ],
      isLive: true,
    },
  ];

  const renderLiveMatchesHorizontal = () => {
    return (
      <View style={homeStyles.liveMatchesSection}>
        <View style={homeStyles.sectionHeader}>
          <View style={homeStyles.sectionTitleContainer}>
            <View style={homeStyles.liveDot} />
            <Text style={homeStyles.sectionTitle}>LIVE MATCHES</Text>
          </View>
          <TouchableOpacity>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={homeStyles.horizontalScrollView}
        >
          {liveMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={homeStyles.liveMatchCard}
              onPress={() => {
                if (match.game === "Noughts & Crosses") {
                  setShowGameModal(true);
                } else {
                  alert("Match view coming soon!");
                }
              }}
            >
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

              {match.game === "Dota 2" && (
                <View style={homeStyles.matchFooter}>
                  <Text style={homeStyles.viewersCount}>{match.viewers}</Text>
                  <Ionicons name="star-outline" size={20} color="#8F9BB3" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFeaturedEvents = () => {
    // Your existing implementation...
    return (
      <View style={homeStyles.sectionContainer}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>FEATURED EVENTS</Text>
          <TouchableOpacity>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={homeStyles.featuredScrollView}
        >
          {/* Fortnite Showdown Card */}
          <TouchableOpacity
            style={homeStyles.eventCard}
            onPress={() => alert("Coming soon!")}
          >
            <View style={homeStyles.eventCardContent}>
              <Text style={homeStyles.eventTitle}>Fortnite Showdown</Text>
              <Text style={homeStyles.eventDescription}>
                Head to head in an epic Fortnite battle. Who will claim victory?
              </Text>
              <TouchableOpacity style={homeStyles.stakeButton}>
                <Text style={homeStyles.stakeButtonText}>Stake Now</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* NBA 2K League Card */}
          <TouchableOpacity
            style={homeStyles.eventCard}
            onPress={() => alert("Coming soon!")}
          >
            <View style={homeStyles.eventCardContent}>
              <Text style={homeStyles.eventTitle}>NBA 2K League</Text>
              <Text style={homeStyles.eventDescription}>
                Bucks Gaming vs 76ers GC
              </Text>
              <View style={homeStyles.scoreContainer}>
                <Text style={homeStyles.scoreText}>95 - 103</Text>
                <Text style={homeStyles.timeText}>Q4 2:07</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Request a Game Card */}
          <TouchableOpacity
            style={homeStyles.eventCard}
            onPress={() => alert("Feature coming soon!")}
          >
            <View style={homeStyles.eventCardContent}>
              <Text style={homeStyles.eventTitle}>Request a Game</Text>
              <Text style={homeStyles.eventDescription}>
                Want us to add a game? We're constantly expanding the games we
                support.
              </Text>
              <TouchableOpacity style={homeStyles.requestButton}>
                <Text style={homeStyles.requestButtonText}>Request</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderGames = () => {
    // Your existing implementation...
    const games = [
      { id: "trending", icon: "trending-up", title: "Trending" },
      { id: "dota2", icon: "gamepad", title: "Dota 2" },
      {
        id: "tictactoe",
        icon: "times",
        title: "Noughts & Crosses",
        functional: true,
      },
      { id: "csgo", icon: "gamepad", title: "CS:GO" },
    ];

    return (
      <View style={homeStyles.sectionContainer}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>GAMES</Text>
          <TouchableOpacity>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={homeStyles.gamesScrollView}
        >
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[
                homeStyles.gameButton,
                game.functional && homeStyles.functionalGame,
              ]}
              onPress={() => {
                if (game.id === "tictactoe") {
                  setShowGameModal(true);
                } else {
                  alert("Game coming soon!");
                }
              }}
            >
              <FontAwesome5
                name={game.icon}
                size={24}
                color={game.id === "trending" ? "#3366FF" : "#8F9BB3"}
              />
              <Text style={homeStyles.gameButtonText}>{game.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTopCompetitions = () => {
    // Your existing implementation...
    const competitions = [
      { id: "comp1", name: "DOTA", icon: "futbol", count: 26 },
      { id: "comp2", name: "Fortnite", icon: "futbol", count: 12 },
      { id: "comp3", name: "NBA 2K24", icon: "basketball-ball", count: 8 },
      { id: "comp4", name: "Madden NFL 25", icon: "gamepad", count: 4 },
    ];

    return (
      <View style={homeStyles.sectionContainer}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>TOP COMPETITIONS</Text>
          <TouchableOpacity>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.competitionsContainer}>
          {competitions.map((comp) => (
            <TouchableOpacity
              key={comp.id}
              style={homeStyles.competitionCard}
              onPress={() => alert("Competition details coming soon!")}
            >
              <View style={homeStyles.competitionContent}>
                <FontAwesome5
                  name={comp.icon}
                  size={20}
                  color="#3366FF"
                  style={homeStyles.competitionIcon}
                />
                <Text style={homeStyles.competitionName}>{comp.name}</Text>
              </View>
              <View style={homeStyles.competitionCountBadge}>
                <Text style={homeStyles.competitionCount}>{comp.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderAllMatches = () => {
    // Your existing implementation...
    // Calculate number of columns based on screen width
    const numColumns = windowWidth > 1200 ? 3 : windowWidth > 768 ? 2 : 1;

    // Combined matches - live and upcoming
    const allMatches = [
      ...liveMatches,
      {
        id: "match5",
        game: "FIFA 23",
        type: "Weekly Tournament",
        isLive: false,
        startTime: "18:30",
        teams: [
          { name: "Rivals FC", score: null },
          { name: "Gaming United", score: null },
        ],
      },
      {
        id: "match6",
        game: "CS:GO",
        type: "Major Qualifiers",
        isLive: false,
        startTime: "20:15",
        teams: [
          { name: "Natus Vincere", score: null },
          { name: "Astralis", score: null },
        ],
      },
    ];

    return (
      <View style={homeStyles.sectionContainer}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>ALL MATCHES</Text>
          <View style={homeStyles.filterOptions}>
            <TouchableOpacity style={homeStyles.filterOptionActive}>
              <Text style={homeStyles.filterOptionTextActive}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.filterOption}>
              <Text style={homeStyles.filterOptionText}>Live</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.filterOption}>
              <Text style={homeStyles.filterOptionText}>Upcoming</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={homeStyles.matchesGrid}>
          {allMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={[
                homeStyles.matchCard,
                { width: `${100 / numColumns - 2}%` },
              ]}
              onPress={() => {
                if (match.game === "Noughts & Crosses") {
                  setShowGameModal(true);
                } else {
                  alert("Match view coming soon!");
                }
              }}
            >
              <View style={homeStyles.matchHeader}>
                <View style={homeStyles.gameInfo}>
                  {match.game === "Dota 2" ? (
                    <FontAwesome5
                      name="steam"
                      size={20}
                      color="#8F9BB3"
                      style={homeStyles.gameIcon}
                    />
                  ) : match.game === "FIFA 23" ? (
                    <FontAwesome5
                      name="futbol"
                      size={20}
                      color="#8F9BB3"
                      style={homeStyles.gameIcon}
                    />
                  ) : match.game === "CS:GO" ? (
                    <FontAwesome5
                      name="crosshairs"
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
                {match.isLive !== false ? (
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
                  <View key={index} style={homeStyles.teamRow}>
                    <Text style={homeStyles.teamName}>{team.name}</Text>
                    {team.score !== null && (
                      <Text style={homeStyles.teamScore}>{team.score}</Text>
                    )}
                    {match.game === "Noughts & Crosses" && "symbol" in team && (
                      <View style={homeStyles.noughtsContainer}>
                        <Text style={homeStyles.noughtsSymbol}>
                          {team.symbol}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {"viewers" in match && match.viewers !== undefined && (
                <View style={homeStyles.matchFooter}>
                  <Text style={homeStyles.viewersCount}>{match.viewers}</Text>
                  <Ionicons name="star-outline" size={20} color="#8F9BB3" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={homeStyles.showMoreButton}>
          <Text style={homeStyles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render content based on the selected tab
  const renderContent = () => {
    if (activeTab === "TOURNAMENTS") {
      // When Tournaments tab is selected, render the TournamentsScreen
      return <TournamentsScreen />;
    } else {
      // For other tabs, render the default content
      return (
        <ScrollView style={homeStyles.contentContainer}>
          {/* Live Matches at the top */}
          {renderLiveMatchesHorizontal()}

          {/* Featured Events */}
          {renderFeaturedEvents()}

          {/* Games Section */}
          {renderGames()}

          {/* Top Competitions */}
          {renderTopCompetitions()}

          {/* All Matches */}
          {renderAllMatches()}
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        <View style={homeStyles.logoContainer}>
          {/* Logo SVG image */}
          <Image
            source={require("@/assets/images/logo-original.svg")}
            style={homeStyles.headerLogo}
            resizeMode="contain"
          />
        </View>

        <View style={homeStyles.searchBar}>
          <Ionicons name="search" size={20} color="#8F9BB3" />
          <Text style={homeStyles.searchPlaceholder}>
            Search by events, teams, and influencers
          </Text>
        </View>

        <TouchableOpacity style={homeStyles.balanceButton}>
          <Text style={homeStyles.balanceText}>{userBalance}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={homeStyles.menuButton}>
          <Ionicons name="log-out-outline" size={24} color="#1A1A2E" />
        </TouchableOpacity>
      </View>

      {/* Navigation Tabs */}
      <View style={homeStyles.tabContainer}>
        <View style={homeStyles.liveIndicator}>
          <View style={homeStyles.liveDot} />
          <Text style={homeStyles.liveText}>LIVE</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={homeStyles.tabsScrollView}
        >
          {renderTab("TRENDING")}
          {renderTab("TEAMS")}
          {renderTab("TOURNAMENTS")}
          {renderTab("LEAGUES")}
          {renderTab("INFLUENCERS")}
          {renderTab("FRIENDS")}
        </ScrollView>
      </View>

      {/* Main content with background */}
      <View style={homeStyles.mainContentWrapper}>
        {/* Perlin Noise Background - positioned as fixed */}
        {/* <View style={homeStyles.backgroundContainer}>
          <PerlinNoiseBackground />
        </View> */}

        {/* Render content based on active tab */}
        {renderContent()}
      </View>

      {/* Game Modal */}
      <GameModal
        visible={showGameModal}
        onClose={() => setShowGameModal(false)}
      />
    </SafeAreaView>
  );
}
