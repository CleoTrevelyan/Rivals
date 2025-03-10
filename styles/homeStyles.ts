import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: "transparent", // Changed from #F5F6FA
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(26, 26, 46, 0.8)", // Darkened with transparency
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  headerLogo: {
    height: 36,
    width: 90,
    marginRight: 12,
  },
  logoContainer: {
    flexDirection: "row",
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed from #3366FF
  },
  logoTextAlt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00E096", // Kept green
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(237, 241, 247, 0.2)", // Made translucent
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
    marginLeft: 8,
  },
  balanceButton: {
    backgroundColor: "rgba(46, 58, 89, 0.6)", // Made translucent
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
    backgroundColor: "rgba(34, 43, 69, 0.8)", // Made translucent
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginLeft: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF3D71", // Kept red for emphasis
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF3D71", // Kept red for emphasis
  },
  tabsScrollView: {
    flexGrow: 0,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#00E096", // Changed from #3366FF to green
  },
  tabText: {
    fontSize: 12,
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
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    position: "relative",
    zIndex: 1,
  },

  // Section styling (common for all sections)
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: "rgba(26, 26, 46, 0.6)", // Dark translucent
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed from #222B45
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00E096", // Changed from #3366FF to green
  },

  // Live matches horizontal section at the top
  liveMatchesSection: {
    marginBottom: 16,
    backgroundColor: "rgba(26, 26, 46, 0.6)", // Dark translucent
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  horizontalScrollView: {
    flexGrow: 0,
  },

  // LiveMatchCard component styles
  liveMatchCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginBottom: 8,
    width: 240,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  liveMatchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  gameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameIcon: {
    marginRight: 6,
  },
  matchType: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
  },
  liveBadge: {
    backgroundColor: "rgba(255, 61, 113, 0.5)", // Translucent red
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  liveIndicatorText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  matchTeamsContainer: {
    marginBottom: 8,
  },
  teamRowHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)", // Darker border
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF", // Changed from #1A1A2E
  },
  teamScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00E096", // Changed from #3366FF to green
  },
  noughtsContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(237, 241, 247, 0.3)", // Translucent
    justifyContent: "center",
    alignItems: "center",
  },
  noughtsSymbol: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed from #3366FF
  },
  matchFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)", // Darker border
  },
  viewersCount: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
    marginRight: 6,
  },

  // MatchCard component styles
  matchCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderRadius: 8,
    padding: 10,
    margin: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
    minWidth: 260,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  startTimeText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
    fontWeight: "500",
  },
  teamsContainer: {
    marginBottom: 8,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  // Featured events section
  featuredScrollView: {
    marginBottom: 6,
  },

  // EventCard component styles
  eventCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 8,
    width: 240,
    overflow: "hidden",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
    height: 150,
  },
  eventCardContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed from #1A1A2E
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
    marginBottom: 12,
    flex: 1,
  },
  stakeButton: {
    backgroundColor: "#00E096", // Changed from #3366FF to green
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  stakeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 12,
  },
  requestButton: {
    backgroundColor: "#00E096", // Kept green
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 12,
  },
  scoreContainer: {
    marginTop: 6,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00E096", // Changed from #3366FF to green
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
  },

  // Games section
  gamesScrollView: {
    flexGrow: 0,
  },

  // GameButton component styles
  gameButton: {
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  functionalGame: {
    borderWidth: 2,
    borderColor: "#00E096", // Changed from #3366FF to green
  },
  gameButtonText: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF", // Changed from #1A1A2E
  },

  // Top competitions section
  competitionsContainer: {
    marginTop: 6,
  },

  // CompetitionCard component styles
  competitionCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)", // Dark translucent
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  competitionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  competitionIcon: {
    marginRight: 10,
  },
  competitionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF", // Changed from #1A1A2E
  },
  competitionCountBadge: {
    backgroundColor: "rgba(237, 241, 247, 0.2)", // Made translucent
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  competitionCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00E096", // Changed from #3366FF to green
  },

  // Filter options
  filterOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterOption: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 6,
    borderRadius: 14,
  },
  filterOptionActive: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 6,
    borderRadius: 14,
    backgroundColor: "rgba(237, 241, 247, 0.2)", // Made translucent
  },
  filterOptionText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)", // Lighter color
  },
  filterOptionTextActive: {
    fontSize: 11,
    color: "#00E096", // Changed from #3366FF to green
    fontWeight: "600",
  },

  // All matches grid
  matchesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  showMoreButton: {
    backgroundColor: "rgba(26, 26, 46, 0.6)", // Dark translucent
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Lighter border
  },
  showMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00E096", // Changed from #3366FF to green
  },
});
