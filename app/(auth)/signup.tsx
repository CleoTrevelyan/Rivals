import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { RivalsServer } from "@/components/constants";
import { router } from "expo-router";
import { authStyles } from "./styles/authStyles";
import PerlinNoiseBackground from "@/app/(home)/components/perlinHero";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupForm from "./components/SignupForm";
import { useAuthSocket } from "./hooks/useAuthSocket";

export default function Signup() {
  const [message, setMessage] = useState("");
  const { socket, isConnected } = useAuthSocket({
    onMessage: handleSocketMessage,
  });

  function handleSocketMessage(data: any) {
    if (data.type === "registerSuccess") {
      console.log("Received token: ", data.authToken);
      saveAuthToken(data.authToken);
      setMessage("Signup successful!");
      router.replace("/(home)");
    } else if (data.type === "registerFailed") {
      setMessage(data.message);
    } else if (data.type === "authTokenVerified") {
      router.replace("/(home)");
    } else if (data.type === "authTokenInvalid") {
      setMessage("Session expired. Please log in again.");
    }
  }

  async function saveAuthToken(token: string) {
    try {
      await AsyncStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error saving auth token:", error);
    }
  }

  const handleSignup = (email: string, username: string, password: string) => {
    if (socket && isConnected) {
      const message = {
        type: "register",
        email: email,
        username: username,
        password: password,
      };
      socket.send(JSON.stringify(message));
      console.log("Signup data:", message);
    } else {
      setMessage("Not connected to server. Please try again.");
    }
  };

  // Quick bypass function to go directly to home
  const goDirectlyToHome = () => {
    router.replace("/(home)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={authStyles.container}
    >
      <ScrollView contentContainerStyle={authStyles.scrollContainer}>
        <View style={authStyles.contentContainer}>
          {/* Left Panel - Branding and marketing content */}
          <View style={authStyles.leftPanel}>
            {/* Add Perlin noise background */}
            <PerlinNoiseBackground />

            <View style={authStyles.leftPanelContent}>
              <View style={authStyles.logoContainer}>
                <Image
                  source={require("@/assets/images/logo-light.svg")}
                  style={authStyles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={authStyles.titleContainer}>
                <Text style={authStyles.headerText}>EXPERIENCE THE</Text>
                <Text style={authStyles.headerText}>FUTURE OF GAMING</Text>
              </View>
              <Text style={authStyles.subHeaderText}>
                Immerse yourself in Rivals,
              </Text>
              <Text style={authStyles.subHeaderText}>
                where you can stake and wager on your games.
              </Text>
              <Text style={authStyles.subHeaderText}>
                Explore diverse betting markets tailored to competitive
                gameplay.
              </Text>
              <View style={authStyles.featuresContainer}>
                {/* Feature card: Play as a team */}
                <View style={authStyles.featureCard}>
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
                {/* Feature card: Find matches and earn */}
                <View style={authStyles.mainFeatureCard}>
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
                <View style={authStyles.featureCard}>
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
            </View>
          </View>

          {/* Right Panel - Signup Form */}
          <SignupForm
            onSignup={handleSignup}
            message={message}
            devModeEnabled={true}
            onDevModeNavigate={goDirectlyToHome}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
