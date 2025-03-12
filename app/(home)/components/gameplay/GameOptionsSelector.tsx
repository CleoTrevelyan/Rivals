import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { gameModalStyles } from "@/styles/componentStyles/gameModalStyles";

interface GameOptionsProps {
  options: {
    format: string;
    stake: string;
    timeLimit: string;
    firstMove: string;
  };
  onOptionChange: (option: string, value: string) => void;
  onContinue: () => void;
}

/**
 * Component for selecting game options before starting a match
 */
const GameOptionsSelector: React.FC<GameOptionsProps> = ({
  options,
  onOptionChange,
  onContinue,
}) => {
  return (
    <View style={gameModalStyles.stepContainer}>
      <View style={gameModalStyles.gameHeaderContainer}>
        <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
        <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
      </View>

      <View style={gameModalStyles.optionsGrid}>
        {/* Format option */}
        <View style={gameModalStyles.optionRow}>
          <Text style={gameModalStyles.optionLabel}>FORMAT</Text>
          <View style={gameModalStyles.optionButtonContainer}>
            {["PUBLIC", "PRIVATE", "LOCAL"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  gameModalStyles.optionButton,
                  options.format === option &&
                    gameModalStyles.selectedOptionButton,
                ]}
                onPress={() => onOptionChange("format", option)}
              >
                <Text
                  style={
                    options.format === option
                      ? gameModalStyles.selectedOptionText
                      : gameModalStyles.optionText
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stake option */}
        <View style={gameModalStyles.optionRow}>
          <Text style={gameModalStyles.optionLabel}>STAKE</Text>
          <View style={gameModalStyles.optionButtonContainer}>
            <TouchableOpacity
              style={[
                gameModalStyles.optionButton,
                options.stake === "£0.00" &&
                  gameModalStyles.selectedOptionButton,
              ]}
              onPress={() => onOptionChange("stake", "£0.00")}
            >
              <Text
                style={
                  options.stake === "£0.00"
                    ? gameModalStyles.selectedOptionText
                    : gameModalStyles.optionText
                }
              >
                £0.00
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time limit option */}
        <View style={gameModalStyles.optionRow}>
          <Text style={gameModalStyles.optionLabel}>TIME LIMIT</Text>
          <View style={gameModalStyles.optionButtonContainer}>
            {["5 MIN", "UNLIMITED"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  gameModalStyles.optionButton,
                  options.timeLimit === option &&
                    gameModalStyles.selectedOptionButton,
                ]}
                onPress={() => onOptionChange("timeLimit", option)}
              >
                <Text
                  style={
                    options.timeLimit === option
                      ? gameModalStyles.selectedOptionText
                      : gameModalStyles.optionText
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* First move option */}
        <View style={gameModalStyles.optionRow}>
          <Text style={gameModalStyles.optionLabel}>FIRST MOVE</Text>
          <View style={gameModalStyles.optionButtonContainer}>
            {["PLAYER", "RANDOM"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  gameModalStyles.optionButton,
                  options.firstMove === option &&
                    gameModalStyles.selectedOptionButton,
                ]}
                onPress={() => onOptionChange("firstMove", option)}
              >
                <Text
                  style={
                    options.firstMove === option
                      ? gameModalStyles.selectedOptionText
                      : gameModalStyles.optionText
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={gameModalStyles.actionButton}
        onPress={onContinue}
      >
        <Text style={gameModalStyles.actionButtonText}>
          {options.format === "LOCAL" ? "Play vs AI" : "Continue"}
        </Text>
      </TouchableOpacity>

      {/* If in LOCAL mode, show explanation */}
      {options.format === "LOCAL" && (
        <Text
          style={{
            color: "#8F9BB3",
            fontSize: 12,
            textAlign: "center",
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          Local play lets you play against an AI opponent without requiring
          server connection.
        </Text>
      )}
    </View>
  );
};

export default GameOptionsSelector;
