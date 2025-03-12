// store/index.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gameReducer from "./slices/gameSlice";
import authReducer from "./slices/authSlice";
import { createSocketMiddleware } from "./middleware/gameSocketMiddleware";

// Configure persistence
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // Blacklist any state you don't want to persist
  blacklist: ["message", "isLoading"],
};

const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a single socket middleware instance
const socketMiddleware = createSocketMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  // This middleware configuration is needed for Redux Persist to work properly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these fields from specific state paths
        ignoredPaths: [
          "game.currentPlayer.imageSource",
          "game.opponent.imageSource",
        ],
      },
    }).concat(socketMiddleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
