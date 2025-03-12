import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ticTacToeStyles = StyleSheet.create({
  inactiveBanner: {
    backgroundColor: 'rgba(46, 58, 89, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  inactiveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Game board container
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
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
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  symbolContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolLabel: {
    color: "#8F9BB3",
    marginRight: 5,
  },
  playerSymbol: {
    fontSize: 22,
    fontWeight: "bold",
  },

  // Game board
  board: {
    width: 300,
    height: 300,
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
  lastMoveCell: {
    backgroundColor: "rgba(51, 102, 255, 0.2)", // Highlight the last move
  },
  symbol: {
    fontSize: 50,
    fontWeight: "bold",
  },
  symbolX: {
    color: "#3366FF",
  },
  symbolO: {
    color: "#FF3D71",
  },

  // Winner banner
  winnerBanner: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Player information in game modal
  gameboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  playerInfo: {
    alignItems: "center",
    position: "relative",
  },
  playerTurnIndicator: {
    position: "absolute",
    top: -20,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activePlayerIndicator: {
    backgroundColor: "#3366FF",
  },
  playerTurnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  playerAvatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2E2E5D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activePlayerAvatar: {
    borderColor: "#3366FF",
  },
  playerAvatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },
  playerSymbolText: {
    color: "#8F9BB3",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },

  // Game actions
  gameActionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  gameOverActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  rematchButton: {
    backgroundColor: "#4AE9A0",
  },
  exitButton: {
    backgroundColor: "#8F9BB3",
  },
  forfeitButton: {
    backgroundColor: "#FF3D71",
    width: "50%",
  },

  // Rematch notification
  rematchNotification: {
    backgroundColor: "#1A1A2E",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  rematchText: {
    color: "#FFFFFF",
    fontSize: 16,
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
  },
  declineButton: {
    backgroundColor: "#FF3D71",
    flex: 1,
    marginLeft: 5,
  },

  // Error messages
  errorBanner: {
    backgroundColor: "#FF3D71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ticTacToeStyles;
