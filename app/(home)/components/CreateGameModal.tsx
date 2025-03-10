import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gameModalStyles } from "@/styles/gameModalStyles";
import {
  GameCreationStep,
  Friend,
  Game,
  Player,
  CreateGameModalProps,
} from "@/interface/types";

const CreateGameModal: React.FC<CreateGameModalProps> = ({
  visible,
  onClose,
}) => {
  // Current step in the flow
  const [currentStep, setCurrentStep] =
    useState<GameCreationStep>("chooseGame");

  // Selected game
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Stake amount
  const [stakeAmount, setStakeAmount] = useState<string>("");

  // Counter offer enabled
  const [counterOfferEnabled, setCounterOfferEnabled] =
    useState<boolean>(false);

  // Selected friend
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  // Match date and time
  const [matchInfo, setMatchInfo] = useState({
    date: "05 March, 2025",
    time: "16:30",
  });

  // Players
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "current-user",
      name: "VikingDestroyer",
      avatar: "V",
      imageSource: require("@/assets/images/placeholders/haaland.png"),
      ready: true,
      score: 20,
      level: 9,
      color: ["#80ff80", "#ff8080", "#80ff80", "#ff8080", "#80ff80"], // W L W L W
    },
    {
      id: "opponent",
      name: "Xx_KaiCenat_xX",
      avatar: "K",
      imageSource: require("@/assets/images/placeholders/kai_cenat.png"),
      ready: false,
      score: -20,
      level: 7,
      color: ["#ff8080", "#ff8080", "#80ff80", "#80ff80", "#ff8080"], // L L W W L
    },
  ]);

  // Reset to initial step when opened
  useEffect(() => {
    if (visible) {
      setCurrentStep("chooseGame");
      setSelectedGame(null);
      setStakeAmount("");
      setCounterOfferEnabled(false);
      setSelectedFriend(null);
    }
  }, [visible]);

  // Sample games data
  const games: Game[] = [
    {
      id: "noughts-crosses",
      name: "Noughts & Crosses",
      icon: <Text style={gameModalStyles.gameIcon}>⚔️</Text>,
    },
  ];

  // Sample friends data
  const friends: Friend[] = [
    {
      id: "friend1",
      name: "Xx_KaiCenat_xX",
      avatar: "K",
      imageSource: require("@/assets/images/placeholders/kai_cenat.png"),
      online: true,
      level: 7,
      colors: ["#ff8080", "#ff8080", "#80ff80", "#80ff80", "#ff8080"], // L L W W L
    },
    {
      id: "friend2",
      name: "ProNoobAce",
      avatar: "P",
      imageSource: require("@/assets/images/placeholders/haaland.png"),
      online: true,
      level: 5,
      colors: ["#80ff80", "#80ff80", "#ff8080", "#ff8080", "#80ff80"], // W W L L W
    },
    {
      id: "friend3",
      name: "KingRee",
      avatar: "K",
      online: true,
      level: 3,
      colors: ["#ff8080", "#80ff80", "#ff8080", "#80ff80", "#ff8080"], // L W L W L
    },
  ];

  // Handler for game selection
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentStep("enterStake");
  };

  // Handler for stake submission
  const handleStakeSubmit = () => {
    setCurrentStep("inviteFriend");
  };

  // Handler for friend selection
  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
    setCurrentStep("waitingForAccept");

    // In a real app, you would send an invitation to the friend here
    // For demo purposes, we'll simulate the friend accepting after a delay
    setTimeout(() => {
      setCurrentStep("userNotReady");
    }, 2000);
  };

  // Handler for player ready
  const handlePlayerReady = () => {
    // Update the current player's ready status
    setPlayers(
      players.map((player) =>
        player.id === "current-user" ? { ...player, ready: true } : player
      )
    );

    // For demo purposes, simulate the opponent getting ready
    setTimeout(() => {
      setPlayers(players.map((player) => ({ ...player, ready: true })));
      setCurrentStep("joinGame");

      // Simulate game ending and showing results
      setTimeout(() => {
        // Update scores for post-game view
        setPlayers([
          { ...players[0], score: 20 },
          { ...players[1], score: -20 },
        ]);
        setCurrentStep("postGame");
      }, 2000);
    }, 1500);
  };

  // Handler for play again
  const handlePlayAgain = () => {
    // Reset the flow to the beginning
    setCurrentStep("chooseGame");
    setSelectedGame(null);
    setStakeAmount("");
    setCounterOfferEnabled(false);
    setSelectedFriend(null);
  };

  // Render breadcrumb navigation
  const renderBreadcrumb = () => {
    return (
      <View style={gameModalStyles.breadcrumbContainer}>
        <Image
          source={require("@/assets/images/logo-original.svg")}
          style={gameModalStyles.navLogo}
          resizeMode="contain"
        />
        <Text style={gameModalStyles.navBrand}>RIVALS</Text>
        <Text style={gameModalStyles.navSeparator}>{">"}</Text>
        <Text style={gameModalStyles.navTitle}>Create Game</Text>
      </View>
    );
  };

  // Render Choose Game step
  const renderChooseGameStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.stepTitle}>CHOOSE A GAME</Text>
        </View>
        <View style={gameModalStyles.gamesContainer}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[
                gameModalStyles.gameCard,
                selectedGame?.id === game.id &&
                  gameModalStyles.selectedGameCard,
              ]}
              onPress={() => handleGameSelect(game)}
            >
              {game.icon}
              <Text style={gameModalStyles.gameName}>{game.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => selectedGame && handleGameSelect(selectedGame)}
        >
          <Text style={gameModalStyles.actionButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Enter Stake step
  const renderEnterStakeStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.stakeContainer}>
          <View style={gameModalStyles.stakeInputContainer}>
            <Text style={gameModalStyles.stakeLabel}>Play Cost</Text>
            <TextInput
              style={gameModalStyles.stakeInput}
              value={stakeAmount}
              onChangeText={setStakeAmount}
              placeholder="Amount"
              keyboardType="numeric"
              placeholderTextColor="#8F9BB3"
            />
          </View>

          <View style={gameModalStyles.counterOfferContainer}>
            <Switch
              value={counterOfferEnabled}
              onValueChange={setCounterOfferEnabled}
              trackColor={{ false: "#767577", true: "#4AE9A0" }}
              thumbColor="#f4f3f4"
            />
            <Text style={gameModalStyles.counterOfferText}>Counter Offer</Text>
          </View>

          {counterOfferEnabled && (
            <Text style={gameModalStyles.counterOfferDescription}>
              Your opponent is able to place a counter offer to your request for
              a match. If either party isn't happy with the proposed stake
              amount, they may suggest another amount via the counter button.
              This is permitted twice maximum.
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={handleStakeSubmit}
        >
          <Text style={gameModalStyles.actionButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Invite Friend step
  const renderInviteFriendStep = () => {
    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.friendsContainer}>
          <Text style={gameModalStyles.sectionLabel}>FRIENDS</Text>
          {friends.map((friend) => (
            <View key={friend.id} style={gameModalStyles.friendItem}>
              <View style={gameModalStyles.friendInfo}>
                {friend.imageSource ? (
                  <Image
                    source={friend.imageSource}
                    style={gameModalStyles.friendAvatar}
                  />
                ) : (
                  <View style={gameModalStyles.friendAvatarFallback}>
                    <Text style={gameModalStyles.friendAvatarText}>
                      {friend.avatar}
                    </Text>
                  </View>
                )}
                <View style={gameModalStyles.friendDetails}>
                  <Text style={gameModalStyles.friendName}>{friend.name}</Text>
                  <Text style={gameModalStyles.playerLevel}>
                    Level {friend.level}
                  </Text>
                  {friend.colors && (
                    <View style={gameModalStyles.colorIndicators}>
                      {friend.colors.map((color, index) => (
                        <View
                          key={index}
                          style={[
                            gameModalStyles.colorDot,
                            { backgroundColor: color },
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </View>
                {friend.online && (
                  <View style={gameModalStyles.onlineIndicator} />
                )}
              </View>
              <TouchableOpacity
                style={gameModalStyles.inviteButton}
                onPress={() => handleFriendSelect(friend)}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render Waiting for Accept step
  const renderWaitingForAcceptStep = () => {
    if (!selectedGame || !selectedFriend) return null;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[0].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
            <Text style={gameModalStyles.waitingText}>
              Waiting for player 2 to accept...
            </Text>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            {selectedFriend.imageSource ? (
              <Image
                source={selectedFriend.imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {selectedFriend.avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>
              {selectedFriend.name}
            </Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {selectedFriend.level}
            </Text>
            {selectedFriend.colors && (
              <View style={gameModalStyles.colorIndicators}>
                {selectedFriend.colors.map((color, index) => (
                  <View
                    key={index}
                    style={[
                      gameModalStyles.colorDot,
                      { backgroundColor: color },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => setCurrentStep("userNotReady")} // For demo flow
        >
          <Text style={gameModalStyles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render User Not Ready step
  const renderUserNotReadyStep = () => {
    if (!selectedGame) return null;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[0].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
            <Text style={gameModalStyles.notReadyText}>
              Click Ready to start!
            </Text>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[1].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={handlePlayerReady}
        >
          <Text style={gameModalStyles.actionButtonText}>Ready</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Join Game step
  const renderJoinGameStep = () => {
    if (!selectedGame) return null;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[0].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[0].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={[
                  gameModalStyles.playerImage,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              />
            ) : (
              <View
                style={[
                  gameModalStyles.playerAvatar,
                  players[1].ready && gameModalStyles.playerReady,
                ]}
              >
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[1].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={() => setCurrentStep("postGame")} // For demo flow
        >
          <Text style={gameModalStyles.actionButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Post Game step
  const renderPostGameStep = () => {
    if (!selectedGame) return null;

    return (
      <View style={gameModalStyles.stepContainer}>
        <View style={gameModalStyles.gameHeaderContainer}>
          <Text style={gameModalStyles.gameTitle}>NOUGHTS & CROSSES</Text>
          <Text style={gameModalStyles.gameSymbol}>⚔️</Text>
        </View>
        <View style={gameModalStyles.playersContainer}>
          <View style={gameModalStyles.playerContainer}>
            <Text style={[gameModalStyles.xpText, { color: "#4AE9A0" }]}>
              + {players[0].score}XP
            </Text>
            {players[0].imageSource ? (
              <Image
                source={players[0].imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[0].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[0].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[0].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[0].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>

          <View style={gameModalStyles.vsContainer}>
            <Text style={gameModalStyles.vsText}>VS</Text>
            <Text style={gameModalStyles.matchDate}>{matchInfo.date}</Text>
            <Text style={gameModalStyles.matchTime}>{matchInfo.time}</Text>
          </View>

          <View style={gameModalStyles.playerContainer}>
            <Text style={[gameModalStyles.xpText, { color: "#FF3D71" }]}>
              - {Math.abs(players[1].score ?? 0)}XP
            </Text>
            {players[1].imageSource ? (
              <Image
                source={players[1].imageSource}
                style={gameModalStyles.playerImage}
              />
            ) : (
              <View style={gameModalStyles.playerAvatar}>
                <Text style={gameModalStyles.playerAvatarText}>
                  {players[1].avatar}
                </Text>
              </View>
            )}
            <Text style={gameModalStyles.playerName}>{players[1].name}</Text>
            <Text style={gameModalStyles.playerLevel}>
              Level {players[1].level}
            </Text>
            <View style={gameModalStyles.colorIndicators}>
              {players[1].color?.map((color, index) => (
                <View
                  key={index}
                  style={[gameModalStyles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={gameModalStyles.actionButton}
          onPress={handlePlayAgain}
        >
          <Text style={gameModalStyles.actionButtonText}>REMATCH?</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "chooseGame":
        return renderChooseGameStep();
      case "enterStake":
        return renderEnterStakeStep();
      case "inviteFriend":
        return renderInviteFriendStep();
      case "waitingForAccept":
        return renderWaitingForAcceptStep();
      case "userNotReady":
        return renderUserNotReadyStep();
      case "joinGame":
        return renderJoinGameStep();
      case "postGame":
        return renderPostGameStep();
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={gameModalStyles.modalOverlay}>
        <View style={gameModalStyles.modalContainer}>
          <View style={gameModalStyles.modalHeader}>
            {renderBreadcrumb()}
            <TouchableOpacity
              style={gameModalStyles.closeButton}
              onPress={onClose}
            >
              <Text style={gameModalStyles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={gameModalStyles.modalContent}>
            {renderStepContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateGameModal;
