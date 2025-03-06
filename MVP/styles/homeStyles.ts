import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F7",
  },
  headerLogo: {
    height: 40,
    width: 100,
    marginRight: 12,
  },
  logoContainer: {
    flexDirection: "row",
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3366FF",
  },
  logoTextAlt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00E096",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF1F7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: "#8F9BB3",
    marginLeft: 8,
  },
  balanceButton: {
    backgroundColor: "#2E3A59",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  balanceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  menuButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#222B45",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3D71",
    marginRight: 4,
  },
  liveText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF3D71",
  },
  tabsScrollView: {
    flexGrow: 0,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#3366FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  activeTabText: {
    color: "#FFFFFF",
  },

  // Main content with background wrapper
  mainContentWrapper: {
    flex: 1,
    position: "relative",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, 
    opacity: 0.8, 
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    position: "relative",
    zIndex: 1,
  },

  // Section styling (common for all sections)
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222B45",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3366FF",
  },

  // Live matches horizontal section at the top
  liveMatchesSection: {
    marginBottom: 24,
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  horizontalScrollView: {
    flexGrow: 0,
  },
  liveMatchCard: {
    width: 280,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EDF1F7",
    elevation: 1,
  },
  liveMatchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  matchTeamsContainer: {
    marginBottom: 8,
  },
  teamRowHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6FA",
  },
  liveIndicatorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF3D71",
  },

  // Featured events section
  featuredScrollView: {
    marginBottom: 8,
  },
  eventCard: {
    width: 280,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  eventCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222B45",
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: "#8F9BB3",
    marginBottom: 16,
    flex: 1,
  },
  stakeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3366FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  stakeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3366FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222B45",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#8F9BB3",
  },

  // Games section
  gamesContainer: {
    marginBottom: 24,
  },
  gamesScrollView: {
    flexGrow: 0,
  },
  gameButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  functionalGame: {
    borderWidth: 2,
    borderColor: "#00E096",
  },
  gameButtonText: {
    fontSize: 12,
    color: "#8F9BB3",
    marginTop: 8,
    textAlign: "center",
  },

  // Competitions section
  competitionsContainer: {
    marginTop: 8,
  },
  competitionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F6FA",
  },
  competitionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  competitionIcon: {
    marginRight: 12,
  },
  competitionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222B45",
  },
  competitionCountBadge: {
    backgroundColor: "#EDF1F7",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  competitionCount: {
    fontSize: 12,
    color: "#3366FF",
    fontWeight: "bold",
  },

  // Filter options
  filterOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
    borderRadius: 16,
  },
  filterOptionActive: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: "#EDF1F7",
  },
  filterOptionText: {
    fontSize: 12,
    color: "#8F9BB3",
  },
  filterOptionTextActive: {
    fontSize: 12,
    color: "#3366FF",
    fontWeight: "600",
  },

  // All matches grid
  liveMatchesContainer: {
    flex: 1,
    marginBottom: 24,
  },
  matchesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  matchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    minWidth: 300,
    margin: "1%",
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  gameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameIcon: {
    marginRight: 8,
  },
  matchType: {
    fontSize: 14,
    color: "#8F9BB3",
  },
  liveBadge: {
    backgroundColor: "rgba(255, 61, 113, 0.1)",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  startTimeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8F9BB3",
  },
  teamsContainer: {
    marginBottom: 12,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222B45",
    flex: 1,
  },
  teamScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3366FF",
    marginRight: 12,
  },
  noughtsContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EDF1F7",
    justifyContent: "center",
    alignItems: "center",
  },
  noughtsSymbol: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222B45",
  },
  matchFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#EDF1F7",
  },
  viewersCount: {
    fontSize: 12,
    color: "#8F9BB3",
  },
  showMoreButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,

    elevation: 1,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3366FF",
  },
});
