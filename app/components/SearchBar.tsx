import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyles } from "@/styles/homeStyles";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search by events, teams, and influencers",
}) => {
  return (
    <View style={homeStyles.searchBar}>
      <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.6)" />
      <Text style={homeStyles.searchPlaceholder}>{placeholder}</Text>
    </View>
  );
};

export default SearchBar;
