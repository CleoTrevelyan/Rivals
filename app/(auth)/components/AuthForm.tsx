// app/(auth)/components/AuthForm.tsx

import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import authStyles from "../styles/authStyles";

interface AuthFormProps {
  onLogin: (username: string, password: string) => void;
  onSignup: (email: string, username: string, password: string) => void;
  message: string;
  isLoading?: boolean;
  isMobileView?: boolean;
  devModeEnabled?: boolean;
  onDevModeNavigate?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onLogin,
  onSignup,
  message,
  isLoading = false,
  isMobileView = false,
  devModeEnabled = false,
  onDevModeNavigate,
}) => {
  // Form states
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setValidationMessage("");
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  const handleSubmit = () => {
    // Don't submit if already loading
    if (isLoading) return;

    // Reset validation message
    setValidationMessage("");

    if (isLoginMode) {
      // Login validation
      if (!username || !password) {
        setValidationMessage("Please fill in all fields");
        return;
      }
      onLogin(username, password);
    } else {
      // Signup validation
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

      onSignup(email, username, password);
    }
  };

  // Style helper functions
  const getContainerStyle = () => {
    if (isMobileView) {
      return [authStyles.rightPanel, authStyles.rightPanelMobile];
    }
    return authStyles.rightPanel;
  };

  const getTitleStyle = () => {
    if (isMobileView) {
      return [authStyles.authTitle, authStyles.authTitleMobile];
    }
    return authStyles.authTitle;
  };

  const getInputContainerStyle = () => {
    if (isMobileView) {
      return [authStyles.inputContainer, authStyles.inputContainerMobile];
    }
    return authStyles.inputContainer;
  };

  const getSubmitButtonStyle = (isDevMode = false) => {
    const baseStyles = isMobileView
      ? [authStyles.submitButton, authStyles.submitButtonMobile]
      : [authStyles.submitButton];

    if (isDevMode) {
      return [...baseStyles, { backgroundColor: "#02F199", marginBottom: 15 }];
    }
    return baseStyles;
  };

  const getMessageTextStyle = () => {
    if (isMobileView) {
      return [authStyles.messageText, authStyles.messageTextMobile];
    }
    return authStyles.messageText;
  };

  const getDividerContainerStyle = () => {
    if (isMobileView) {
      return [authStyles.dividerContainer, authStyles.dividerContainerMobile];
    }
    return authStyles.dividerContainer;
  };

  const getSocialButtonsContainerStyle = () => {
    return [
      authStyles.socialButtonsContainer,
      { marginHorizontal: isMobileView ? -6 : -8 },
    ];
  };

  const getSwitchAuthContainerStyle = () => {
    if (isMobileView) {
      return [
        authStyles.switchAuthContainer,
        authStyles.switchAuthContainerMobile,
      ];
    }
    return authStyles.switchAuthContainer;
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTitleStyle()}>{isLoginMode ? "SIGN IN" : "SIGN UP"}</Text>

      {/* Development shortcut */}
      {devModeEnabled && (
        <TouchableOpacity
          style={getSubmitButtonStyle(true)}
          onPress={onDevModeNavigate}
        >
          <Text style={authStyles.submitButtonText}>DEV MODE: Go to Home</Text>
        </TouchableOpacity>
      )}

      {/* Email field - only shown in signup mode */}
      {!isLoginMode && (
        <View style={getInputContainerStyle()}>
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
      )}

      {/* Username field */}
      <View style={getInputContainerStyle()}>
        <TextInput
          style={authStyles.input}
          placeholder={isLoginMode ? "Email or Username" : "Username"}
          placeholderTextColor="#8F9BB3"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      {/* Password field */}
      <View style={getInputContainerStyle()}>
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
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password field - only shown in signup mode */}
      {!isLoginMode && (
        <View style={getInputContainerStyle()}>
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
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={getSubmitButtonStyle(false)}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={authStyles.submitButtonText}>
            {isLoginMode ? "Log In" : "Sign Up"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Error messages */}
      {validationMessage || message ? (
        <Text style={getMessageTextStyle()}>
          {validationMessage || message}
        </Text>
      ) : null}

      {/* Divider */}
      <View style={getDividerContainerStyle()}>
        <View style={authStyles.divider} />
        <Text style={authStyles.dividerText}>or continue with</Text>
        <View style={authStyles.divider} />
      </View>

      {/* Social Login Buttons */}
      <View style={getSocialButtonsContainerStyle()}>
        <View style={{ marginHorizontal: 8 }}>
          <TouchableOpacity style={authStyles.socialButton}>
            <Image
              source={require("@/assets/images/steam-icon.svg")}
              style={authStyles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <TouchableOpacity style={authStyles.socialButton}>
            <Image
              source={require("@/assets/images/discord-icon.svg")}
              style={authStyles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <TouchableOpacity style={authStyles.socialButton}>
            <Image
              source={require("@/assets/images/apple-icon.svg")}
              style={authStyles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <TouchableOpacity style={authStyles.socialButton}>
            <Image
              source={require("@/assets/images/google-icon.svg")}
              style={authStyles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toggle between Login/Signup */}
      <View style={getSwitchAuthContainerStyle()}>
        <Text style={authStyles.switchAuthText}>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <TouchableOpacity onPress={toggleMode}>
          <Text style={authStyles.switchAuthLink}>
            {isLoginMode ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthForm;
