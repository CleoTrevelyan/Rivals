import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyles } from "@/styles/homeStyles";
import SearchBar from "./SearchBar";
import CreateGameButton from "../(home)/components/CreateGameButton";

interface HeaderProps {
  userBalance: string;
  onCreateGame: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userBalance,
  onCreateGame,
  onLogout,
}) => {
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.logoContainer}>
        {/* Logo SVG image */}
        <Image
          source={require("@/assets/images/logo-light.svg")}
          style={homeStyles.headerLogo}
          resizeMode="contain"
        />
      </View>

      <SearchBar />

      {/* Create Game Button */}
      <CreateGameButton onPress={onCreateGame} />

      <TouchableOpacity style={homeStyles.balanceButton}>
        <Text style={homeStyles.balanceText}>{userBalance}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogout} style={homeStyles.menuButton}>
        <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
