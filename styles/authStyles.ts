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
    padding: 32,
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
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 1,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 18,
    color: "#B0B0C0",
    marginBottom: 6,
    lineHeight: 24,
    textAlign: "center",
  },
  featuresContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    gap: 20,
  },
  featureCard: {
    flex: 1,
    height: 220,
    borderRadius: 12,
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
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featureDescription: {
    color: "#E0E0E0",
    fontSize: 14,
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
