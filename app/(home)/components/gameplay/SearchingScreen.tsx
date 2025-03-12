import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { gameModalStyles } from "@/styles/gameModalStyles";

interface SearchingScreenProps {
  onCancel: () => void;
  onPlayLocal: () => void;
  isLoading: boolean;
}

/**
 * Screen displayed while searching for an online opponent
 */
const SearchingScreen: React.FC<SearchingScreenProps> = ({
  onCancel,
  onPlayLocal,
  isLoading,
}) => {
  return (
    <View style={gameModalStyles.stepContainer}>
      <View style={gameModalStyles.gameHeaderContainer}>
        <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
        <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
      </View>

      <View style={gameModalStyles.searchingContainer}>
        <Text style={gameModalStyles.searchingText}>
          LOOKING FOR AN OPPONENT...
        </Text>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#4AE9A0"
            style={{ marginVertical: 20 }}
          />
        )}

        <TouchableOpacity
          style={gameModalStyles.cancelButton}
          onPress={onCancel}
        >
          <Text style={gameModalStyles.cancelButtonText}>Cancel Search</Text>
        </TouchableOpacity>

        {/* Add local play option */}
        <TouchableOpacity
          style={[
            gameModalStyles.actionButton,
            { marginTop: 20, backgroundColor: "#4AE9A0" },
          ]}
          onPress={onPlayLocal}
        >
          <Text style={gameModalStyles.actionButtonText}>
            Play Locally (vs AI)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Debug functionality in development mode */}
      {__DEV__ && (
        <TouchableOpacity
          style={[gameModalStyles.actionButton, { marginTop: 10 }]}
          onPress={() => {
            // Simulate finding an opponent - should be handled by parent
            onCancel();
            // In production, remove this
          }}
        >
          <Text style={gameModalStyles.actionButtonText}>
            DEV: Skip to Ready
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchingScreen;
