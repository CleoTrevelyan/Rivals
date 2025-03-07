import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },

  // Left Panel
  leftPanel: {
    flex: 2,
    padding: 24,
    backgroundColor: "#101025",
    justifyContent: "flex-start",
    position: "relative",
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
  logo: {
    width: 60,
    height: 60,
  },

  titleContainer: {
    marginTop: 4,
    marginBottom: 20,
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
  },
  subHeaderText: {
    fontSize: 16,
    color: "#B0B0C0",
    marginBottom: 4,
    lineHeight: 20,
    textAlign: "center",
  },

  // Feature cards - compact version to avoid scrolling
  featuresContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 40,
    marginBottom: 15,
  },
  featureCard: {
    width: "24%",
    height: 240, // Reduced height
    borderRadius: 12, // Slightly smaller radius
    marginHorizontal: 8,
    overflow: "hidden",
    position: "relative",
  },
  mainFeatureCard: {
    width: "24%",
    height: 280, // Reduced height
    borderRadius: 12, // Slightly smaller radius
    marginHorizontal: 8,
    overflow: "hidden",
    position: "relative",
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
    padding: 12, // Smaller padding
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 14, // Smaller font
    fontWeight: "semibold",
    marginBottom: 4, // Reduced spacing
  },
  featureDescription: {
    color: "#E0E0E0",
    fontSize: 12, // Smaller font
    lineHeight: 16, // Tighter line height
  },

  // Right Panel
  rightPanel: {
    flex: 1,
    padding: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
    position: "relative",
  },
  input: {
    backgroundColor: "#F0F3F6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1A1A2E",
    width: "100%",
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
  createAccountText: {
    fontSize: 14,
    color: "#8F9BB3",
    fontWeight: "400",
  },
  submitButton: {
    backgroundColor: "#1A1A2E",
    borderRadius: 8,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 14,
    color: "#FF3D71",
    marginBottom: 16,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4E9F2",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#8F9BB3",
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  switchAuthContainer: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  switchAuthText: {
    color: "#8F9BB3",
    marginRight: 8,
  },
  switchAuthLink: {
    marginLeft: 4,
  },
  switchAuthLinkText: {
    color: "#8F9BB3",
    fontWeight: "400",
  },
});
