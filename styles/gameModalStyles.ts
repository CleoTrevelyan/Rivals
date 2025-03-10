import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const modalWidth =
  width > 768 ? Math.min(width * 0.8, 800) : Math.min(width * 0.95, 550);

export const gameModalStyles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
    marginBottom: 20,
    width: "100%",
  },
  gameTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 12,
  },
  gameSymbol: {
    fontSize: 24,
  },

  // Player styles
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "transparent",
    marginBottom: 8,
  },
  playerLevel: {
    color: "#AAAAAA",
    fontSize: 10,
    marginBottom: 4,
  },

  // Match info
  matchDate: {
    color: "#AAAAAA",
    fontSize: 12,
    marginTop: 8,
  },
  matchTime: {
    color: "#AAAAAA",
    fontSize: 12,
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
    width: "85%",
    maxWidth: 650,
    minHeight: 500,
    maxHeight: "85%",
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2E3A59",
  },
  modalContent: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
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
    paddingHorizontal: width > 768 ? 20 : 12,
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
    marginBottom: 20,
    width: "90%",
    maxWidth: 500,
    paddingHorizontal: 10,
  },
  playerContainer: {
    alignItems: "center",
    flex: 1,
    maxWidth: 110,
  },
  playerColumn: {
    alignItems: "center",
    flex: 1,
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2A3356",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  playerReady: {
    backgroundColor: "#00E096",
  },
  playerAvatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 2,
    marginTop: 3,
  },
  colorIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
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
    paddingHorizontal: 12,
  },
  vsText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
    fontSize: 12,
    textAlign: "center",
  },
  gameboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
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
    paddingVertical: 12,
    paddingHorizontal: width > 768 ? 30 : 24,
    borderRadius: width > 768 ? 24 : 20,
    marginTop: 12,
    minWidth: 140,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
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

  // Tic-Tac-Toe specific styles
  playerInfo: {
    alignItems: "center",
    position: "relative",
    flex: 1,
    maxWidth: 100,
  },
  playerTurnIndicator: {
    position: "absolute",
    top: -12,
    backgroundColor: "transparent",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    zIndex: 1,
  },
  activePlayerIndicator: {
    backgroundColor: "#3366FF",
  },
  playerTurnText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  playerAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2E2E5D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activePlayerAvatar: {
    borderColor: "#3366FF",
  },
  playerSymbolText: {
    color: "#8F9BB3",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },

  // Game actions
  gameActionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  gameOverActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  rematchButton: {
    backgroundColor: "#4AE9A0",
    paddingVertical: 8,
    minWidth: 120,
  },
  exitButton: {
    backgroundColor: "#8F9BB3",
    paddingVertical: 8,
    minWidth: 120,
  },
  forfeitButton: {
    backgroundColor: "#FF3D71",
    width: "40%",
    minWidth: 120,
    paddingVertical: 8,
  },

  // Rematch notification
  rematchNotification: {
    backgroundColor: "#1A1A2E",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  rematchText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
  },
  rematchButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  acceptButton: {
    backgroundColor: "#4AE9A0",
    flex: 1,
    marginRight: 5,
    paddingVertical: 6,
  },
  declineButton: {
    backgroundColor: "#FF3D71",
    flex: 1,
    marginLeft: 5,
    paddingVertical: 6,
  },

  // Error messages
  errorBanner: {
    backgroundColor: "#FF3D71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "70%",
    alignSelf: "center",
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },

  // Game board and cells
  lastMoveCell: {
    backgroundColor: "rgba(51, 102, 255, 0.2)",
  },

  // Winner banner
  winnerBanner: {
    padding: 8,
    borderRadius: 5,
    marginTop: 15,
    width: "70%",
  },
  winBanner: {
    backgroundColor: "#4AE9A0",
  },
  lossBanner: {
    backgroundColor: "#FF3D71",
  },
  drawBanner: {
    backgroundColor: "#3366FF",
  },
  winnerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Container and game status
  container: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  timerText: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  symbolContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolLabel: {
    color: "#8F9BB3",
    marginRight: 5,
    fontSize: 12,
  },
  playerSymbol: {
    fontSize: 18,
    fontWeight: "bold",
  },

  // Game board
  board: {
    width: 260,
    height: 260,
    backgroundColor: "#1A1A2E",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E2E5D",
  },
  symbol: {
    fontSize: 42,
    fontWeight: "bold",
  },
  symbolX: {
    color: "#3366FF",
  },
  symbolO: {
    color: "#FF3D71",
  },
});

export default gameModalStyles;
