import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ticTacToeStyles } from "./styles/tictactoeStyles";
import { Ionicons } from "@expo/vector-icons";
import { TicTacToeGameProps } from "@/interface/types";

const TicTacToeGame: React.FC<TicTacToeGameProps> = ({
  playerSymbol,
  onMove,
  onGameEnd,
  gameState: externalGameState,
  currentTurn = "X",
  isPlayerTurn = true,
  active = true,
  timeLimit,
  winner = null,
}) => {
  // Local game state (fallback if not provided from props)
  const [localGameState, setLocalGameState] = useState<Array<"X" | "O" | null>>(
    Array(9).fill(null)
  );

  // Use external game state if provided, otherwise use local state
  const gameState = externalGameState || localGameState;

  // Time remaining for current move
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    timeLimit || null
  );

  // Last move highlight
  const [lastMove, setLastMove] = useState<number | null>(null);

  // Debug log for props
  useEffect(() => {
    console.log("TicTacToeGame props:", {
      playerSymbol,
      currentTurn,
      isPlayerTurn,
      active,
      winner,
      gameStateLength: gameState?.length || 0,
      hasExternalState: !!externalGameState,
    });
  }, [
    playerSymbol,
    currentTurn,
    isPlayerTurn,
    active,
    winner,
    gameState,
    externalGameState,
  ]);

  // Reset last move highlight when game state changes
  useEffect(() => {
    if (externalGameState) {
      // Find the last move by comparing with previous state
      for (let i = 0; i < externalGameState.length; i++) {
        if (localGameState[i] === null && externalGameState[i] !== null) {
          setLastMove(i);
          break;
        }
      }
      // Update local state to match external
      setLocalGameState([...externalGameState]);
    }
  }, [externalGameState]);

  // Handle countdown timer
  useEffect(() => {
    if (!timeLimit || !isPlayerTurn || !active || winner) return;

    setTimeRemaining(timeLimit);
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlayerTurn, timeLimit, active, currentTurn, winner]);

  // Handle a cell click
  const handleCellPress = (index: number) => {
    console.log(`Cell pressed at index ${index}`, {
      active,
      cellValue: gameState[index],
      isPlayerTurn,
      timeRemaining,
      winner,
      playerSymbol,
    });

    // Don't allow moves if:
    // - Game is not active
    // - Cell is already filled
    // - It's not the player's turn
    // - Time has run out
    // - There's already a winner
    if (
      !active ||
      gameState[index] !== null ||
      !isPlayerTurn ||
      (timeRemaining !== null && timeRemaining <= 0) ||
      winner
    ) {
      console.log("Move rejected");
      return;
    }

    // Set last move for highlight
    setLastMove(index);

    // Only update local state if external state is not provided
    if (!externalGameState) {
      const newState = [...localGameState];
      newState[index] = playerSymbol;
      setLocalGameState(newState);
    }

    // Notify parent component about the move
    console.log(`Making move at ${index} with symbol ${playerSymbol}`);
    onMove?.(index);
  };

  // Render a cell
  const renderCell = (index: number) => {
    const value = gameState[index];

    return (
      <TouchableOpacity
        key={index}
        style={[
          ticTacToeStyles.cell,
          lastMove === index && ticTacToeStyles.lastMoveCell,
        ]}
        onPress={() => handleCellPress(index)}
        disabled={!active || !isPlayerTurn || value !== null || winner !== null}
      >
        {value === "X" && (
          <Text style={[ticTacToeStyles.symbol, ticTacToeStyles.symbolX]}>
            X
          </Text>
        )}
        {value === "O" && (
          <Text style={[ticTacToeStyles.symbol, ticTacToeStyles.symbolO]}>
            O
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={ticTacToeStyles.container}>
      {/* Game status */}
      <View style={ticTacToeStyles.statusContainer}>
        {timeLimit &&
          timeRemaining !== null &&
          isPlayerTurn &&
          active &&
          !winner && (
            <View style={ticTacToeStyles.timerContainer}>
              <Ionicons name="timer-outline" size={20} color="#FFFFFF" />
              <Text style={ticTacToeStyles.timerText}>{timeRemaining}s</Text>
            </View>
          )}

        <Text style={ticTacToeStyles.statusText}>
          {winner
            ? winner === "draw"
              ? "Game Draw!"
              : winner === playerSymbol
              ? "You Win!"
              : "You Lose!"
            : !active
            ? "Game Over"
            : isPlayerTurn
            ? "Your Turn"
            : "Opponent's Turn"}
        </Text>

        <View style={ticTacToeStyles.symbolContainer}>
          <Text style={ticTacToeStyles.symbolLabel}>You are</Text>
          <Text
            style={[
              ticTacToeStyles.playerSymbol,
              playerSymbol === "X"
                ? ticTacToeStyles.symbolX
                : ticTacToeStyles.symbolO,
            ]}
          >
            {playerSymbol}
          </Text>
        </View>
      </View>

      {/* Game board */}
      <View style={[ticTacToeStyles.board, { width: 260, height: 260 }]}>
        <View style={ticTacToeStyles.row}>
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </View>
        <View style={ticTacToeStyles.row}>
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </View>
        <View style={ticTacToeStyles.row}>
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </View>
      </View>

      {/* Winner message */}
      {winner && (
        <View
          style={[
            ticTacToeStyles.winnerBanner,
            winner === playerSymbol
              ? ticTacToeStyles.winBanner
              : winner === "draw"
              ? ticTacToeStyles.drawBanner
              : ticTacToeStyles.lossBanner,
          ]}
        >
          <Text style={ticTacToeStyles.winnerText}>
            {winner === "draw"
              ? "It's a Draw!"
              : winner === playerSymbol
              ? "You Win!"
              : "You Lose!"}
          </Text>
        </View>
      )}

      {/* Not active message */}
      {!active && !winner && (
        <View style={ticTacToeStyles.inactiveBanner}>
          <Text style={ticTacToeStyles.inactiveText}>
            Waiting for connection...
          </Text>
        </View>
      )}
    </View>
  );
};

export default TicTacToeGame;
