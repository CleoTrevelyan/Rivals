import React, { useState, useCallback, useMemo, useEffect } from "react";
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
import { router } from "expo-router";
import authStyles from "./styles/authStyles";
import PerlinNoiseBackground from "@/components/perlinHero";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthForm from "./components/AuthForm";
import FeatureCards from "./components/FeatureCards";
// import { useAuth } from "@/store/hooks/useAuth";
// import { AnyAction } from "redux";
import { socketConnect, verifyAuthToken, login } from "@/store/middleware/gameSocketMiddleware";
import { useAppDispatch, useAppSelector } from "@/store/store"; // Add this line
import { useGetFakeApiDataQuery } from "@/store/slices/test/testApiSlice";
import { Action, AnyAction, UnknownAction } from "@reduxjs/toolkit";

export default function Auth() {
  //const { data, isLoading } = useGetFakeApiDataQuery("");
  //console.log(data, "testData");
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated); // Add this line
  //   const { isAuthenticated, isLoading, error, login, register, resetError } =
  //     useAuth();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  // Calculate isMobileView once per render
  const isMobileView = windowWidth < 768;

  // Ensure we have a connection
  useEffect(() => {
    console.log("Dispatching socketConnect action"); // Add this line
    dispatch(socketConnect() as UnknownAction);
    const initializeAuth = async () => {
      const authToken = 'defaultToken';
      console.log("Dispatching verifyAuthToken action with token:", authToken); // Add this line
      dispatch(verifyAuthToken(String(authToken)) as UnknownAction);
    };
    initializeAuth();
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to home"); // Add this line
      router.replace("/(home)");
    }
  }, [isAuthenticated]);

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
      console.log("Dispatching login action with username and password"); // Add this line
      dispatch(login(username, password) as UnknownAction);
    },
    [dispatch]
  );

  // Signup handler
  //   const handleSignup = useCallback(
  //     (email: string, username: string, password: string) => {
  //       // Reset any previous errors
  //       resetError();

  //       // Call Redux register action
  //       register(username, email, password);
  //     },
  //     [register, resetError]
  //   );

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
              onLogin={handleLogin} // Update this line
              onSignup={() => {}}
              message=""
              isLoading={false}
              isMobileView={isMobileView}
              devModeEnabled={true}
              onDevModeNavigate={goDirectlyToHome}
            />
          </View>
          {/*
          <Text style={authStyles.subHeaderText}>
            {JSON.stringify(data, null, 2)}  Show formatted JSON
          </Text>
           */}
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
