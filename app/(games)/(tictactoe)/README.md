# Tic-Tac-Toe Game Implementation

## Overview

The Tic-Tac-Toe game is a simple implementation demonstrating the core architectural patterns used for games in the Rivals platform. It includes both local play against an AI opponent and online multiplayer through WebSocket communication.

## Architecture

The game follows a modular architecture with clear separation of concerns:

```
(tictactoe)/
├── hooks/                    # Game-specific hooks
│   ├── useTicTacToeGame.ts   # Online game hook
│   └── useLocalTicTacToeGame.ts # Local game hook
├── services/                 # Game-specific services
│   ├── gameSocket.ts         # WebSocket communication
│   └── aiPlayer.ts           # AI opponent logic
├── styles/                   # Game-specific styles
│   └── ticTacToeStyles.ts    # Styling for the game
├── utils/                    # Game-specific utilities
│   └── gameUtils.ts          # Helper functions (winner check, etc.)
├── TicTacToeGame.tsx         # Main game board component
└── modals/                   # Game-related modals
    ├── JoinGameModal.tsx     # Modal for joining games
    └── components/           # Modal sub-components
        ├── GameOptionsSelector.tsx
        ├── SearchingScreen.tsx
        ├── ReadyScreen.tsx
        ├── GameplayScreen.tsx
        └── ResultsScreen.tsx
```

## Key Components

### 1. Game Hooks

- **useTicTacToeGame**: Handles online multiplayer game state and logic

  - Manages WebSocket communication for gameplay
  - Tracks game state (board, turn, winner)
  - Provides functions for game actions (making moves, forfeit, rematch)

- **useLocalTicTacToeGame**: Handles local play against AI
  - Manages game state for local play
  - Coordinates player moves and AI responses
  - Handles game end conditions and rematch

### 2. Services

- **gameSocket**: Manages WebSocket connections for online play

  - Handles connection establishment and maintenance
  - Provides message sending and receiving
  - Implements automatic reconnection logic

- **aiPlayer**: Provides AI opponent functionality
  - Implements the algorithm for AI move selection
  - Supports different difficulty levels (if applicable)
  - Makes strategic decisions based on current board state

### 3. UI Components

- **TicTacToeGame**: The main game board component

  - Renders the game grid and pieces
  - Handles user interaction with the board
  - Displays game status and turn information

- **JoinGameModal**: The container for the game flow
  - Manages the different stages of gameplay (options, matchmaking, etc.)
  - Coordinates between UI components and game hooks
  - Handles transitions between game stages

### 4. Modal Components

- **GameOptionsSelector**: For selecting game options before starting
- **SearchingScreen**: Displayed while searching for an opponent
- **ReadyScreen**: Shows player profiles and handles readying up
- **GameplayScreen**: Contains the actual gameplay UI
- **ResultsScreen**: Displays game results and rematch options

## Game Flow

1. **Start**: User opens the JoinGameModal
2. **Options**: User selects game options (format, stake, time limit, etc.)
3. **Matchmaking**: For online play, the user waits for an opponent
4. **Ready**: Both players ready up before the game begins
5. **Gameplay**: Players take turns making moves
6. **Results**: Game outcome is displayed with options to rematch or exit

## Patterns Used

1. **Container/Presentational Pattern**:

   - JoinGameModal is a container that manages state and logic
   - Sub-components are presentational and receive props for rendering

2. **Custom Hooks for Logic**:

   - Game logic is separated into hooks that can be reused
   - UI components focus on presentation, not game logic

3. **Service Objects**:

   - External communication is isolated in service objects
   - Game components don't directly interact with WebSockets

4. **State Machine-like Flow**:
   - Game progresses through clear, defined stages
   - Each stage has its own UI and behavior

## Adding Features to Tic-Tac-Toe

When adding features to the Tic-Tac-Toe game:

1. **Game Mechanics**: Modify the game hooks and utils
2. **UI Changes**: Update the TicTacToeGame component and related UI
3. **Online Features**: Extend the gameSocket service and useTicTacToeGame hook
4. **AI Improvements**: Enhance the aiPlayer service

## Testing

Test the game thoroughly across different scenarios:

1. **Local Play**: Test against the AI at different difficulty levels
2. **Online Play**: Test matchmaking, gameplay, and reconnection
3. **Edge Cases**: Test timeouts, forfeits, and other special situations
4. **Responsive Design**: Test on different screen sizes

## Learning from Tic-Tac-Toe

The Tic-Tac-Toe implementation serves as a reference for other games. Key patterns to understand:

1. How game state is managed and updated
2. How online play differs from local play
3. How the UI component hierarchy is structured
4. How WebSocket communication is abstracted

Use this implementation as a template when creating new games for the Rivals platform.
