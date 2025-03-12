import { StyleSheet, Dimensions } from "react-native";

// Get initial dimensions
const windowWidth = Dimensions.get("window").width;
const isMobile = windowWidth < 768;

const homeStyles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Header styles - modified for mobile
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isMobile ? "space-between" : "flex-start",
    paddingHorizontal: isMobile ? 12 : 16,
    paddingVertical: 12,
    backgroundColor: "rgba(26, 26, 46, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  headerLogo: {
    height: 36,
    width: isMobile ? 80 : 90,
    marginRight: isMobile ? 0 : 12,
  },
  logoContainer: {
    flexDirection: "row",
    marginRight: isMobile ? 0 : 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  logoTextAlt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00E096",
  },

  // Search bar - modified for mobile
  searchBar: {
    flex: isMobile ? 0 : 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(237, 241, 247, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
    display: isMobile ? "none" : "flex",
  },
  searchPlaceholder: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginLeft: 8,
  },

  // Balance button - modified for mobile
  balanceButton: {
    backgroundColor: "rgba(46, 58, 89, 0.6)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  mobileBalanceButton: {
    marginRight: 8,
    paddingHorizontal: 8,
  },
  balanceText: {
    fontSize: isMobile ? 12 : 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  menuButton: {
    padding: 4,
  },

  // Button styles
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

  // Mobile menu styles
  mobileMenuContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  mobileMenuContent: {
    backgroundColor: "rgba(26, 26, 46, 0.95)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  mobileMenuCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 16,
  },
  mobileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  mobileMenuItemText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
  },

  // Tab navigation - modified for mobile
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(34, 43, 69, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: isMobile ? 4 : 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: isMobile ? 8 : 16,
    marginLeft: isMobile ? 4 : 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF3D71",
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF3D71",
  },
  tabsScrollView: {
    flexGrow: 0,
  },
  mobileTabsContent: {
    paddingRight: 8,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  mobileTabButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 2,
  },
  activeTabButton: {
    backgroundColor: "#00E096",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  mobileTabText: {
    fontSize: 10,
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
    padding: isMobile ? 8 : 12,
    position: "relative",
    zIndex: 1,
  },

  // Section styling (common for all sections)
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: "rgba(26, 26, 46, 0.6)",
    borderRadius: 10,
    padding: isMobile ? 8 : 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  sectionHeader: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: isMobile ? 8 : 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00E096",
    marginTop: isMobile ? 4 : 0,
  },

  // Live matches horizontal section at the top
  liveMatchesSection: {
    marginBottom: 16,
    backgroundColor: "rgba(26, 26, 46, 0.6)",
    borderRadius: 10,
    padding: isMobile ? 8 : 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  horizontalScrollView: {
    flexGrow: 0,
  },

  // LiveMatchCard component styles - modified for mobile
  liveMatchCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginBottom: 8,
    width: isMobile ? 200 : 240,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    fontSize: isMobile ? 10 : 12,
    color: "rgba(255, 255, 255, 0.6)",
  },
  liveBadge: {
    backgroundColor: "rgba(255, 61, 113, 0.5)",
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
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  teamName: {
    fontSize: isMobile ? 12 : 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  teamScore: {
    fontSize: isMobile ? 12 : 14,
    fontWeight: "bold",
    color: "#00E096",
  },
  noughtsContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(237, 241, 247, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  noughtsSymbol: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  matchFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  viewersCount: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: 6,
  },

  // MatchCard component styles - modified for mobile
  matchCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)",
    borderRadius: 8,
    padding: isMobile ? 8 : 10,
    margin: isMobile ? 4 : 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minWidth: isMobile ? 200 : 260,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  startTimeText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
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
  mobileTeamRow: {
    marginBottom: 4,
  },

  // Mobile matches scroll view
  mobileMatchesScroll: {
    flexGrow: 0,
    marginBottom: 8,
  },

  // Featured events section
  featuredScrollView: {
    marginBottom: 6,
  },

  // EventCard component styles - modified for mobile
  eventCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)",
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 8,
    width: isMobile ? 200 : 240,
    overflow: "hidden",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    height: isMobile ? 130 : 150,
  },
  eventCardContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: isMobile ? 14 : 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: isMobile ? 10 : 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
    flex: 1,
  },
  stakeButton: {
    backgroundColor: "#00E096",
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
    backgroundColor: "#00E096",
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
    color: "#00E096",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
  },

  // Games section - modified for mobile
  gamesScrollView: {
    flexGrow: 0,
  },
  gameButton: {
    backgroundColor: "rgba(26, 26, 46, 0.4)",
    borderRadius: 8,
    padding: isMobile ? 8 : 12,
    marginRight: 10,
    width: isMobile ? 70 : 80,
    height: isMobile ? 70 : 80,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  functionalGame: {
    borderWidth: 2,
    borderColor: "#00E096",
  },
  gameButtonText: {
    marginTop: 6,
    fontSize: isMobile ? 9 : 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Top competitions section
  competitionsContainer: {
    marginTop: 6,
  },
  competitionCard: {
    backgroundColor: "rgba(26, 26, 46, 0.4)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    color: "#FFFFFF",
  },
  competitionCountBadge: {
    backgroundColor: "rgba(237, 241, 247, 0.2)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  competitionCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00E096",
  },

  // Filter options - modified for mobile
  filterOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  mobileFilterOptions: {
    marginTop: 8,
    alignSelf: "flex-start",
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
    backgroundColor: "rgba(237, 241, 247, 0.2)",
  },
  filterOptionText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)",
  },
  filterOptionTextActive: {
    fontSize: 11,
    color: "#00E096",
    fontWeight: "600",
  },

  // All matches grid - modified for mobile
  matchesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: isMobile ? "center" : "space-between",
  },
  showMoreButton: {
    backgroundColor: "rgba(26, 26, 46, 0.6)",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  showMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00E096",
  },

  // Utilities for responsive layouts
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  flexStart: {
    alignItems: "flex-start",
  },
  flexEnd: {
    alignItems: "flex-end",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  hiddenOnMobile: {
    display: isMobile ? "none" : "flex",
  },
  visibleOnMobile: {
    display: isMobile ? "flex" : "none",
  },
  marginTop8: {
    marginTop: 8,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  padding12: {
    padding: 12,
  },
  paddingHorizontal12: {
    paddingHorizontal: 12,
  },
});

export default homeStyles;