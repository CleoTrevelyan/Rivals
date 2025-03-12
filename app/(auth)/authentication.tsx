// Import React hooks
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { RivalsServer } from "@/components/constants";
import { router } from "expo-router";
import { authStyles } from "./styles/authStyles";
import PerlinNoiseBackground from "@/components/perlinHero";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthForm from "./components/AuthForm";
import FeatureCards from "./components/FeatureCards";
import { useAuthSocket } from "./hooks/useAuthSocket";

export default function Auth() {
  // State
  const [message, setMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  // Calculate isMobileView once per render
  const isMobileView = windowWidth < 768;

  // Define socket message handler with useCallback to maintain reference stability
  const handleSocketMessage = useCallback(async (data: any) => {
    console.log("Received message:", data.type);

    if (data.type === "loginSuccess" || data.type === "registerSuccess") {
      console.log("Authentication successful");

      try {
        // Handle auth token
        if (data.authToken) {
          await AsyncStorage.setItem("authToken", data.authToken);
        }

        // Handle user data
        if (data.userID) {
          await AsyncStorage.setItem("playerID", data.userID);
        }

        if (data.username) {
          await AsyncStorage.setItem("username", data.username);
        }

        // Update UI message
        setMessage(
          data.type === "loginSuccess"
            ? "Login successful!"
            : "Signup successful!"
        );

        // Navigate to home
        router.replace("/(home)");
      } catch (error) {
        console.error("Error saving auth data:", error);
        setMessage("Error saving authentication data. Please try again.");
      }
    } else if (data.type === "loginFailed" || data.type === "registerFailed") {
      setMessage(data.message || "Authentication failed");
    } else if (data.type === "authTokenVerified") {
      router.replace("/(home)");
    } else if (data.type === "authTokenInvalid") {
      // Clear invalid token
      try {
        await AsyncStorage.removeItem("authToken");
      } catch (error) {
        console.error("Error removing invalid token:", error);
      }

      setMessage("Session expired. Please log in again.");
    }
  }, []); // Empty dependency array as we want this callback to be stable

  // Hook up to the auth socket
  const { isConnected, sendMessage } = useAuthSocket({
    onMessage: handleSocketMessage,
  });

  // Update dimensions when window size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  // Login handler
  const handleLogin = useCallback(
    (username: string, password: string) => {
      // Reset any previous messages
      setMessage("");

      // Basic validation
      if (!username || !password) {
        setMessage("Please fill in all fields");
        return;
      }

      if (isConnected) {
        sendMessage({
          type: "login",
          username: username,
          password: password,
        });
        console.log("Login request sent");
      } else {
        setMessage("Not connected to server. Please try again.");
      }
    },
    [isConnected, sendMessage]
  );

  // Signup handler
  const handleSignup = useCallback(
    (email: string, username: string, password: string) => {
      // Reset any previous messages
      setMessage("");

      // Basic validation
      if (!email || !username || !password) {
        setMessage("Please fill in all fields");
        return;
      }

      if (isConnected) {
        sendMessage({
          type: "register",
          email: email,
          username: username,
          password: password,
        });
        console.log("Signup request sent");
      } else {
        setMessage("Not connected to server. Please try again.");
      }
    },
    [isConnected, sendMessage]
  );

  // Dev mode bypass
  const goDirectlyToHome = useCallback(() => {
    router.replace("/(home)");
  }, []);

  // Prepare feature cards data (memoized to prevent unnecessary re-creation)
  const featureCards = useMemo(
    () => [
      {
        id: "team-card",
        title: "Play as a team and earn together",
        description: "Manage your crew, splitting buy-ins and payouts",
        image: require("@/assets/images/placeholders/placeholder2.png"),
      },
      {
        id: "matches-card",
        title: "Find matches and earn",
        description: "Stake on every match, or compete for free to rank up",
        image: require("@/assets/images/placeholders/placeholder1.png"),
        highlight: "earn",
        isMain: true,
      },
      {
        id: "compete-card",
        title: "Compete in matches, leagues and tournaments",
        description: "Create your own rules or join existing competitions",
        image: require("@/assets/images/placeholders/placeholder3.png"),
      },
    ],
    []
  );

  // Return the component UI
  return (
    <SafeAreaView style={authStyles.fullContainer}>
      {/* Perlin noise background */}
      <View style={authStyles.perlinBackgroundContainer}>
        <PerlinNoiseBackground />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={authStyles.fullScrollContainer}>
          {/* Logo */}
          <View style={authStyles.logoContainerCentered}>
            <Image
              source={require("@/assets/images/logo-light.svg")}
              style={authStyles.logoLarge}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <View style={authStyles.titleContainerFullPage}>
            <Text
              style={[
                authStyles.headerText,
                isMobileView && authStyles.headerTextMobile,
              ]}
            >
              EXPERIENCE THE
            </Text>
            <Text
              style={[
                authStyles.headerText,
                isMobileView && authStyles.headerTextMobile,
              ]}
            >
              FUTURE OF GAMING
            </Text>
          </View>

          {/* Subtitle */}
          <View style={authStyles.subtitleContainer}>
            <Text style={authStyles.subHeaderText}>
              Immerse yourself in Rivals, where you can stake and wager on your
              games.
            </Text>
            <Text style={authStyles.subHeaderText}>
              Explore diverse betting markets tailored to competitive gameplay.
            </Text>
          </View>

          {/* Feature Cards */}
          <FeatureCards isMobileView={isMobileView} cards={featureCards} />

          {/* Auth Form */}
          <View
            style={[
              authStyles.formCardContainer,
              isMobileView && authStyles.formCardContainerMobile,
            ]}
          >
            <AuthForm
              onLogin={handleLogin}
              onSignup={handleSignup}
              message={message}
              isMobileView={isMobileView}
              devModeEnabled={true}
              onDevModeNavigate={goDirectlyToHome}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
