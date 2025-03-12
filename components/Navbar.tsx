import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyles } from "../app/(home)/styles/homeStyles";
import { HeaderProps } from "@/interface/types";
import SearchBar from "./SearchBar";
import PlayButton from "../app/(home)/components/buttons/PlayButton";
import TeamButton from "../app/(home)/components/buttons/TeamButton";
import PlayModal from "../app/(home)/components/modals/PlayModal";
import TeamManagement from "../app/(teams)/index";

const Header: React.FC<HeaderProps> = ({
  userBalance,
  onCreateGame,
  onJoinGame,
  onLogout,
  handleMatchmaking,
  playModalVisible,
  setPlayModalVisible,
  handleTeamPress: externalHandleTeamPress,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const isMobile = windowWidth < 768;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showTeamManagement, setShowTeamManagement] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Internal team press handler that also shows team management
  const handleTeamPressInternal = () => {
    setShowTeamManagement(true);
    // Call the external handler if provided
    if (externalHandleTeamPress) {
      externalHandleTeamPress();
    }
  };

  // Mobile menu modal
  const renderMobileMenu = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuOpen}
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={homeStyles.mobileMenuContainer}>
          <View style={homeStyles.mobileMenuContent}>
            <TouchableOpacity
              style={homeStyles.mobileMenuCloseButton}
              onPress={() => setMenuOpen(false)}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.mobileMenuItem}
              onPress={() => {
                setMenuOpen(false);
                setPlayModalVisible(true);
              }}
            >
              <Ionicons name="play-circle-outline" size={20} color="#FFFFFF" />
              <Text style={homeStyles.mobileMenuItemText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.mobileMenuItem}
              onPress={() => {
                setMenuOpen(false);
                handleTeamPressInternal();
              }}
            >
              <Ionicons name="people-outline" size={20} color="#FFFFFF" />
              <Text style={homeStyles.mobileMenuItemText}>Team</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyles.mobileMenuItem}>
              <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
              <Text style={homeStyles.mobileMenuItemText}>
                Balance: ${userBalance}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={homeStyles.mobileMenuItem}
              onPress={onLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              <Text style={homeStyles.mobileMenuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (isMobile) {
    // Mobile layout
    return (
      <>
        <View style={homeStyles.header}>
          <View style={homeStyles.logoContainer}>
            <Image
              source={require("@/assets/images/logo-light.svg")}
              style={homeStyles.headerLogo}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={[homeStyles.balanceButton, homeStyles.mobileBalanceButton]}
          >
            <Text style={homeStyles.balanceText}>${userBalance}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMenu} style={homeStyles.menuButton}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {renderMobileMenu()}
        <PlayModal
          visible={playModalVisible}
          onClose={() => setPlayModalVisible(false)}
          onCreateGame={onCreateGame}
          onJoinGame={onJoinGame}
          onMatchmaking={handleMatchmaking}
        />
        <TeamManagement
          visible={showTeamManagement}
          onClose={() => setShowTeamManagement(false)}
        />
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <View style={homeStyles.header}>
        <View style={homeStyles.logoContainer}>
          <Image
            source={require("@/assets/images/logo-light.svg")}
            style={homeStyles.headerLogo}
            resizeMode="contain"
          />
        </View>

        <SearchBar />

        <PlayButton onPress={() => setPlayModalVisible(true)} />

        <TeamButton onPress={handleTeamPressInternal} />

        <TouchableOpacity style={homeStyles.balanceButton}>
          <Text style={homeStyles.balanceText}>${userBalance}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout} style={homeStyles.menuButton}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <PlayModal
        visible={playModalVisible}
        onClose={() => setPlayModalVisible(false)}
        onCreateGame={onCreateGame}
        onJoinGame={onJoinGame}
        onMatchmaking={handleMatchmaking}
      />

      <TeamManagement
        visible={showTeamManagement}
        onClose={() => setShowTeamManagement(false)}
      />
    </>
  );
};

export default Header;
