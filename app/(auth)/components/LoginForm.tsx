import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { authStyles } from "../styles/authStyles";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  message: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, message }) => {
  // Login form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // Basic validation
    if (!username || !password) {
      return;
    }

    onLogin(username, password);
  };

  return (
    <View style={authStyles.rightPanel}>
      <Text style={authStyles.authTitle}>SIGN IN</Text>

      <View style={authStyles.inputContainer}>
        <TextInput
          style={authStyles.input}
          placeholder="Email or Username"
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

      <Link href="/(auth)/signup" asChild>
        <TouchableOpacity style={authStyles.createAccountLink}>
          <Text style={authStyles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={authStyles.submitButton} onPress={handleSubmit}>
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
  );
};

export default LoginForm;
