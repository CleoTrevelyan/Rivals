import { GameState } from "./slices/gameSlice";
import { Action } from "redux";

// Extend the Action interface from redux
declare module "redux" {
  interface Action {
    type: string;
    payload?: any;
  }
}

// Define the structure of your Redux state
declare interface ReduxState {
  game: GameState;
  // Add other state slices as they're created
}
