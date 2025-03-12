import React, { useEffect, useState } from "react";
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
import { useAuthSocket } from "./hooks/useAuthSocket";

export default function Auth() {
  const [message, setMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const { socket, isConnected } = useAuthSocket({
    onMessage: handleSocketMessage,
  });

  // Update dimensions when window size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  // Determine if we're in mobile view
  const isMobileView = windowWidth < 768;

  async function handleSocketMessage(data: any) {
    if (data.type === "loginSuccess" || data.type === "registerSuccess") {
      console.log("Received token: ", data.authToken);
      await saveAuthToken(data.authToken);

      if (data.userID) {
        await AsyncStorage.setItem("playerID", data.userID);
      }

      if (data.username) {
        await AsyncStorage.setItem("username", data.username);
      }

      setMessage(
        data.type === "loginSuccess"
          ? "Login successful!"
          : "Signup successful!"
      );
      router.replace("/(home)");
    } else if (data.type === "loginFailed" || data.type === "registerFailed") {
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

  const handleLogin = (username: string, password: string) => {
    // Basic validation
    if (!username || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    if (socket && isConnected) {
      const message = {
        type: "login",
        username: username,
        password: password,
      };
      socket.send(JSON.stringify(message));
    } else {
      setMessage("Not connected to server. Please try again.");
    }
  };

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
    <SafeAreaView style={authStyles.fullContainer}>
      {/* Perlin noise background covering the entire page */}
      <View style={authStyles.perlinBackgroundContainer}>
        <PerlinNoiseBackground />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={authStyles.fullScrollContainer}>
          {/* Logo at the top */}
          <View style={authStyles.logoContainerCentered}>
            <Image
              source={require("@/assets/images/logo-light.svg")}
              style={authStyles.logoLarge}
              resizeMode="contain"
            />
          </View>

          {/* Main title */}
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

          {/* Subtitle text */}
          <View style={authStyles.subtitleContainer}>
            <Text style={authStyles.subHeaderText}>
              Immerse yourself in Rivals, where you can stake and wager on your
              games.
            </Text>
            <Text style={authStyles.subHeaderText}>
              Explore diverse betting markets tailored to competitive gameplay.
            </Text>
          </View>

          {/* Feature cards in horizontal row (stack on mobile) */}
          <View
            style={[
              authStyles.featuresContainerFullPage,
              isMobileView && authStyles.featuresContainerMobile,
            ]}
          >
            {/* Feature card: Play as a team */}
            <View
              style={[
                authStyles.featureCardFullPage,
                isMobileView && authStyles.featureCardMobile,
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

            {/* Feature card: Find matches and earn */}
            <View
              style={[
                authStyles.featureCardFullPage,
                isMobileView && authStyles.featureCardMobile,
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
                authStyles.featureCardFullPage,
                isMobileView && authStyles.featureCardMobile,
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
          </View>

          {/* Auth Form Card */}
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
