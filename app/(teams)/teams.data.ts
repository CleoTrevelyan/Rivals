// teams.data.ts
export interface TeamData {
  id: string;
  name: string;
  icon: string;
  responsibility: "owner" | "member";
  members?: number;
  logoUrl?: string;
}

export const teamsData: TeamData[] = [
    {
        id: "team1",
        name: "FaZe Clan",
        icon: "fire",
        responsibility: "owner",
        members: 12,
        logoUrl: require("@/assets/images/teams/faze-clan.png"),
    },
    {
        id: "team2",
        name: "Angry Unicorns",
        icon: "user-ninja",
        responsibility: "owner",
        members: 8,
        logoUrl: require("@/assets/images/teams/angry-unicorns.png"),
    },
    {
        id: "team3",
        name: "Cobras",
        icon: "chess-knight",
        responsibility: "owner",
        members: 10,
        logoUrl: require("@/assets/images/teams/cobras.png"),
    },
    {
        id: "team4",
        name: "Gamer Squadron",
        icon: "gamepad",
        responsibility: "member",
        members: 15,
        logoUrl: require("@/assets/images/teams/gamer-squadron.png"),
    },
    {
        id: "team5",
        name: "The Sabretooths",
        icon: "rocket",
        responsibility: "member",
        members: 9,
        logoUrl: require("@/assets/images/teams/sabretooths.png"),
    },
];
