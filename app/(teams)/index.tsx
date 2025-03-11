import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { teamManagementStyles } from "@/styles/pageStyles/managementStyles";
import { TeamData, teamsData } from "./teams.data"; 

interface TeamManagementProps {
  visible: boolean;
  onClose: () => void;
}

export default function TeamManagement({
  visible,
  onClose,
}: TeamManagementProps) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [activeTab, setActiveTab] = useState("Teams");
  const [teams, setTeams] = useState<TeamData[]>(teamsData);

  // Update window dimensions when orientation changes
  useEffect(() => {
    const updateLayout = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      // Cleanup for newer React Native versions
    };
  }, []);

  // Check if mobile view
  const isMobile = windowWidth < 768;

  const renderTabNavigation = () => {
    return (
      <View style={teamManagementStyles.tabContainer}>
        {["Teams", "Upcoming Events", "Past Events"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              teamManagementStyles.tab,
              activeTab === tab && teamManagementStyles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                teamManagementStyles.tabText,
                activeTab === tab && teamManagementStyles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTeams = () => {
    return (
      <View style={teamManagementStyles.teamsContainer}>
        {teams.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={teamManagementStyles.teamCard}
            onPress={() => console.log(`Selected team: ${team.name}`)}
          >
            <View style={teamManagementStyles.teamIconContainer}>
              {team.logoUrl ? (
                <Image
                  source={{ uri: team.logoUrl }}
                  style={teamManagementStyles.teamLogo}
                  resizeMode="contain"
                />
              ) : (
                <FontAwesome5
                  name={team.icon}
                  size={32}
                  color="#fff"
                  style={teamManagementStyles.teamIcon}
                />
              )}
            </View>
            <Text style={teamManagementStyles.teamName}>{team.name}</Text>
            <View
              style={[
                teamManagementStyles.responsibilityBadge,
                team.responsibility === "owner"
                  ? teamManagementStyles.ownerBadge
                  : teamManagementStyles.memberBadge,
              ]}
            >
              <Text style={teamManagementStyles.responsibilityText}>
                {team.responsibility === "owner" ? "Owner" : "Member"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderUpcomingEvents = () => {
    return (
      <View style={teamManagementStyles.eventsContainer}>
        <View style={teamManagementStyles.eventCard}>
          <View style={teamManagementStyles.eventHeader}>
            <Text style={teamManagementStyles.eventTitle}>Rivals League</Text>
            <Text style={teamManagementStyles.eventDate}>
              March 21, 2025 04:30 PM
            </Text>
          </View>
          <View style={teamManagementStyles.matchupContainer}>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.teamIconContainerSmall}>
                <FontAwesome5 name="user-ninja" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>
                Ninja Warriors
              </Text>
            </View>
            <Text style={teamManagementStyles.vsText}>VS</Text>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.oppIconContainer}>
                <Text style={teamManagementStyles.oppIconText}>2</Text>
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>DOTA 2</Text>
            </View>
          </View>
          <View style={teamManagementStyles.readyContainer}>
            <Text style={teamManagementStyles.readyText}>READY!</Text>
          </View>
        </View>

        <View style={teamManagementStyles.eventCard}>
          <View style={teamManagementStyles.eventHeader}>
            <Text style={teamManagementStyles.eventTitle}>Friendly</Text>
            <Text style={teamManagementStyles.eventDate}>
              March 23, 2025 05:30 PM
            </Text>
          </View>
          <View style={teamManagementStyles.matchupContainer}>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.teamIconContainerSmall}>
                <FontAwesome5 name="rocket" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>
                The Mavericks
              </Text>
            </View>
            <Text style={teamManagementStyles.vsText}>VS</Text>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.oppTeamIconContainer}>
                <FontAwesome5 name="chess-knight" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>
                Dark Angels
              </Text>
            </View>
          </View>
          <View style={teamManagementStyles.readyContainer}>
            <Text style={teamManagementStyles.readyText}>READY!</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPastEvents = () => {
    return (
      <View style={teamManagementStyles.eventsContainer}>
        <View style={teamManagementStyles.eventCard}>
          <View style={teamManagementStyles.eventHeader}>
            <Text style={teamManagementStyles.eventTitle}>Rivals League</Text>
            <Text style={teamManagementStyles.eventDate}>
              March 15, 2025 04:30 PM
            </Text>
          </View>
          <View style={teamManagementStyles.matchupContainer}>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.teamIconContainerSmall}>
                <FontAwesome5 name="user-ninja" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>
                Ninja Warriors
              </Text>
            </View>
            <Text style={teamManagementStyles.vsText}>VS</Text>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.oppIconContainer}>
                <Text style={teamManagementStyles.oppIconText}>2</Text>
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>DOTA 2</Text>
            </View>
          </View>
          <View style={teamManagementStyles.scoreContainer}>
            <Text style={teamManagementStyles.resultText}>WIN</Text>
            <Text style={teamManagementStyles.scoreText}>5-3</Text>
          </View>
        </View>

        <View style={teamManagementStyles.eventCard}>
          <View style={teamManagementStyles.eventHeader}>
            <Text style={teamManagementStyles.eventTitle}>Friendly</Text>
            <Text style={teamManagementStyles.eventDate}>
              March 10, 2025 05:30 PM
            </Text>
          </View>
          <View style={teamManagementStyles.matchupContainer}>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.teamIconContainerSmall}>
                <FontAwesome5 name="chess-knight" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>Cereals</Text>
            </View>
            <Text style={teamManagementStyles.vsText}>VS</Text>
            <View style={teamManagementStyles.teamMatchup}>
              <View style={teamManagementStyles.oppTeamIconContainer}>
                <FontAwesome5 name="gamepad" size={24} color="#fff" />
              </View>
              <Text style={teamManagementStyles.teamMatchupName}>
                Dark Angels
              </Text>
            </View>
          </View>
          <View style={teamManagementStyles.scoreContainer}>
            <Text style={teamManagementStyles.resultTextLoss}>LOSS</Text>
            <Text style={teamManagementStyles.scoreText}>1-3</Text>
          </View>
        </View>
      </View>
    );
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Teams":
        return renderTeams();
      case "Upcoming Events":
        return renderUpcomingEvents();
      case "Past Events":
        return renderPastEvents();
      default:
        return renderTeams();
    }
  };

  const renderHeader = () => {
    return (
      <View style={teamManagementStyles.headerContainer}>
        <View style={teamManagementStyles.headerLeftSection}>
          <Text style={teamManagementStyles.headerText}>Home</Text>
          <Text style={teamManagementStyles.headerSeparator}>/</Text>
          <Text style={teamManagementStyles.headerText}>Teams</Text>
        </View>
        <Text style={teamManagementStyles.headerTitle}>MANAGE TEAMS</Text>
      </View>
    );
  };

  const renderActionButtons = () => {
    return (
      <View style={teamManagementStyles.actionButtonsContainer}>
        <TouchableOpacity
          style={teamManagementStyles.createTeamButton}
          onPress={() => console.log("Create Team pressed")}
        >
          <Text style={teamManagementStyles.createTeamButtonText}>
            Create Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={teamManagementStyles.joinTeamButton}
          onPress={() => console.log("Join Team pressed")}
        >
          <Text style={teamManagementStyles.joinTeamButtonText}>Join Team</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide" // Keep slide animation for sliding up from bottom
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      <View style={teamManagementStyles.modalOverlay}>
        <View style={teamManagementStyles.modalContainer}>
          <View style={teamManagementStyles.modalHeader}>
            <Text style={teamManagementStyles.modalTitle}>Team Management</Text>
            <TouchableOpacity
              onPress={onClose}
              style={teamManagementStyles.closeButton}
            >
              <FontAwesome5 name="times" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={teamManagementStyles.scrollContainer}>
            {renderHeader()}
            {renderActionButtons()}
            {renderTabNavigation()}
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
