import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { authStyles } from "../styles/authStyles";

interface SignupFormProps {
  onSignup: (email: string, username: string, password: string) => void;
  message: string;
  devModeEnabled?: boolean;
  onDevModeNavigate?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSignup,
  message,
  devModeEnabled = false,
  onDevModeNavigate,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = () => {
    // Reset validation message
    setValidationMessage("");

    // Validation
    if (password !== confirmPassword) {
      setValidationMessage("Passwords don't match");
      return;
    }

    if (username.includes("@")) {
      setValidationMessage("Username cannot contain '@'");
      return;
    }

    if (!email || !username || !password) {
      setValidationMessage("Please fill in all fields");
      return;
    }

    // If all validation passes
    onSignup(email, username, password);
  };

  return (
    <View style={authStyles.rightPanel}>
      <Text style={authStyles.authTitle}>SIGN UP</Text>

      {/* Development shortcut */}
      {devModeEnabled && (
        <TouchableOpacity
          style={[
            authStyles.submitButton,
            { backgroundColor: "#02F199", marginBottom: 15 },
          ]}
          onPress={onDevModeNavigate}
        >
          <Text style={authStyles.submitButtonText}>DEV MODE: Go to Home</Text>
        </TouchableOpacity>
      )}

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

      <TouchableOpacity style={authStyles.submitButton} onPress={handleSubmit}>
        <Text style={authStyles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {(validationMessage || message) && (
        <Text style={authStyles.messageText}>
          {validationMessage || message}
        </Text>
      )}

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
        <Text style={authStyles.switchAuthText}>Already have an account?</Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text style={authStyles.switchAuthLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SignupForm;
