import React, { useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
} from "react-native";

type LoaderType = "spinner" | "pulse" | "dots";
type LoaderTheme = "light" | "dark" | "primary";

interface EnhancedLoaderProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  isVisible?: boolean;
  type?: LoaderType;
  theme?: LoaderTheme;
  pulseSize?: number;
  dotsCount?: number;
}

const EnhancedLoader: React.FC<EnhancedLoaderProps> = ({
  size = "large",
  color,
  text,
  containerStyle,
  textStyle,
  isVisible = true,
  type = "spinner",
  theme = "primary",
  pulseSize = 40,
  dotsCount = 3,
}) => {
  // Animation value for pulse and dots loaders
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotsAnims = useRef(
    Array(dotsCount)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  // Set color based on theme if not explicitly defined
  const getThemeColor = () => {
    if (color) return color;

    switch (theme) {
      case "light":
        return "#FFFFFF";
      case "dark":
        return "#333333";
      case "primary":
      default:
        return "#00E096"; // Your primary app color
    }
  };

  const themeColor = getThemeColor();

  // Animation for pulse loader
  useEffect(() => {
    if (type === "pulse" && isVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [type, isVisible, pulseAnim]);

  // Animation for dots loader
  useEffect(() => {
    if (type === "dots" && isVisible) {
      // Create sequential animations for each dot
      dotsAnims.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.timing(anim, {
              toValue: 1,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.delay((dotsCount - index - 1) * 200),
          ])
        ).start();
      });
    }

    return () => {
      dotsAnims.forEach((anim) => anim.stopAnimation());
    };
  }, [type, isVisible, dotsAnims, dotsCount]);

  if (!isVisible) {
    return null;
  }

  // Render spinner loader (default)
  const renderSpinner = () => (
    <ActivityIndicator size={size} color={themeColor} />
  );

  // Render pulse loader
  const renderPulse = () => (
    <Animated.View
      style={[
        styles.pulseContainer,
        {
          width: pulseSize,
          height: pulseSize,
          borderRadius: pulseSize / 2,
          backgroundColor: themeColor,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    />
  );

  // Render dots loader
  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {dotsAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: themeColor,
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );

  // Render the appropriate loader based on type
  const renderLoader = () => {
    switch (type) {
      case "pulse":
        return renderPulse();
      case "dots":
        return renderDots();
      case "spinner":
      default:
        return renderSpinner();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderLoader()}
      {text && (
        <Text style={[styles.text, { color: themeColor }, textStyle]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  pulseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default EnhancedLoader;
