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
import { socketConnect } from "@/store/middleware/gameSocketMiddleware";
import { useAppDispatch } from "@/store/store";
import { useGetFakeApiDataQuery } from "@/store/slices/test/testApiSlice";

export default function Auth() {
  const { data, isLoading } = useGetFakeApiDataQuery("");
  const dispatch = useAppDispatch();
  console.log(data, "testData");
  //   const { isAuthenticated, isLoading, error, login, register, resetError } =
  //     useAuth();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  // Calculate isMobileView once per render
  const isMobileView = windowWidth < 768;

  // Ensure we have a connection
  useEffect(() => {
    dispatch(socketConnect() as AnyAction);
  }, [dispatch]);

  // Redirect if authenticated
  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       router.replace("/(home)");
  //     }
  //   }, [isAuthenticated]);
  useEffect(() => {
    if (false) {
      router.replace("/(home)");
    }
  }, [false]);

  // Update dimensions when window size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  // Login handler
  //   const handleLogin = useCallback(
  //     (username: string, password: string) => {
  //       // Reset any previous errors
  //       resetError();

  //       // Call Redux login action
  //       login(username, password);
  //     },
  //     [login, resetError]
  //   );

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
            {/* <AuthForm
              onLogin={handleLogin}
              onSignup={handleSignup}
              message={error || ""}
              isLoading={isLoading}
              isMobileView={isMobileView}
              devModeEnabled={true}
              onDevModeNavigate={goDirectlyToHome}
            /> */}

            <AuthForm
              onLogin={() => {}}
              onSignup={() => {}}
              message=""
              //   message={error || ""}
              //   isLoading={isLoading}
              isLoading={false}
              isMobileView={isMobileView}
              devModeEnabled={true}
              onDevModeNavigate={goDirectlyToHome}
            />
          </View>
          <Text style={authStyles.subHeaderText}>
            {JSON.stringify(data, null, 2)} {/* Show formatted JSON */}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
