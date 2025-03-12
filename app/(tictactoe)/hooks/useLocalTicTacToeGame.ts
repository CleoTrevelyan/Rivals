import { useState, useEffect } from "react";
import { aiMakeMove } from "../services/aiPlayer";
import { checkWinner } from "../utils/gameUtils";

/**
 * Custom hook for managing a local Tic-Tac-Toe game against AI
 */
const useLocalTicTacToeGame = () => {
  const [board, setBoard] = useState<Array<"X" | "O" | null>>(
    Array(9).fill(null)
  );
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [lastMove, setLastMove] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [rematchRequested, setRematchRequested] = useState<boolean>(false);

  // Player always uses X in local games
  const playerSymbol = "X";
  const opponentName = "AI Opponent";

  // GamePlayer move handler
  const makeMove = (position: number) => {
    if (
      !isActive ||
      board[position] !== null ||
      currentTurn !== "X" ||
      winner
    ) {
      return false;
    }

    // Update board with player's move
    const newBoard = [...board];
    newBoard[position] = "X";
    setBoard(newBoard);
    setLastMove(position);
    setCurrentTurn("O");

    // Check for winner after player's move
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setIsActive(false);
      return true;
    }

    // If no winner, AI will make a move after a short delay
    setTimeout(() => {
      handleAIMove(newBoard);
    }, Math.random() * 500 + 500); // Random delay between 0.5-1s for more natural feeling

    return true;
  };

  // AI move handler
  const handleAIMove = (currentBoard: Array<"X" | "O" | null>) => {
    // If game is over or not AI's turn, don't make a move
    if (!isActive || winner) return;

    // Get AI move using the service function
    const aiPosition = aiMakeMove(currentBoard);

    if (aiPosition === null) return;

    // Update board with AI's move
    const newBoard = [...currentBoard];
    newBoard[aiPosition] = "O";
    setBoard(newBoard);
    setLastMove(aiPosition);
    setCurrentTurn("X");

    // Check if this move creates a win or draw
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setIsActive(false);
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentTurn("X");
    setWinner(null);
    setLastMove(null);
    setIsActive(true);
    setRematchRequested(false);
  };

  // Simulate forfeit
  const forfeitGame = () => {
    setWinner("O");
    setIsActive(false);
  };

  // Request rematch
  const requestRematch = () => {
    setRematchRequested(true);
    // In local mode, AI always accepts, so auto-reset after a brief delay
    setTimeout(() => {
      resetGame();
    }, 500);
  };

  return {
    board,
    currentTurn,
    playerSymbol,
    isPlayerTurn: currentTurn === playerSymbol,
    winner,
    isActive,
    lastMove,
    opponentName,
    isConnected: true, // Always connected in local play
    error: null,
    rematchOffered: rematchRequested,
    makeMove,
    forfeitGame,
    requestRematch,
    acceptRematch: resetGame,
  };
};

export default useLocalTicTacToeGame;
