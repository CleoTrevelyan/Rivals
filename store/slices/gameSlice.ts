// store/slices/gameSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GamePlayer {
  id: string | null;
  name: string;
  avatar: string;
  imageSource?: any;
  isReady: boolean;
  symbol: "X" | "O";
  score: number;
  level: number;
  colors: string[];
}

export interface GameState {
  // Game session state
  gameID: string | null;
  stage: "join" | "searching" | "ready" | "playing" | "results";
  isLocalPlay: boolean;
  isLoading: boolean;
  message: string;

  // Connection state
  isConnected: boolean;
  connectionAttempts: number;

  // Players
  currentPlayer: GamePlayer;
  opponent: GamePlayer;

  // Game options
  gameOptions: {
    format: string;
    stake: string;
    timeLimit: string;
    firstMove: string;
  };

  // Game board state
  board: Array<"X" | "O" | null>;
  currentTurn: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  isActive: boolean;
  lastMove: number | null;

  // Rematch state
  rematchOffered: boolean;

  // Match info
  matchInfo: {
    date: string;
    time: string;
  };
}

const initialState: GameState = {
  // Game session state
  gameID: null,
  stage: "join",
  isLocalPlay: false,
  isLoading: false,
  message: "",

  // Connection state
  isConnected: false,
  connectionAttempts: 0,

  // Players
  currentPlayer: {
    id: null,
    name: "VikingDestroyer",
    avatar: "V",
    imageSource: require("@/assets/images/placeholders/haaland.png"),
    isReady: false,
    symbol: "X",
    score: 20,
    level: 9,
    colors: ["#80ff80", "#ff8080", "#80ff80", "#ff8080", "#80ff80"],
  },
  opponent: {
    id: "opponent-id",
    name: "Xx_KaiCenat_xX",
    avatar: "K",
    imageSource: require("@/assets/images/placeholders/kai_cenat.png"),
    isReady: false,
    symbol: "O",
    score: -20,
    level: 7,
    colors: ["#ff8080", "#ff8080", "#80ff80", "#80ff80", "#ff8080"],
  },

  // Game options
  gameOptions: {
    format: "PUBLIC",
    stake: "£0.00",
    timeLimit: "UNLIMITED",
    firstMove: "RANDOM",
  },

  // Game board state
  board: Array(9).fill(null),
  currentTurn: "X",
  winner: null,
  isActive: true,
  lastMove: null,

  // Rematch state
  rematchOffered: false,

  // Match info
  matchInfo: {
    date: "05 March, 2025",
    time: "16:30",
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Session management
    setGameID: (state, action: PayloadAction<string | null>) => {
      state.gameID = action.payload;
    },
    setGameStage: (state, action: PayloadAction<GameState["stage"]>) => {
      state.stage = action.payload;

      // Reset certain states when changing stages
      if (action.payload === "join") {
        state.isLocalPlay = false;
        state.isLoading = false;
        state.message = "";
        state.isConnected = false;
        state.connectionAttempts = 0;
        state.currentPlayer.isReady = false;
        state.opponent.isReady = false;
        state.rematchOffered = false;
        state.board = Array(9).fill(null);
        state.winner = null;
        state.isActive = true;
        state.lastMove = null;
      }
    },
    setLocalPlay: (state, action: PayloadAction<boolean>) => {
      state.isLocalPlay = action.payload;

      // If local play is enabled, automatically "connect"
      if (action.payload) {
        state.isConnected = true;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },

    // Connection state
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    incrementConnectionAttempts: (state) => {
      state.connectionAttempts += 1;
    },
    resetConnectionAttempts: (state) => {
      state.connectionAttempts = 0;
    },

    // Player management
    setPlayerID: (state, action: PayloadAction<string | null>) => {
      if (state.currentPlayer) {
        state.currentPlayer.id = action.payload;
      }
    },
    setPlayerReady: (state, action: PayloadAction<boolean>) => {
      if (state.currentPlayer) {
        state.currentPlayer.isReady = action.payload;
      }
    },
    setOpponentReady: (state, action: PayloadAction<boolean>) => {
      if (state.opponent) {
        state.opponent.isReady = action.payload;
      }
    },
    updateOpponent: (state, action: PayloadAction<Partial<GamePlayer>>) => {
      state.opponent = { ...state.opponent, ...action.payload };
    },
    setPlayerSymbol: (state, action: PayloadAction<"X" | "O">) => {
      state.currentPlayer.symbol = action.payload;
      // Set opponent to opposite symbol
      state.opponent.symbol = action.payload === "X" ? "O" : "X";
    },

    // Game options
    updateGameOption: (
      state,
      action: PayloadAction<{ option: string; value: string }>
    ) => {
      const { option, value } = action.payload;
      state.gameOptions = { ...state.gameOptions, [option]: value };

      // If format is changed to LOCAL, update isLocalPlay
      if (option === "format" && value === "LOCAL") {
        state.isLocalPlay = true;
      } else if (option === "format" && value !== "LOCAL") {
        state.isLocalPlay = false;
      }
    },

    // Game board state
    updateBoard: (state, action: PayloadAction<Array<"X" | "O" | null>>) => {
      state.board = action.payload;
    },
    makeMove: (
      state,
      action: PayloadAction<{ position: number; symbol: "X" | "O" }>
    ) => {
      const { position, symbol } = action.payload;

      if (state.board[position] === null && !state.winner && state.isActive) {
        // Update the board
        const newBoard = [...state.board];
        newBoard[position] = symbol;
        state.board = newBoard;
        state.lastMove = position;

        // Toggle turn
        state.currentTurn = state.currentTurn === "X" ? "O" : "X";

        // Check for winner
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], // rows
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], // columns
          [0, 4, 8],
          [2, 4, 6], // diagonals
        ];

        // Check for winner
        for (const [a, b, c] of lines) {
          if (
            newBoard[a] &&
            newBoard[a] === newBoard[b] &&
            newBoard[a] === newBoard[c]
          ) {
            state.winner = newBoard[a];
            state.isActive = false;
            return;
          }
        }

        // Check for draw
        if (!newBoard.includes(null)) {
          state.winner = "draw";
          state.isActive = false;
        }
      }
    },
    setCurrentTurn: (state, action: PayloadAction<"X" | "O">) => {
      state.currentTurn = action.payload;
    },
    setWinner: (state, action: PayloadAction<"X" | "O" | "draw" | null>) => {
      state.winner = action.payload;
      if (action.payload) {
        state.isActive = false;
      }
    },
    setGameActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },

    // Rematch state
    setRematchOffered: (state, action: PayloadAction<boolean>) => {
      state.rematchOffered = action.payload;
    },

    // Reset game (for starting a new game/rematch)
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentTurn = "X";
      state.winner = null;
      state.isActive = true;
      state.lastMove = null;
      state.rematchOffered = false;
    },

    // Full reset (back to initial state)
    fullReset: () => initialState,
  },
});

export const {
  setGameID,
  setGameStage,
  setLocalPlay,
  setLoading,
  setMessage,
  setConnected,
  incrementConnectionAttempts,
  resetConnectionAttempts,
  setPlayerID,
  setPlayerReady,
  setOpponentReady,
  updateOpponent,
  setPlayerSymbol,
  updateGameOption,
  updateBoard,
  makeMove,
  setCurrentTurn,
  setWinner,
  setGameActive,
  setRematchOffered,
  resetGame,
  fullReset,
} = gameSlice.actions;

export default gameSlice.reducer;
