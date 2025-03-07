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
import { RivalsServer } from "@/components/constants";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { authStyles } from "@/styles/authStyles";
import PerlinNoiseBackground from "@/components/perlinHero";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Login form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(RivalsServer);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "loginSuccess") {
        console.log("Received token: ", data.cookie);
        await AsyncStorage.setItem("authToken", data.authToken);
        setMessage("Login successful!");
        router.replace("/(home)");
      } else if (data.type === "loginFailed") {
        setMessage(data.message);
      } else if (data.type === "authTokenVerified") {
        router.replace("/(home)");
      } else if (data.type === "authTokenInvalid") {
        setMessage("Session expired. Please log in again.");
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const getAuthToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    // Basic validation
    if (!username || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    console.log("Demo login with:", { username });
    /*
    try {
      await AsyncStorage.setItem("userToken", "demo-token-12345");
      // Head to home screen
      router.replace("/(home)");
    } catch (error) {
      console.error("Error storing token:", error);
      setMessage("Error during login process");
    }
    */
    
    // Original backend connection code - commented out
    if (socket) {
      const message = {
        type: "login",
        username: username,
        password: password,
      };
      socket.send(JSON.stringify(message));
    }
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
            <View style={authStyles.logoContainer}>
              <Image
                source={require("@/assets/images/logo-light.svg")}
                style={authStyles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={authStyles.leftPanelContent}>
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
            <Text style={authStyles.authTitle}>SIGN IN</Text>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Email or Username"
                placeholderTextColor="#8F9BB3"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setMessage("");
                }}
                autoCapitalize="none"
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Password"
                placeholderTextColor="#8F9BB3"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setMessage("");
                }}
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

            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity style={authStyles.createAccountLink}>
                <Text style={authStyles.createAccountText}>Create Account</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={authStyles.submitButton}
              onPress={handleLogin}
            >
              <Text style={authStyles.submitButtonText}>Log In</Text>
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
