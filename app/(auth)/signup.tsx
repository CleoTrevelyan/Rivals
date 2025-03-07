import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { RivalsServer } from "@/components/constants.js";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { authStyles } from "@/styles/authStyles";
import PerlinNoiseBackground from "@/components/perlinHero";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Optional: You can still set up WebSocket for other functionality
    const ws = new WebSocket(RivalsServer);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  // Quick bypass function to go directly to home
  const goDirectlyToHome = () => {
    router.replace("/(home)");
  };

  // Modified to bypass authentication and go directly to home
  const handleSignup = async () => {
    // Basic validation
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    if (username.includes("@")) {
      setMessage("Username cannot contain '@'");
      return;
    }

    try {
      // Store a dummy token to simulate being logged in
      await AsyncStorage.setItem("userToken", "dummy-dev-token");

      // Store any other needed values for development
      if (username) {
        await AsyncStorage.setItem("playerID", "dev-" + username);
        await AsyncStorage.setItem("username", username);
      }

      console.log("Development mode: Bypassing authentication");

      // Navigate to the home/tabs route
      router.replace("/(home)");
    } catch (error) {
      console.error("Error during development navigation:", error);
      setMessage("Error during signup process");
    }

    /* 
    // Original backend connection code - commented out
    if (socket) {
      const message = {
        type: "register",
        email: email,
        username: username,
        password: password,
        // playerID: playerID,
        // gameID: gameID,
      };
      socket.send(JSON.stringify(message));
      console.log("Signup data:", message);
    }
    */
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
                      Find matches and earn
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

          {/* Right Panel - Authentication form */}
          <View style={authStyles.rightPanel}>
            <Text style={authStyles.authTitle}>SIGN UP</Text>

            {/* Development shortcut */}
            <TouchableOpacity
              style={[
                authStyles.submitButton,
                { backgroundColor: "#4CAF50", marginBottom: 15 },
              ]}
              onPress={goDirectlyToHome}
            >
              <Text style={authStyles.submitButtonText}>
                DEV MODE: Go to Home
              </Text>
            </TouchableOpacity>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Email"
                placeholderTextColor="#8F9BB3"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Username"
                placeholderTextColor="#8F9BB3"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Password"
                placeholderTextColor="#8F9BB3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={authStyles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#8F9BB3"
                />
              </TouchableOpacity>
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#8F9BB3"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={authStyles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#8F9BB3"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={authStyles.submitButton}
              onPress={handleSignup}
            >
              <Text style={authStyles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {message && <Text style={authStyles.messageText}>{message}</Text>}

            <View style={authStyles.dividerContainer}>
              <View style={authStyles.divider} />
              <Text style={authStyles.dividerText}>or continue with</Text>
              <View style={authStyles.divider} />
            </View>

            <View style={authStyles.socialButtonsContainer}>
              <TouchableOpacity style={authStyles.socialButton}>
                <Image
                  source={require("@/assets/images/steam-icon.svg")}
                  style={authStyles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialButton}>
                <Image
                  source={require("@/assets/images/discord-icon.svg")}
                  style={authStyles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialButton}>
                <Image
                  source={require("@/assets/images/apple-icon.svg")}
                  style={authStyles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialButton}>
                <Image
                  source={require("@/assets/images/google-icon.svg")}
                  style={authStyles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={authStyles.switchAuthContainer}>
              <Text style={authStyles.switchAuthText}>
                Already have an account?
              </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={authStyles.switchAuthLink}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
