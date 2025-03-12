import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { authStyles } from "../styles/authStyles";

type FeatureCardsProps = {
  isMobileView: boolean;
};

// Set fixed dimensions for cards in mobile view
const additionalStyles = StyleSheet.create({
  mobileContainer: {
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
    height: 280, // Ensure container has enough height
  },
  card: {
    width: 250, // Fixed width for mobile
    marginHorizontal: 8,
  },
  middleCard: {
    width: 250, // Fixed width for mobile
    height: 280, // Taller height for middle card
    marginHorizontal: 8,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
});

const FeatureCards: React.FC<FeatureCardsProps> = ({ isMobileView }) => {
  // Get the current window width for debugging
  const windowWidth = Dimensions.get("window").width;

  if (isMobileView) {
    // Mobile view with manually set dimensions and horizontal scroll
    return (
      <View style={additionalStyles.mobileContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={additionalStyles.scrollView}
          contentContainerStyle={additionalStyles.scrollContent}
        >
          {/* Feature card: Play as a team */}
          <View
            style={[
              additionalStyles.card,
              {
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                height: 240,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/placeholders/placeholder2.png")}
              style={authStyles.featureCardBackground}
              resizeMode="cover"
            />
            <View style={authStyles.featureCardContent}>
              <Text style={authStyles.featureTitle}>
                Play as a team and earn together
              </Text>
              <Text style={authStyles.featureDescription}>
                Manage your crew, splitting buy-ins and payouts
              </Text>
            </View>
          </View>

          {/* Feature card: Find matches and earn (MIDDLE CARD) */}
          <View
            style={[
              additionalStyles.middleCard,
              {
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/placeholders/placeholder1.png")}
              style={authStyles.featureCardBackground}
              resizeMode="cover"
            />
            <View style={authStyles.featureCardContent}>
              <Text style={authStyles.featureTitle}>
                Find matches and{" "}
                <Text style={{ fontWeight: "bold", color: "#02F199" }}>
                  earn
                </Text>{" "}
              </Text>
              <Text style={authStyles.featureDescription}>
                Stake on every match, or compete for free to rank up
              </Text>
            </View>
          </View>

          {/* Feature card: Compete in matches */}
          <View
            style={[
              additionalStyles.card,
              {
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                height: 240,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/placeholders/placeholder3.png")}
              style={authStyles.featureCardBackground}
              resizeMode="cover"
            />
            <View style={authStyles.featureCardContent}>
              <Text style={authStyles.featureTitle}>
                Compete in matches, leagues and tournaments
              </Text>
              <Text style={authStyles.featureDescription}>
                Create your own rules or join existing competitions
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    // Desktop view (unchanged)
    return (
      <View style={authStyles.featuresContainerFullPage}>
        {/* Feature card: Play as a team */}
        <View style={authStyles.featureCardFullPage}>
          <Image
            source={require("@/assets/images/placeholders/placeholder2.png")}
            style={authStyles.featureCardBackground}
            resizeMode="cover"
          />
          <View style={authStyles.featureCardContent}>
            <Text style={authStyles.featureTitle}>
              Play as a team and earn together
            </Text>
            <Text style={authStyles.featureDescription}>
              Manage your crew, splitting buy-ins and payouts
            </Text>
          </View>
        </View>

        {/* Feature card: Find matches and earn (MIDDLE CARD) */}
        <View
          style={[authStyles.featureCardFullPage, authStyles.featureCardMiddle]}
        >
          <Image
            source={require("@/assets/images/placeholders/placeholder1.png")}
            style={authStyles.featureCardBackground}
            resizeMode="cover"
          />
          <View style={authStyles.featureCardContent}>
            <Text style={authStyles.featureTitle}>
              Find matches and{" "}
              <Text style={{ fontWeight: "bold", color: "#02F199" }}>earn</Text>{" "}
            </Text>
            <Text style={authStyles.featureDescription}>
              Stake on every match, or compete for free to rank up
            </Text>
          </View>
        </View>

        {/* Feature card: Compete in matches */}
        <View style={authStyles.featureCardFullPage}>
          <Image
            source={require("@/assets/images/placeholders/placeholder3.png")}
            style={authStyles.featureCardBackground}
            resizeMode="cover"
          />
          <View style={authStyles.featureCardContent}>
            <Text style={authStyles.featureTitle}>
              Compete in matches, leagues and tournaments
            </Text>
            <Text style={authStyles.featureDescription}>
              Create your own rules or join existing competitions
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default FeatureCards;
