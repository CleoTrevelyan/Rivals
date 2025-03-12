import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { GamePlayer } from "@/interface/types";
import TicTacToeGame from "../../../(games)/(tictactoe)/TicTacToeGame";

interface GameplayScreenProps {
  currentPlayer: GamePlayer;
  opponent: GamePlayer;
  gameHook: any; // Using any here as it's either onlineGameHook or localGameHook
  isLocalPlay: boolean;
  matchInfo: {
    date: string;
    time: string;
  };
  onAction: (action: string) => void;
  timeLimit?: number;
  isConnected?: boolean;
  onReconnect?: () => void;
}

/**
 * Screen where the actual Tic-Tac-Toe gameplay happens
 */
const GameplayScreen: React.FC<GameplayScreenProps> = ({
  currentPlayer,
  opponent,
  gameHook,
  isLocalPlay,
  matchInfo,
  onAction,
  timeLimit,
  isConnected = true, // Default to true for backward compatibility
  onReconnect,
}) => {
  // Destructure the game hook variables
  const {
    board,
    currentTurn,
    playerSymbol,
    isPlayerTurn,
    winner,
    isActive,
    lastMove,
    opponentName,
    error,
    rematchOffered,
    makeMove,
    forfeitGame,
    requestRematch,
    acceptRematch,
    setPlayerSymbol,
  } = gameHook;

  // Update the player symbol in the game hook when it changes in props
  useEffect(() => {
    if (currentPlayer.symbol && setPlayerSymbol) {
      setPlayerSymbol(currentPlayer.symbol);
      console.log("Setting player symbol in game hook:", currentPlayer.symbol);
    }
  }, [currentPlayer.symbol, setPlayerSymbol]);

  // Debug logging
  useEffect(() => {
    console.log("GameplayScreen state:", {
      playerSymbol,
      currentPlayerSymbol: currentPlayer.symbol,
      opponentSymbol: opponent.symbol,
      isPlayerTurn,
      currentTurn,
      board,
      winner,
      isActive,
      isConnected,
    });
  }, [
    playerSymbol,
    currentPlayer.symbol,
    opponent.symbol,
    isPlayerTurn,
    currentTurn,
    board,
    winner,
    isActive,
    isConnected,
  ]);

  // Handle player move
  const handlePlayerMove = (position: number) => {
    console.log(`Player attempting move at position ${position}`);
    makeMove(position);
  };

  return (
    <View
      style={[
        gameModalStyles.stepContainer,
        { width: "100%", paddingBottom: 20 },
      ]}
    >
      {/* Game title with local indicator */}
      <View style={[gameModalStyles.gameHeaderContainer, { marginBottom: 10 }]}>
        <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
        <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        {isLocalPlay && (
          <View
            style={{
              backgroundColor: "#4AE9A0",
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              LOCAL
            </Text>
          </View>
        )}
      </View>

      {/* Players information - more compact layout */}
      <View
        style={[
          gameModalStyles.playersContainer,
          { width: "95%", maxWidth: 480 },
        ]}
      >
        {/* Current player */}
        <View style={[gameModalStyles.playerInfo, { flex: 1, maxWidth: 100 }]}>
          <View
            style={[
              gameModalStyles.playerTurnIndicator,
              isPlayerTurn && gameModalStyles.activePlayerIndicator,
            ]}
          >
            <Text style={gameModalStyles.playerTurnText}>
              {isPlayerTurn ? "YOUR TURN" : ""}
            </Text>
          </View>
          {currentPlayer.imageSource ? (
            <Image
              source={currentPlayer.imageSource}
              style={[
                gameModalStyles.playerAvatar,
                isPlayerTurn && gameModalStyles.activePlayerAvatar,
              ]}
            />
          ) : (
            <View
              style={[
                gameModalStyles.playerAvatarFallback,
                isPlayerTurn && gameModalStyles.activePlayerAvatar,
              ]}
            >
              <Text style={gameModalStyles.playerAvatarText}>
                {currentPlayer.avatar}
              </Text>
            </View>
          )}
          <Text
            style={gameModalStyles.playerName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentPlayer.name}
          </Text>
          <Text style={gameModalStyles.playerSymbolText}>
            {currentPlayer.symbol}
          </Text>
        </View>

        {/* VS */}
        <View style={gameModalStyles.vsContainer}>
          <Text style={gameModalStyles.vsText}>VS</Text>
          <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
          <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
        </View>

        {/* Opponent */}
        <View style={[gameModalStyles.playerInfo, { flex: 1, maxWidth: 100 }]}>
          <View
            style={[
              gameModalStyles.playerTurnIndicator,
              !isPlayerTurn && gameModalStyles.activePlayerIndicator,
            ]}
          >
            <Text style={gameModalStyles.playerTurnText}>
              {!isPlayerTurn ? "THEIR TURN" : ""}
            </Text>
          </View>
          {opponent.imageSource ? (
            <Image
              source={opponent.imageSource}
              style={[
                gameModalStyles.playerAvatar,
                !isPlayerTurn && gameModalStyles.activePlayerAvatar,
              ]}
            />
          ) : (
            <View
              style={[
                gameModalStyles.playerAvatarFallback,
                !isPlayerTurn && gameModalStyles.activePlayerAvatar,
              ]}
            >
              <Text style={gameModalStyles.playerAvatarText}>
                {opponent.avatar}
              </Text>
            </View>
          )}
          <Text
            style={gameModalStyles.playerName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {isLocalPlay ? "AI Opponent" : opponentName || opponent.name}
          </Text>
          <Text style={gameModalStyles.playerSymbolText}>
            {opponent.symbol}
          </Text>
        </View>
      </View>

      {/* Connection status indicator for online play */}
      {!isLocalPlay && (
        <View style={{ marginVertical: 5 }}>
          <Text
            style={{ color: isConnected ? "#4AE9A0" : "#ff8080", fontSize: 12 }}
          >
            {isConnected ? "Connected" : "Reconnecting..."}
          </Text>
        </View>
      )}

      {/* Game board */}
      <View
        style={[gameModalStyles.gameboardContainer, { marginVertical: 10 }]}
      >
        <TicTacToeGame
          playerSymbol={currentPlayer.symbol as "X" | "O"}
          gameState={board}
          currentTurn={currentTurn}
          isPlayerTurn={isPlayerTurn}
          onMove={handlePlayerMove}
          active={isActive && isConnected}
          timeLimit={timeLimit}
          winner={winner}
        />
      </View>

      {/* Status messages */}
      {!isConnected && !isLocalPlay && (
        <View style={[gameModalStyles.errorBanner, { width: "70%" }]}>
          <Text style={gameModalStyles.errorText}>
            Reconnecting to server...
          </Text>
          {onReconnect && (
            <TouchableOpacity
              style={{
                padding: 6,
                backgroundColor: "#2E3A59",
                borderRadius: 4,
                marginTop: 5,
              }}
              onPress={onReconnect}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                Reconnect Manually
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {error && (
        <View style={[gameModalStyles.errorBanner, { width: "70%" }]}>
          <Text style={gameModalStyles.errorText}>{error}</Text>
        </View>
      )}

      {/* Game actions - more compact */}
      <View style={[gameModalStyles.gameActionsContainer, { marginTop: 5 }]}>
        {winner ? (
          // Game over actions
          <View style={[gameModalStyles.gameOverActions, { width: "70%" }]}>
            <TouchableOpacity
              style={[
                gameModalStyles.actionButton,
                gameModalStyles.rematchButton,
                { paddingVertical: 8, minWidth: 120 },
              ]}
              onPress={requestRematch}
            >
              <Text
                style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}
              >
                {rematchOffered ? "Accept Rematch" : "Rematch"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                gameModalStyles.actionButton,
                gameModalStyles.exitButton,
                { paddingVertical: 8, minWidth: 120 },
              ]}
              onPress={() =>
                isLocalPlay ? onAction("exitGame") : onAction("endGame")
              }
            >
              <Text
                style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}
              >
                Exit
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // In-game actions
          <TouchableOpacity
            style={[
              gameModalStyles.actionButton,
              gameModalStyles.forfeitButton,
              { paddingVertical: 8, width: "40%", minWidth: 120 },
            ]}
            onPress={forfeitGame}
            disabled={!isConnected && !isLocalPlay}
          >
            <Text style={[gameModalStyles.actionButtonText, { fontSize: 14 }]}>
              Forfeit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Rematch offer notification - more compact */}
      {rematchOffered && (
        <View
          style={[
            gameModalStyles.rematchNotification,
            { width: "70%", padding: 10, marginBottom: 10 },
          ]}
        >
          <Text style={[gameModalStyles.rematchText, { fontSize: 14 }]}>
            {isLocalPlay ? "AI Opponent" : "Opponent"} has requested a rematch!
          </Text>
          <View style={gameModalStyles.rematchButtonsContainer}>
            <TouchableOpacity
              style={[
                gameModalStyles.actionButton,
                gameModalStyles.acceptButton,
                { paddingVertical: 6 },
              ]}
              onPress={acceptRematch}
            >
              <Text
                style={[gameModalStyles.actionButtonText, { fontSize: 12 }]}
              >
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                gameModalStyles.actionButton,
                gameModalStyles.declineButton,
                { paddingVertical: 6 },
              ]}
              onPress={() =>
                isLocalPlay ? onAction("exitGame") : onAction("endGame")
              }
            >
              <Text
                style={[gameModalStyles.actionButtonText, { fontSize: 12 }]}
              >
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default GameplayScreen;
