import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { AnyAction } from 'redux';
import type { RootState, AppDispatch } from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setPlayerID,
  makeMove as makeGameMove,
  setPlayerSymbol,
} from "./slices/gameSlice";
import {
  socketConnect,
  socketDisconnect,
  startMatchmaking,
  cancelMatchmaking,
  playerReady,
  makeMove as socketMakeMove,
  forfeitGame,
  requestRematch,
} from "./middleware/gameSocketMiddleware";

// The rest of the hook stays the same, just make sure actions are cast to AnyAction

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for managing Tic-Tac-Toe game state through Redux
 */
export const useReduxTicTacToeGame = () => {
  const dispatch = useAppDispatch();

  // Select states from Redux
  const gameState = useAppSelector((state) => state.game);
  const {
    board,
    currentTurn,
    currentPlayer,
    opponent,
    isActive,
    winner,
    lastMove,
    isConnected,
    rematchOffered,
    isLocalPlay,
    stage,
  } = gameState;

  // Load player ID on mount
  useEffect(() => {
    const loadPlayerID = async () => {
      try {
        const id = await AsyncStorage.getItem("playerID");

        if (!id) {
          // Generate a new player ID if none exists
          const newId = `user-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;
          await AsyncStorage.setItem("playerID", newId);
          dispatch(setPlayerID(newId));
        } else {
          dispatch(setPlayerID(id));
        }
      } catch (error) {
        console.error("Error loading playerID:", error);
        // Set fallback
        const fallbackId = `user-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;
        dispatch(setPlayerID(fallbackId));
      }
    };

    loadPlayerID();
  }, [dispatch]);

  // Connect to socket when needed
  const connectSocket = useCallback(() => {
    if (!isLocalPlay) {
      dispatch(socketConnect() as AnyAction);
    }
  }, [dispatch, isLocalPlay]);

  // Disconnect from socket
  const disconnectSocket = useCallback(() => {
    dispatch(socketDisconnect() as AnyAction);
  }, [dispatch]);

  // Start matchmaking
  const startSearch = useCallback(
    (gameType: string = "TTT") => {
      if (isLocalPlay) {
        // For local play, just set up the game state directly
        dispatch(setPlayerSymbol("X"));
        return;
      }

      // For online play, start matchmaking
      dispatch(startMatchmaking(gameType) as AnyAction);
    },
    [dispatch, isLocalPlay]
  );

  // Cancel matchmaking
  const cancelSearch = useCallback(() => {
    if (!isLocalPlay) {
      dispatch(cancelMatchmaking() as AnyAction);
    }
  }, [dispatch, isLocalPlay]);

  // Player ready
  const playerReadyAction = useCallback(() => {
    if (!isLocalPlay) {
      dispatch(playerReady() as AnyAction);
    }
  }, [dispatch, isLocalPlay]);

  // Make a move
  const handleMove = useCallback(
    (position: number) => {
      // Only allow moves if:
      // - Game is active
      // - It's the player's turn
      // - The cell is empty
      // - There's no winner yet
      if (
        !isActive ||
        currentTurn !== currentPlayer.symbol ||
        board[position] !== null ||
        winner
      ) {
        return false;
      }

      // Make the move locally
      dispatch(makeGameMove({ position, symbol: currentPlayer.symbol }));

      // Send move to server if online
      if (!isLocalPlay) {
        dispatch(socketMakeMove(position, currentPlayer.symbol) as AnyAction);
      } else {
        // For local play, schedule AI move
        setTimeout(() => {
          // Simple AI: Find a random empty spot
          const emptyCells = board
            .map((cell, index) => (cell === null ? index : -1))
            .filter((index: number) => index !== -1);

          if (emptyCells.length > 0 && !winner) {
            const aiPosition =
              emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const aiSymbol = currentPlayer.symbol === "X" ? "O" : "X";
            dispatch(makeGameMove({ position: aiPosition, symbol: aiSymbol }));
          }
        }, 500);
      }

      return true;
    },
    [
      board,
      currentTurn,
      currentPlayer.symbol,
      isActive,
      winner,
      isLocalPlay,
      dispatch,
    ]
  );

  // Forfeit the game
  const handleForfeit = useCallback(() => {
    if (!isLocalPlay) {
      dispatch(forfeitGame() as AnyAction);
    } else {
      // For local play, just set winner to opponent
      const opponentSymbol = currentPlayer.symbol === "X" ? "O" : "X";
      dispatch({ type: "game/setWinner", payload: opponentSymbol });
    }
  }, [currentPlayer.symbol, isLocalPlay, dispatch]);

  // Request a rematch
  const handleRematch = useCallback(
    (isAccepting: boolean = false) => {
      if (!isLocalPlay) {
        dispatch(requestRematch(isAccepting) as AnyAction);
      } else {
        // For local play, just reset the game
        dispatch({ type: "game/resetGame" });
      }
    },
    [isLocalPlay, dispatch]
  );

  // Reset the game completely
  const resetGame = useCallback(() => {
    dispatch({ type: "game/resetGame" });
  }, [dispatch]);

  return {
    // Game state
    board,
    currentTurn,
    playerSymbol: currentPlayer.symbol,
    isPlayerTurn: currentTurn === currentPlayer.symbol,
    winner,
    isActive,
    lastMove,
    isConnected,
    rematchOffered,
    isLocalPlay,
    stage,
    currentPlayer,
    opponent,

    // Connection actions
    connectSocket,
    disconnectSocket,

    // Game flow actions
    startSearch,
    cancelSearch,
    playerReady: playerReadyAction,

    // Game actions
    makeMove: handleMove,
    forfeitGame: handleForfeit,
    requestRematch: handleRematch,
    acceptRematch: () => handleRematch(true),
    resetGame,

    // Symbol setter (for manual control)
    setPlayerSymbol: (symbol: "X" | "O") => dispatch(setPlayerSymbol(symbol)),
  };
};
