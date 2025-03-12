# Rivals Game Platform Frontend

## Overview

Welcome to Rivals, a competitive gaming platform that allows users to stake and wager on games. The platform supports various games with a modular, reusable architecture designed for easy extension.

## Frontend Architecture
- **Language**: TypeScript
- **Framework**: Expo/React Native (for easier transition to native mobile apps)
- **Routing**: Expo Router (directory-based routing)

## Project Structure

```
MVP/
├── .expo/               # Expo configuration
├── .vscode/             # VS Code configuration
├── android/             # Android specific files
├── app/                 # Main application code with route-based organization
│   ├── (auth)/          # Authentication screens and components
│   ├── (home)/          # Main application screens after login
│   ├── (teams)/         # Team management features
│   ├── (games)/         # Game container directory
│   │   ├── (tictactoe)/ # Tic-Tac-Toe game implementation
│   │   │   ├── hooks/   # Game-specific hooks
│   │   │   ├── services/# Game-specific services
│   │   │   ├── styles/  # Game-specific styles
│   │   │   └── utils/   # Game-specific utilities
│   │   └── [other game folders follow the same pattern]
│   └── components/      # Shared components across the app
├── assets/              # Static assets like images, fonts, etc.
├── interface/           # TypeScript interfaces and type definitions
├── node_modules/        # Dependencies
├── styles/              # Global styles
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── ... other config files
```

## Feature Organization

Each feature folder (and game folder) follows a consistent pattern:

- **components/**: UI building blocks specific to that feature
- **hooks/**: Custom React hooks for state management and business logic
- **services/**: External integrations and API interactions for backend connectivity
- **styles/**: Styling specific to the feature
- **utils/**: Helper functions and utilities

Not all folders need all of these directories - include only what's needed for the specific feature.

## Routing Structure

We use Expo Router for navigation:

- Each `.tsx` file at the root of a route directory represents a screen/page
- `index.tsx` serves as the home/default route for that directory
- Special files like `_layout.tsx` define layout wrappers for the routes within that directory

## Adding a New Game

To add a new game to the platform, follow these steps:

1. **Create a new game directory** under `app/(games)/`:

   ```
   app/
   └── (games)/
       └── (new_game_name)/
   ```

2. **Follow the established folder structure** (based on the TicTacToe example):

   ```
   (new_game_name)/
   ├── hooks/            # Game-specific hooks
   │   ├── useGameLogic.ts
   │   └── useLocalGame.ts (if applicable)
   ├── services/         # Game-specific services
   │   ├── gameSocket.ts (for online play)
   │   ├── aiPlayer.ts (if applicable for local play)
   │   └── other services...
   ├── styles/           # Game-specific styles
   │   └── gameStyles.ts
   ├── utils/            # Game-specific utilities
   │   └── gameUtils.ts
   ├── components/       # UI components specific to your game
   │   ├── modals/
   │   │   ├── JoinGameModal.tsx
   │   │   └── ...
   │   └── GameBoard.tsx
   └── README.md         # Document game-specific details
   ```

3. **Implement the necessary hooks, services, and components**:

   - **Game Hooks**: For game state management
   - **Game Services**: For WebSocket communication and/or AI opponent
   - **Game Components**: UI for the game board, controls, and modals

4. **Follow the established patterns**:

   - Separate UI from game logic
   - Use hooks for state management
   - Use services for external communication
   - Create responsive UI that works on both mobile and desktop

5. **Connect to the main app**:
   - Update navigation as needed
   - Add game to game selection menu (if applicable)

## WebSocket Communication

Games that support online multiplayer should use the WebSocket service pattern:

1. Create a `gameSocket.ts` service based on the TicTacToe example
2. Define message types for game-specific actions
3. Implement handlers for all message types
4. Use the WebSocket service in your game hooks

## Game Requirements

All games should support:

1. **Local play** against AI (when applicable)
2. **Online multiplayer** with matchmaking
3. **Responsive UI** that works on mobile and desktop
4. **Game state persistence** using the appropriate hooks and services

## Design Patterns

The codebase follows these design patterns:

1. **Custom Hooks**: For encapsulating and reusing logic
2. **Container/Presentational Components**: Separate logic from presentation
3. **Service Objects**: For external communication and APIs
4. **Responsive Design**: Using relative sizing and media queries

## Testing Your Game

Before submitting a new game:

1. Test on multiple screen sizes (mobile, tablet, desktop)
2. Test both local and online play
3. Test error handling (disconnects, invalid moves, etc.)
4. Ensure all UI elements are accessible and responsive

## Further Reading

For more details on specific components and implementation patterns, refer to:

- `app/(games)/(tictactoe)/README.md` - Detailed documentation of the TicTacToe game implementation
- `app/(auth)/README.md` - Authentication flow and components
- `app/(home)/README.md` - Main application screens and navigation

## Getting Started

To start working on a new game:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npx expo start` to start the development server
4. Begin implementing your game following the structure outlined above

## Questions?

If you have any questions about the architecture or how to implement a specific feature, please contact the lead developer.
