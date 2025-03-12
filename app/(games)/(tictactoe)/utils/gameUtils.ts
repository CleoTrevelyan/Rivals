/**
 * Checks if there's a winner on the current board
 * @param board Current game board
 * @returns "X" or "O" if there's a winner, "draw" if the game is a draw, or null if the game is ongoing
 */
export const checkWinner = (
  board: Array<"X" | "O" | null>
): "X" | "O" | "draw" | null => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (!board.includes(null)) {
    return "draw";
  }

  // Game is still ongoing
  return null;
};

/**
 * Formats time in seconds to a human-readable string
 * @param timeInSeconds Time in seconds
 * @returns Formatted time string (e.g., "1:30")
 */
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Creates an initial game state
 * @param firstPlayer Symbol of the first player ("X" or "O")
 * @returns Initial game state object
 */
export const createInitialGameState = (firstPlayer: "X" | "O" = "X") => {
  return {
    board: Array(9).fill(null),
    currentTurn: "X", // X always goes first in tic-tac-toe
    playerSymbol: firstPlayer,
    winner: null,
    isActive: true,
    lastMove: null,
  };
};

/**
 * Determines if it's the player's turn
 * @param currentTurn Current turn ("X" or "O")
 * @param playerSymbol Player's symbol ("X" or "O")
 * @returns True if it's the player's turn
 */
export const isPlayerTurn = (
  currentTurn: "X" | "O",
  playerSymbol: "X" | "O"
): boolean => {
  return currentTurn === playerSymbol;
};
