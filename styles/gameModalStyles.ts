import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const modalWidth =
  width > 768 ? Math.min(width * 0.8, 800) : Math.min(width * 0.95, 550);

export const modalStyles = StyleSheet.create({
  // Friend item styling
  friendDetails: {
    flex: 1,
    marginLeft: 10,
  },
  friendAvatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2A3356",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  friendAvatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  xpText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  // Navigation styles
  navLogo: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
  navBrand: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  navSeparator: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  navTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  // Game header
  gameHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    width: "100%",
  },
  gameTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 12,
  },
  gameSymbol: {
    fontSize: 24,
  },

  // Player styles
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "transparent",
    marginBottom: 12,
  },
  playerLevel: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 8,
  },

  // Match info
  matchDate: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 8,
  },
  matchTime: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 4,
  },
  optionsGrid: {
    width: "100%",
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  optionLabel: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 16 : 14,
    fontWeight: "500",
    width: "30%",
  },
  optionButtonContainer: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },
  optionButton: {
    backgroundColor: "#2A3356",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: width > 768 ? 100 : 80,
    alignItems: "center",
  },
  selectedOptionButton: {
    backgroundColor: "#00E096",
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 14 : 12,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 14 : 12,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: modalWidth,
    minHeight: Math.min(height * 0.7, 600),
    backgroundColor: "#1A2341",
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2E3A59",
  },
  modalContent: {
    padding: width > 768 ? 32 : 24,
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: width > 768 ? 32 : 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: width > 768 ? 28 : 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 8,
  },
  breadcrumbLink: {
    color: "#8F9BB3",
    fontSize: width > 768 ? 16 : 14,
    fontWeight: "500",
  },
  breadcrumbSeparator: {
    color: "#8F9BB3",
    fontSize: width > 768 ? 16 : 14,
    marginHorizontal: 8,
  },
  breadcrumbCurrent: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 16 : 14,
    fontWeight: "500",
  },
  stepContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: width > 768 ? 24 : 16,
  },
  stepTitle: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 32 : 26,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  gamesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    width: "100%",
    marginBottom: 36,
  },
  gameCard: {
    width: width > 768 ? 160 : 140,
    height: width > 768 ? 160 : 140,
    borderRadius: 12,
    backgroundColor: "#2A3356",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  selectedGameCard: {
    borderWidth: 3,
    borderColor: "#00E096",
  },
  gameIcon: {
    fontSize: width > 768 ? 56 : 48,
    marginBottom: 12,
  },
  gameName: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
    fontWeight: "500",
    textAlign: "center",
  },
  stakeContainer: {
    width: "100%",
    marginBottom: 32,
  },
  stakeInputContainer: {
    marginBottom: 24,
  },
  stakeLabel: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
    marginBottom: 12,
    fontWeight: "500",
  },
  stakeInput: {
    backgroundColor: "#2A3356",
    borderRadius: 8,
    padding: 16,
    color: "#FFFFFF",
    width: "100%",
    fontSize: width > 768 ? 18 : 16,
  },
  counterOfferContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  counterOfferText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
    marginLeft: 12,
  },
  counterOfferDescription: {
    color: "#8F9BB3",
    fontSize: width > 768 ? 16 : 14,
    lineHeight: width > 768 ? 22 : 20,
    marginTop: 12,
  },
  friendsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  sectionLabel: {
    color: "#8F9BB3",
    fontSize: width > 768 ? 16 : 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3356",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendAvatar: {
    width: width > 768 ? 56 : 48,
    height: width > 768 ? 56 : 48,
    borderRadius: width > 768 ? 28 : 24,
    marginRight: 16,
  },
  friendName: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
    fontWeight: "500",
  },
  onlineIndicator: {
    width: width > 768 ? 12 : 10,
    height: width > 768 ? 12 : 10,
    borderRadius: width > 768 ? 6 : 5,
    backgroundColor: "#00E096",
    marginLeft: 8,
  },
  inviteButton: {
    width: width > 768 ? 40 : 36,
    height: width > 768 ? 40 : 36,
    borderRadius: width > 768 ? 20 : 18,
    backgroundColor: "#00E096",
    justifyContent: "center",
    alignItems: "center",
  },
  joinOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
    width: "100%",
  },
  joinOption: {
    width: "48%",
    backgroundColor: "#2A3356",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  joinOptionLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width > 768 ? 18 : 16,
  },
  searchingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    minHeight: 250,
  },
  searchingText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 22 : 18,
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: "#FF3D71",
    paddingVertical: width > 768 ? 12 : 10,
    paddingHorizontal: width > 768 ? 24 : 20,
    borderRadius: width > 768 ? 20 : 16,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width > 768 ? 18 : 16,
  },
  playersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    width: "100%",
  },
  playerContainer: {
    alignItems: "center",
    flex: 1,
  },
  playerColumn: {
    alignItems: "center",
    flex: 1,
  },
  playerAvatar: {
    width: width > 768 ? 100 : 80,
    height: width > 768 ? 100 : 80,
    borderRadius: width > 768 ? 50 : 40,
    backgroundColor: "#2A3356",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  playerReady: {
    backgroundColor: "#00E096",
  },
  playerAvatarText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 40 : 32,
    fontWeight: "bold",
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
    marginBottom: 8,
  },
  colorIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  colorDot: {
    width: width > 768 ? 14 : 12,
    height: width > 768 ? 14 : 12,
    borderRadius: width > 768 ? 7 : 6,
    marginHorizontal: 3,
  },
  readyIndicator: {
    flexDirection: "row",
  },
  readyDot: {
    width: width > 768 ? 12 : 10,
    height: width > 768 ? 12 : 10,
    borderRadius: width > 768 ? 6 : 5,
    backgroundColor: "#00E096",
    marginHorizontal: 3,
  },
  vsContainer: {
    paddingHorizontal: width > 768 ? 24 : 16,
  },
  vsText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 32 : 24,
    fontWeight: "bold",
  },
  waitingForOpponent: {
    alignItems: "center",
    marginTop: 16,
  },
  waitingText: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 18 : 16,
  },
  notReadyText: {
    color: "#00E096",
    fontSize: width > 768 ? 18 : 16,
    textAlign: "center",
  },
  gameboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  gameboard: {
    width: width > 768 ? 320 : 280,
    height: width > 768 ? 320 : 280,
    backgroundColor: "#2A3356",
    borderRadius: 8,
    overflow: "hidden",
  },
  gameRow: {
    flex: 1,
    flexDirection: "row",
  },
  gameCell: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#1A2341",
    alignItems: "center",
    justifyContent: "center",
  },
  cellX: {
    color: "#3366FF",
    fontSize: width > 768 ? 60 : 48,
    fontWeight: "bold",
  },
  cellO: {
    color: "#FF3D71",
    fontSize: width > 768 ? 60 : 48,
    fontWeight: "bold",
  },
  scoreboardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  resultTitle: {
    color: "#FFFFFF",
    fontSize: width > 768 ? 24 : 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoreContainer: {
    marginBottom: 12,
  },
  scoreText: {
    fontSize: width > 768 ? 24 : 20,
    fontWeight: "bold",
  },
  playerScore: {
    color: "#00E096",
    fontSize: width > 768 ? 32 : 28,
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#00E096",
    paddingVertical: width > 768 ? 18 : 16,
    paddingHorizontal: width > 768 ? 40 : 32,
    borderRadius: width > 768 ? 32 : 28,
    marginTop: 16,
    minWidth: width > 768 ? 240 : 200,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width > 768 ? 20 : 18,
  },
  primaryButton: {
    backgroundColor: "#00E096",
    paddingVertical: width > 768 ? 18 : 16,
    paddingHorizontal: width > 768 ? 40 : 32,
    borderRadius: width > 768 ? 32 : 28,
    marginTop: 16,
    minWidth: width > 768 ? 240 : 200,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width > 768 ? 20 : 18,
  },
});

export const gameModalStyles = modalStyles;
