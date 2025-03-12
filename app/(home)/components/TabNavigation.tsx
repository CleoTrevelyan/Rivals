import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { homeStyles } from "../styles/homeStyles";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  tabs: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs = [
    "TRENDING",
    "TEAMS",
    "TOURNAMENTS",
    "LEAGUES",
    "INFLUENCERS",
    "FRIENDS",
  ],
}) => {
  const renderTab = (tabName: string) => {
    return (
      <TouchableOpacity
        key={tabName}
        style={[
          homeStyles.tabButton,
          activeTab === tabName && homeStyles.activeTabButton,
        ]}
        onPress={() => onTabChange(tabName)}
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

  return (
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
        {tabs.map((tab) => renderTab(tab))}
      </ScrollView>
    </View>
  );
};

export default TabNavigation;
