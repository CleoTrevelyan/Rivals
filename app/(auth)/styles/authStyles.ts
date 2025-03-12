import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  // Full page container styles
  fullContainer: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
  perlinBackgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  keyboardContainer: {
    flex: 1,
    zIndex: 1,
  },
  fullScrollContainer: {
    flexGrow: 1,
    paddingVertical: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // Logo and header styles for full page
  logoContainerCentered: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoLarge: {
    width: 80,
    height: 80,
  },
  titleContainerFullPage: {
    alignItems: "center",
    marginBottom: 16,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 32,
  },

  // Feature cards for full page layout - with taller middle card
  featuresContainerFullPage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end", // This will align cards at the bottom
    width: "100%",
    marginBottom: 40,
    // Removed gap property
  },
  featureCardFullPage: {
    flex: 1,
    height: 240,
    maxWidth: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 8, // Added instead of gap
    // Shadow effect for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  // New style for the middle feature card
  featureCardMiddle: {
    height: 280, // Taller than the other cards
    marginTop: -10, // To make the card start higher
  },
  featureCardMiddleMobile: {
    height: 280,
    marginVertical: 16,
  },

  // Form container styles for full page - GLASSY STYLE
  formCardContainer: {
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
    marginTop: 20,
  },
  formCardContainerMobile: {
    maxWidth: "100%",
  },

  // Legacy styles that are still used
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollContainerMobile: {
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
  contentContainerMobile: {
    flexDirection: "column",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainerMobile: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  leftPanel: {
    flex: 2,
    padding: 24,
    backgroundColor: "#101025",
    justifyContent: "flex-start",
    position: "relative",
  },
  leftPanelMobile: {
    flex: 0,
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  leftPanelContent: {
    position: "relative",
    zIndex: 1,
    width: "100%",
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "flex-start",
  },
  logoContainerMobile: {
    marginBottom: 24,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    marginTop: 4,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
    letterSpacing: 1,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  headerTextMobile: {
    fontSize: 32,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
    lineHeight: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuresContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 40,
    marginBottom: 15,
  },
  featuresContainerMobile: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  featureCard: {
    width: "24%",
    height: 240,
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  featureCardMobile: {
    width: "100%",
    height: 180,
    marginVertical: 8,
    marginHorizontal: 0,
    maxWidth: 400,
  },
  mainFeatureCard: {
    width: "24%",
    height: 280,
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: "hidden",
    position: "relative",
  },
  mainFeatureCardMobile: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    marginHorizontal: 0,
    maxWidth: 400,
  },
  featureCardBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  featureCardContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featureDescription: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Form styles - ENHANCED GLASS MORPHISM (REACT NATIVE COMPATIBLE)
  rightPanel: {
    padding: 32,
    backgroundColor: "rgba(80, 80, 100, 0.7)", // Darker, more sleek background
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  rightPanelMobile: {
    width: "100%",
    maxWidth: "100%",
    padding: 24,
    borderRadius: 12,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 32,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  authTitleMobile: {
    fontSize: 24,
    marginBottom: 24,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
    position: "relative",
  },
  inputContainerMobile: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "rgba(230, 235, 240, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  createAccountLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  createAccountLinkMobile: {
    marginBottom: 16,
  },
  createAccountText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  submitButton: {
    backgroundColor: "#02F199", // Bright teal that matches the dev mode button
    borderRadius: 8,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  submitButtonMobile: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  submitButtonText: {
    color: "#191930", // Dark color to contrast with the bright button
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 14,
    color: "#FF6B9A", // Lighter pink for better visibility
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  messageTextMobile: {
    fontSize: 13,
    marginBottom: 12,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  dividerContainerMobile: {
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    // Removed gap property
  },
  socialButtonsContainerMobile: {
    // Removed gap property
  },
  socialButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 25,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  switchAuthContainer: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  switchAuthContainerMobile: {
    marginTop: 20,
  },
  switchAuthText: {
    color: "#FFFFFF",
    marginRight: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  switchAuthLink: {
    color: "#02F199", // Match the button color
    fontWeight: "bold",
    marginLeft: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  switchAuthLinkText: {
    color: "#FFFFFF",
    fontWeight: "400",
  },
});
