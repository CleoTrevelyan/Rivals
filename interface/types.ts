export interface GameButtonProps {
  game: {
    functional: boolean;
    icon: string;
    id: string;
    title: string;
  };
  onPress: () => void;
}

export interface ButtonProps {
  onPress: () => void;
}

export interface HeaderProps {
  userBalance: number;
  onLogout: () => void;
  onCreateGame: () => void;
  onJoinGame: () => void;
  handleMatchmaking: () => void;
  playModalVisible: boolean;
  setPlayModalVisible: (visible: boolean) => void;
  handleTeamPress: () => void;
}

export type GameStage = "join" | "searching" | "ready" | "playing" | "results";

export interface GamePlayer {
  id?: any; // Changed to optional
  name: string;
  avatar?: string;
  imageSource?: any; // Added for local images
  isReady: boolean;
  symbol: "X" | "O";
  score: number;
  colors?: string[];
  level?: number; // Added level property
}

export interface GameModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface TicTacToeGameProps {
  // The current player's symbol (X or O)
  playerSymbol: "X" | "O";
  // Called when a player makes a move with position index (0-8)
  onMove?: (position: number) => void;
  // Called when the game is won, lost, or drawn
  onGameEnd?: (result: "win" | "loss" | "draw") => void;
  // Current game state from server - array of 9 cells with 'X', 'O' or null
  gameState?: Array<"X" | "O" | null>;
  // Whose turn is it?
  currentTurn?: "X" | "O";
  // Is this our turn?
  isPlayerTurn?: boolean;
  // Is the game active?
  active?: boolean;
  // Time limit for the current move (optional)
  timeLimit?: number;
  // Winner of the game (if any)
  winner?: "X" | "O" | "draw" | null;
}

// Define the steps in the game creation flow
export type GameCreationStep =
  | "chooseGame"
  | "enterStake"
  | "inviteFriend"
  | "waitingForAccept"
  | "userNotReady"
  | "joinGame"
  | "postGame";

// Game interface
export interface Game {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Friend interface
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  imageSource?: any; // Added for local images
  online: boolean;
  level?: number; // Added level
  colors?: string[]; // Added for win/loss colors
}

// Player interface
export interface Player {
  id: string;
  name: string;
  avatar: string;
  imageSource?: any; // Added for local images
  ready: boolean;
  score?: number;
  level?: number; // Added level
  color?: string[];
}

export interface CreateGameModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface ProgressBarProps {
  progress: number;
}

export interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export interface UseTicTacToeGameProps {
  socket: WebSocket | null;
  gameID?: string;
  playerID?: string;
  onGameEnd?: (result: "win" | "loss" | "draw") => void;
  initialPlayerSymbol?: "X" | "O";
  timeLimit?: number;
}

export interface GameState {
  board: Array<"X" | "O" | null>;
  currentTurn: "X" | "O";
  playerSymbol: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  isActive: boolean;
  lastMove: number | null;
  opponentID?: string;
  opponentName?: string;
}

export interface Match {
  game: string;
  type: string;
  teams: Array<{
    name: string;
    score: number | null;
    symbol?: "X" | "O";
  }>;
  viewers?: number;
}

export interface LiveMatchCardProps {
  match: Match;
  onPress: () => void;
}

export interface Team {
  name: string;
  score: number | null;
  symbol?: string;
}

export interface MatchCardProps {
  game: string;
  type: string;
  isLive: boolean;
  startTime?: string;
  teams: Team[];
  viewers?: number;
}

export interface Competition {
  icon: string;
  name: string;
  count: number;
}

export interface CompetitionCardProps {
  competition: Competition;
  onPress: () => void;
}

export interface Event {
  title: string;
  description: string;
  buttonText?: string;
  buttonType?: "stake" | "request";
  score?: number;
  time?: string;
}

export interface EventCardProps {
  event: Event;
  onPress: () => void;
}

import { ReactNode } from "react";

export interface GameButtonProps {
  game: {
    functional: boolean;
    icon: string;
    id: string;
    title: string;
  };
  onPress: () => void;
}

export interface CreateGameButtonProps {
  onPress: () => void;
}

export interface GamePlayer {
  id?: any; // Changed to optional
  name: string;
  avatar?: string;
  imageSource?: any; // Added for local images
  isReady: boolean;
  symbol: "X" | "O";
  score: number;
  colors?: string[];
  level?: number; // Added level property
}

export interface GameModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface TicTacToeGameProps {
  // The current player's symbol (X or O)
  playerSymbol: "X" | "O";
  // Called when a player makes a move with position index (0-8)
  onMove?: (position: number) => void;
  // Called when the game is won, lost, or drawn
  onGameEnd?: (result: "win" | "loss" | "draw") => void;
  // Current game state from server - array of 9 cells with 'X', 'O' or null
  gameState?: Array<"X" | "O" | null>;
  // Whose turn is it?
  currentTurn?: "X" | "O";
  // Is this our turn?
  isPlayerTurn?: boolean;
  // Is the game active?
  active?: boolean;
  // Time limit for the current move (optional)
  timeLimit?: number;
  // Winner of the game (if any)
  winner?: "X" | "O" | "draw" | null;
}

// Game interface
export interface Game {
  id: string;
  name: string;
  icon: ReactNode;
}

// Friend interface
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  imageSource?: any; // Added for local images
  online: boolean;
  level?: number; // Added level
  colors?: string[]; // Added for win/loss colors
}

// Player interface
export interface Player {
  id: string;
  name: string;
  avatar: string;
  imageSource?: any; // Added for local images
  ready: boolean;
  score?: number;
  level?: number; // Added level
  color?: string[];
}

export interface CreateGameModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface JoinGameModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface ProgressBarProps {
  progress: number;
}

export interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export interface UseTicTacToeGameProps {
  socket: WebSocket | null;
  gameID?: string;
  playerID?: string;
  onGameEnd?: (result: "win" | "loss" | "draw") => void;
  initialPlayerSymbol?: "X" | "O";
  timeLimit?: number;
}

export interface GameState {
  board: Array<"X" | "O" | null>;
  currentTurn: "X" | "O";
  playerSymbol: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  isActive: boolean;
  lastMove: number | null;
  opponentID?: string;
  opponentName?: string;
}

export interface Match {
  game: string;
  type: string;
  teams: Array<{
    name: string;
    score: number | null;
    symbol?: "X" | "O";
  }>;
  viewers?: number;
}

export interface LiveMatchCardProps {
  match: Match;
  onPress: () => void;
}

export interface Team {
  name: string;
  score: number | null;
  symbol?: string;
}

export interface MatchCardProps {
  game: string;
  type: string;
  isLive: boolean;
  startTime?: string;
  teams: Team[];
  viewers?: number;
}

export interface Competition {
  icon: string;
  name: string;
  count: number;
}

export interface CompetitionCardProps {
  competition: Competition;
  onPress: () => void;
}

export interface Event {
  title: string;
  description: string;
  buttonText?: string;
  buttonType?: "stake" | "request";
  score?: number;
  time?: string;
}

export interface EventCardProps {
  event: Event;
  onPress: () => void;
}

// New interfaces for Play and Team buttons
export interface PlayButtonProps {
  onPress: () => void;
}

export interface TeamButtonProps {
  onPress: () => void;
}

// Play Modal Props
export interface PlayModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateGame: () => void;
  onJoinGame: () => void;
  onMatchmaking: () => void;
}

// Header Props with onJoinGame added
export interface HeaderProps {
  userBalance: number;
  onCreateGame: () => void;
  onJoinGame: () => void;
  onLogout: () => void;
}
export interface MatchmakingModalProps {
  visible: boolean;
  onClose: () => void;
}

// Enum for the matchmaking stages if you want to use it:
export enum MatchmakingStage {
  RULES = "rules",
  SEARCHING = "searching",
  OPPONENT_FOUND = "opponentFound",
  READY = "ready",
  POST_GAME = "postGame",
}

// Fixed interface/types.ts file

export interface ButtonProps {
  onPress: () => void;
}

export interface HeaderProps {
  userBalance: number;
  onCreateGame: () => void;
  onJoinGame: () => void;
  onLogout: () => void;
  handleMatchmaking: () => void;
  playModalVisible: boolean;
  setPlayModalVisible: (visible: boolean) => void;
  handleTeamPress: () => void;
}

export interface TeamManagementProps {
  visible: boolean;
  onClose: () => void;
}
