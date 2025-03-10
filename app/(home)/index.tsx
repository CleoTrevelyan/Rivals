import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { homeStyles } from "@/styles/homeStyles";
import JoinGameModal from "./components/JoinGameModal";
import CreateGameModal from "./components/CreateGameModal";
import TournamentsScreen from "./components/TournamentScreen";
import { RivalsServer } from "@/components/constants";

// Import components
import Header from "../components/Navbar";
import TabNavigation from "../components/TabNavigation";
import LiveMatchCard from "./components/cards/LiveMatchCard";
import MatchCard from "./components/cards/MatchCard";
import EventCard from "./components/cards/EventCard";
import CompetitionCard from "./components/cards/CompetitionCard";
import GameButton from "./components/cards/GameButton";

// Simulated user balance
const userBalance = "$14,230";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("TRENDING");
  const windowWidth = Dimensions.get("window").width;
  const [showGameModal, setShowGameModal] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(RivalsServer);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (socket) {
        const message = {
          type: "logout",
        };
        socket.send(JSON.stringify(message));
      }
      await AsyncStorage.removeItem("authToken");
      router.replace("/(auth)");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Separate state for create game modal
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);

  // Function to handle Create Game button press
  const handleCreateGamePress = () => {
    setShowCreateGameModal(true);
  };

  // Live matches data
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
      isLive: true,
    },
    {
      id: "match2",
      game: "Noughts & Crosses",
      type: "Live Match",
      teams: [
        { name: "Rivals User 3", score: null, symbol: "X" as "X" },
        { name: "Rivals User 11", score: null, symbol: "O" as "O" },
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
        { name: "Rivals User 2", score: null, symbol: "X" as "X" },
        { name: "Rivals User 4", score: null, symbol: "O" as "O" },
      ],
      isLive: true,
    },
  ];

  // Event data for featured events
  const featuredEvents = [
    {
      id: "event1",
      title: "Fortnite Showdown",
      description:
        "Head to head in an epic Fortnite battle. Who will claim victory?",
      buttonText: "Stake Now",
      buttonType: "stake" as "stake",
    },
    {
      id: "event2",
      title: "NBA 2K League",
      description: "Bucks Gaming vs 76ers GC",
      score: 95,
      time: "103",
    },
    {
      id: "event3",
      title: "Request a Game",
      description:
        "Want us to add a game? We're constantly expanding the games we support.",
      buttonText: "Request",
      buttonType: "request" as "request",
    },
  ];

  // Game data
  const games = [
    {
      id: "trending",
      icon: "trending-up",
      title: "Trending",
      functional: false,
    },
    { id: "dota2", icon: "gamepad", title: "Dota 2", functional: false },
    {
      id: "tictactoe",
      icon: "times",
      title: "Noughts & Crosses",
      functional: true,
    },
    { id: "csgo", icon: "gamepad", title: "CS:GO", functional: false },
  ];

  // Competition data
  const competitions = [
    { id: "comp1", name: "DOTA", icon: "futbol", count: 26 },
    { id: "comp2", name: "Fortnite", icon: "futbol", count: 12 },
    { id: "comp3", name: "NBA 2K24", icon: "basketball-ball", count: 8 },
    { id: "comp4", name: "Madden NFL 25", icon: "gamepad", count: 4 },
  ];

  // All matches - live and upcoming
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
            <LiveMatchCard
              key={match.id}
              match={match}
              onPress={() => {
                if (match.game === "Noughts & Crosses") {
                  setShowGameModal(true);
                } else {
                  alert("Match view coming soon!");
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFeaturedEvents = () => {
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
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => alert("Coming soon!")}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderGames = () => {
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
            <GameButton
              key={game.id}
              game={game}
              onPress={() => {
                if (game.id === "tictactoe") {
                  setShowGameModal(true);
                } else {
                  alert("Game coming soon!");
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTopCompetitions = () => {
    return (
      <View style={homeStyles.sectionContainer}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>TOP COMPETITIONS</Text>
          <TouchableOpacity>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.competitionsContainer}>
          {competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onPress={() => alert("Competition details coming soon!")}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderAllMatches = () => {
    // Calculate number of columns based on screen width
    const numColumns = windowWidth > 1200 ? 3 : windowWidth > 768 ? 2 : 1;
    const cardWidth = windowWidth / numColumns - 20; // Adjust 20 for padding/margin if needed

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
            <MatchCard
              key={match.id}
              match={match}
              width={cardWidth}
              onPress={() => {
                if (match.game === "Noughts & Crosses") {
                  setShowGameModal(true);
                } else {
                  alert("Match view coming soon!");
                }
              }}
            />
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
    <ImageBackground
      source={require("@/assets/images/placeholders/background.png")}
      style={homeStyles.backgroundImage}
    >
      <SafeAreaView style={homeStyles.container}>
        {/* Header Component */}
        <Header
          userBalance={userBalance}
          onCreateGame={handleCreateGamePress}
          onLogout={handleLogout}
        />

        {/* Tab Navigation Component */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            "TRENDING",
            "TEAMS",
            "TOURNAMENTS",
            "LEAGUES",
            "INFLUENCERS",
            "FRIENDS",
          ]}
        />

        {/* Main content with background */}
        <View style={homeStyles.mainContentWrapper}>
          {/* Render content based on active tab */}
          {renderContent()}
        </View>

        {/* Game Modal - for joining existing games */}
        <JoinGameModal
          visible={showGameModal}
          onClose={() => setShowGameModal(false)}
        />

        {/* Create Game Modal - for creating new games */}
        <CreateGameModal
          visible={showCreateGameModal}
          onClose={() => setShowCreateGameModal(false)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
