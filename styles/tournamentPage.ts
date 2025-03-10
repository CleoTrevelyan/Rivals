import { StyleSheet } from "react-native";

export const stylesTournamentPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(26, 26, 46, 0.8)", // Dark translucent
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  logoAndSearch: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 80,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(237, 241, 247, 0.2)", // Translucent
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 20,
    flex: 1,
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  menuIcon: {
    marginLeft: 20,
  },
  mainContent: {
    flex: 1,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  leftPanel: {
    width: 300,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  rightPanel: {
    flex: 1,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  tournamentList: {
    flex: 1,
  },
  tournamentItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  selectedTournamentItem: {
    backgroundColor: "rgba(0, 224, 150, 0.2)", // Green tinted translucent
    borderLeftWidth: 4,
    borderLeftColor: "#00E096", // Green accent
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  tournamentMetaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tournamentMeta: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)", // Lighter text color
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeSmall: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#00E096", // Green accent
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusOpen: {
    backgroundColor: "rgba(0, 224, 150, 0.3)", // Green tinted
  },
  statusOngoing: {
    backgroundColor: "rgba(227, 242, 253, 0.3)", // Blue tinted
  },
  statusUpcoming: {
    backgroundColor: "rgba(255, 248, 225, 0.3)", // Yellow tinted
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  statusTextSmall: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  tournamentBreadcrumb: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)", // Lighter text color
    marginBottom: 8,
  },
  tournamentTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  tournamentTime: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)", // Lighter text color
  },
  tournamentActions: {
    alignItems: "flex-end",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  joinButton: {
    backgroundColor: "#00E096", // Green accent
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  playersRegistered: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  detailTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)", // Lighter border
    marginBottom: 20,
  },
  detailTabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeDetailTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#00E096", // Green accent
  },
  detailTabText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)", // Lighter text color
  },
  activeDetailTabText: {
    color: "#00E096", // Green accent
    fontWeight: "600",
  },
  leaderboardContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
    borderRadius: 10,
    overflow: "hidden",
  },
  leaderboardHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(26, 26, 46, 0.6)", // Dark translucent
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  leaderboardColumnHeader: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },
  usernameHeader: {
    flex: 2,
    paddingLeft: 60,
  },
  pointsHeader: {
    flex: 1,
    textAlign: "center",
  },
  gainedHeader: {
    flex: 1,
    textAlign: "right",
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)", // Darker border
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
  },
  rankContainer: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  playerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  rankText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },
  usernameText: {
    flex: 2,
    fontSize: 16,
    color: "#FFFFFF",
  },
  pointsText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  gainedText: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    color: "#FFFFFF",
  },
  gainedPositive: {
    color: "#00E096", // Green accent
  },
  gainedNeutral: {
    color: "rgba(255, 255, 255, 0.6)", // Lighter text color
  },
  mobileMessage: {
    padding: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
