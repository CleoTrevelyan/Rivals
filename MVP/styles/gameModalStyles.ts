import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const modalWidth = Math.min(width * 0.9, 400);

export const gameModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: modalWidth,
    backgroundColor: "#1A2341",
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  // Join stage styles
  joinOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    width: "100%",
  },
  joinOption: {
    width: "48%",
    backgroundColor: "#2A3356",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  joinOptionLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#00E096",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Searching stage styles
  searchingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  searchingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#FF3D71",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // Ready stage styles
  playersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    width: "100%",
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
    marginBottom: 10,
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
    fontSize: 14,
    marginBottom: 5,
  },
  readyIndicator: {
    flexDirection: "row",
  },
  readyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00E096",
    marginHorizontal: 2,
  },
  vsContainer: {
    paddingHorizontal: 10,
  },
  vsText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  waitingForOpponent: {
    alignItems: "center",
    marginTop: 10,
  },
  waitingText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  // Game stage styles
  gameboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  gameboard: {
    width: 240,
    height: 240,
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
    fontSize: 40,
    fontWeight: "bold",
  },
  cellO: {
    color: "#FF3D71",
    fontSize: 40,
    fontWeight: "bold",
  },
  // Results stage styles
  scoreboardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  resultTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  playerScore: {
    color: "#00E096",
    fontSize: 24,
    fontWeight: "bold",
  },
});
