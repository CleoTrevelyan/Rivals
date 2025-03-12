import { checkWinner } from "../utils/gameUtils";

/**
 * Makes an AI move on the provided Tic-Tac-Toe board
 * The AI prioritizes:
 * 1. Winning moves
 * 2. Blocking player's winning moves
 * 3. Taking the center
 * 4. Taking a random available move
 *
 * @param board Current game board
 * @returns Position of the AI's move or null if no move is possible
 */
export const aiMakeMove = (board: Array<"X" | "O" | null>): number | null => {
  // Find all empty cells
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);

  if (emptyCells.length === 0) return null;

  // 1. First check if AI can win in one move
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = "O";
    if (checkWinner(testBoard) === "O") {
      // AI can win, make this move
      return cell;
    }
  }

  // 2. Then check if player can win in one move and block it
  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = "X";
    if (checkWinner(testBoard) === "X") {
      // Block player's winning move
      return cell;
    }
  }

  // 3. If center is empty, take it
  if (board[4] === null) {
    return 4;
  }

  // 4. Take a corner if available
  const corners = [0, 2, 6, 8].filter((corner) => board[corner] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Otherwise, make a random move
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

/**
 * Determines if the AI should accept a rematch
 * In this simple implementation, the AI always accepts
 *
 * @returns True indicating AI accepts the rematch
 */
export const aiAcceptRematch = (): boolean => {
  return true;
};
