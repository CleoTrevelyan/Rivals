import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  // Legacy Create Game button styles
  createGameButton: {
    backgroundColor: "#00E096",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 12,
  },
  createGameText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },

  // New Play button styles
  playButton: {
    backgroundColor: "#00E096",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 12,
  },
  playButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },

  // Team button styles
  teamButton: {
    backgroundColor: "rgba(46, 58, 89, 0.6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 12,
  },
  teamButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
