import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const teamManagementStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#0F0F0F",
    width: "100%",
    height: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#1A1A1A",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "column",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#777",
    fontSize: 14,
  },
  headerSeparator: {
    color: "#777",
    marginHorizontal: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    gap: 10,
  },
  createTeamButton: {
    backgroundColor: "#4CD964",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  createTeamButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  joinTeamButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#4CD964",
  },
  joinTeamButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#1A1A1A",
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#4CD964",
  },
  tabText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  teamsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 16,
    gap: 24,
  },
  teamCard: {
    alignItems: "center",
    width: 90,
    position: "relative",
    marginBottom: 8,
  },
  teamIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  teamIcon: {
    textAlign: "center",
  },
  teamLogo: {
    width: "100%",
    height: "100%",
  },
  teamName: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 4,
  },
  responsibilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  ownerBadge: {
    backgroundColor: "#4CD964",
  },
  memberBadge: {
    backgroundColor: "#007AFF",
  },
  responsibilityText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  eventsContainer: {
    padding: 16,
    gap: 16,
  },
  eventCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333",
  },
  eventHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },
  matchupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  teamMatchup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  teamIconContainerSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  oppIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7B1FA2",
    justifyContent: "center",
    alignItems: "center",
  },
  oppIconText: {
    color: "#fff",
    fontWeight: "bold",
  },
  oppTeamIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7B1FA2",
    justifyContent: "center",
    alignItems: "center",
  },
  teamMatchupName: {
    color: "#fff",
    fontSize: 14,
  },
  vsText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  readyContainer: {
    backgroundColor: "#4CD964",
    padding: 8,
    alignItems: "center",
  },
  readyText: {
    color: "#000",
    fontWeight: "bold",
  },
  scoreContainer: {
    backgroundColor: "#252525",
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  resultText: {
    color: "#4CD964",
    fontWeight: "bold",
  },
  resultTextLoss: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  scoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
