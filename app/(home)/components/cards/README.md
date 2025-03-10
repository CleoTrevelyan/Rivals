# Card Components for Rivals App

This document outlines the new card component structure to make your app more modular and maintainable.

## Project Structure

New card components are in the following directory:

```
/components/cards/
  ├── LiveMatchCard.js
  ├── MatchCard.js
  ├── EventCard.js
  ├── CompetitionCard.js
  └── GameButton.js
```

## Component Overview

### LiveMatchCard

Displays live match information in a horizontal scrollable format.

**Props:**

- `match`: Object containing match data
- `onPress`: Function to handle card press

### MatchCard

A versatile card for displaying both live and upcoming matches.

**Props:**

- `match`: Object containing match data
- `onPress`: Function to handle card press
- `width`: Optional width value for responsive layouts

### EventCard

Displays featured events with different UI elements based on the event type.

**Props:**

- `event`: Object containing event data
- `onPress`: Function to handle card press

### CompetitionCard

Displays competition information with icon and count badge.

**Props:**

- `competition`: Object containing competition data
- `onPress`: Function to handle card press

### GameButton

A stylized button for game selection with optional "functional" highlighting.

**Props:**

- `game`: Object containing game data
- `onPress`: Function to handle button press

## Data Structure Examples

### Live Match Object

```javascript
{
  id: "match1",
  game: "Dota 2",
  type: "The International 2023",
  teams: [
    { name: "Team Spirit", score: 1 },
    { name: "Virtus Pro", score: 2 },
  ],
  viewers: 1502,
  isLive: true
}
```

### Event Object

```javascript
{
  id: "event1",
  title: "Fortnite Showdown",
  description: "Head to head in an epic Fortnite battle. Who will claim victory?",
  buttonText: "Stake Now",
  buttonType: "stake"
}
// OR
{
  id: "event2",
  title: "NBA 2K League",
  description: "Bucks Gaming vs 76ers GC",
  score: "95 - 103",
  time: "Q4 2:07"
}
```

### Competition Object

```javascript
{
  id: "comp1",
  name: "DOTA",
  icon: "futbol",
  count: 26
}
```

### Game Object

```javascript
{
  id: "tictactoe",
  icon: "times",
  title: "Noughts & Crosses",
  functional: true
}
```

## Implementation

1. Create the card component files in your project structure
2. Import the components in your HomeScreen
3. Replace the inline card rendering with the new components
4. Pass the appropriate data and handlers to each component

## Styling Customization

Each component has its own StyleSheet, making it easy to customize styles for different contexts. You can:

- Modify the default styles in each component
- Pass style props for specific instances
- Create theme variants for different card states (e.g., featured, highlighted)

## Benefits

- **Reusability**: Use the same card components across different screens
- **Maintainability**: Isolated styling and logic for each card type
- **Scalability**: Easier to add new features or modify existing ones
- **Performance**: Only re-render components when their specific data changes
- **Consistency**: Standardized look and feel across the app
