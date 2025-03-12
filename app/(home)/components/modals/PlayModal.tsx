import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gameModalStyles } from "@/styles/gameModalStyles";
import { PlayModalProps } from "@/interface/types";

const PlayModal: React.FC<PlayModalProps> = ({
  visible,
  onClose,
  onCreateGame,
  onJoinGame,
  onMatchmaking,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={gameModalStyles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={gameModalStyles.playModalContainer}>
              <View style={gameModalStyles.modalHeader}>
                <View style={gameModalStyles.breadcrumbContainer}>
                  <Image
                    source={require("@/assets/images/logo-original.svg")}
                    style={gameModalStyles.navLogo}
                    resizeMode="contain"
                  />
                  <Text style={gameModalStyles.navBrand}>RIVALS</Text>
                  <Text style={gameModalStyles.navSeparator}>{" > "}</Text>
                  <Text style={gameModalStyles.navTitle}>Play</Text>
                </View>

                <TouchableOpacity
                  style={gameModalStyles.closeButton}
                  onPress={onClose}
                >
                  <Text style={gameModalStyles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              <View style={gameModalStyles.modalContent}>
                <Text style={gameModalStyles.chooseGameTitle}>FIND A GAME</Text>

                <View style={gameModalStyles.playOptionsContainer}>
                  <TouchableOpacity
                    style={gameModalStyles.playOption}
                    onPress={() => {
                      onClose();
                      onMatchmaking();
                    }}
                  >
                    <Text style={gameModalStyles.playOptionText}>
                      Matchmaking
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={gameModalStyles.playOption}
                    onPress={() => {
                      onClose();
                      onCreateGame();
                    }}
                  >
                    <Text style={gameModalStyles.playOptionText}>
                      Create Game
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={gameModalStyles.playOption}
                    onPress={() => {
                      onClose();
                      onJoinGame();
                    }}
                  >
                    <Text style={gameModalStyles.playOptionText}>
                      Join Game
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlayModal;
