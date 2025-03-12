# Adding New Games to Rivals Platform

This README provides a comprehensive guide for adding new games to the Rivals platform. Follow this architecture to ensure consistency with existing games and smooth integration with the platform's matchmaking, wagering, and multiplayer features.

## Game Architecture Overview

Each game in the Rivals platform follows a modular architecture with clear separation of concerns:

```
(your_game_name)/
├── hooks/                  # Game-specific hooks for state management
├── services/               # External communication and AI logic
├── styles/                 # Game-specific styling
├── utils/                  # Helper functions
├── components/             # UI components specific to the game
│   └── modals/             # Modal components for game flow
└── README.md               # Game documentation
```

## Implementation Steps

### 1. Create Directory Structure

Set up your game directory following the pattern used by TicTacToe:

```
app/
└── (games)/
    └── (your_game_name)/
        ├── hooks/
        ├── services/
        ├── styles/
        ├── utils/
        ├── components/
        │   └── modals/
        └── README.md
```

### 2. Create Game Hooks

Create hooks for game logic and state management:

- `useYourGameName.ts` - For online multiplayer gameplay
- `useLocalYourGameName.ts` - For local play against AI (if applicable)

These hooks should handle:

- Game state (board, turns, scores, etc.)
- Player moves and validation
- Win/loss conditions
- Integration with WebSocket for online play

### 3. Implement Services

Create service files for external interactions:

- `gameSocket.ts` - For WebSocket communication in online play
- `aiPlayer.ts` - For AI opponent logic in local play

These services should be independent of UI components and focus on:

- Communication protocols
- Server message handling
- AI decision-making algorithms

### 4. Create Utility Functions

Implement utility functions in `utils/gameUtils.ts` for:

- Checking game outcomes
- Validating moves
- Formatting data
- Other game-specific calculations

### 5. Define Styles

Create a styles file in `styles/yourGameStyles.ts` with:

- Game board styling
- Game piece styling
- Animation definitions
- Responsive design considerations

### 6. Implement Core Components

Create the main game components:

- Main game board component (`YourGameName.tsx`)
- Game joining modal (`JoinGameModal.tsx`)

Break down the game flow into separate component screens:

- Options selection
- Matchmaking
- Ready-up screen
- Gameplay screen
- Results screen

### 7. Document Your Game

Create a README.md in your game directory that explains:

- Game rules and mechanics
- Implementation details
- Special considerations
- Testing requirements

## Integration with Rivals Platform

Ensure your game integrates with these platform features:

- **Matchmaking system** - Use the same message formats as TicTacToe
- **WebSocket communication** - Follow established message patterns
- **User authentication** - Retrieve player information from global state
- **Responsive design** - Work across mobile and desktop views
- **Animations** - Use consistent animation patterns

## Code Examples

### Game Hook Example

```typescript
// hooks/useYourGameName.ts
import { useState, useEffect } from "react";

export const useYourGameName = ({ socket, gameID, playerID, onGameEnd }) => {
  const [gameState, setGameState] = useState(initialState);

  // Handle socket messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle different message types
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket]);

  // Implement game actions
  const makeMove = (move) => {
    // Validate and process move
    // Update local state
    // Send move to server
  };

  return {
    // Expose game state and actions
    gameState,
    makeMove,
    // Other game functions
  };
};
```

### Game Modal Structure Example

```typescript
// modals/JoinGameModal.tsx
import React, { useState } from "react";
import { Modal, View } from "react-native";

const JoinGameModal = ({ visible, onClose }) => {
  const [stage, setStage] = useState("join"); // join, searching, ready, playing, results

  const renderContent = () => {
    switch (stage) {
      case "join":
        return <GameOptionsSelector onContinue={() => setStage("searching")} />;
      case "searching":
        return <SearchingScreen onCancel={() => setStage("join")} />;
      // Other stages...
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>{renderContent()}</View>
    </Modal>
  );
};
```

## Testing Checklist

Before submitting your game, test these aspects:

- [ ] **Local gameplay** works correctly
- [ ] **Online multiplayer** functions as expected
- [ ] **Matchmaking** connects players properly
- [ ] **Game state** is properly synchronized between players
- [ ] **Disconnection handling** works gracefully
- [ ] **AI opponent** (if applicable) provides appropriate challenge
- [ ] **UI is responsive** across different screen sizes
- [ ] **Animations** are smooth and consistent
- [ ] **Error handling** is robust

## Learning from Existing Games

The TicTacToe implementation serves as the reference example. Study:

- How game state is managed in `useTicTacToeGame.ts`
- How the AI opponent works in `aiPlayer.ts`
- How the game flow is structured in `JoinGameModal.tsx`
- How responsive design is implemented in the UI components

## Help and Support

If you have questions about implementing your game, refer to:

- The TicTacToe game code for examples
- The platform documentation
- The development team for specific architectural questions

---

Happy game development! By following these guidelines, your game will integrate seamlessly with the Rivals platform and provide a consistent experience for users.
