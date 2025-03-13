// store/middleware/socketMiddleware.ts

import { Middleware, Action } from "redux";
import { RivalsServer } from "@/components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setConnected,
  incrementConnectionAttempts,
  resetConnectionAttempts,
  setMessage,
  setGameStage,
  updateOpponent,
  setPlayerReady,
  setOpponentReady,
  setGameID,
  setPlayerSymbol,
  updateBoard,
  setCurrentTurn,
  setWinner,
  setRematchOffered,
  resetGame,
  setLoading,
} from "../slices/gameSlice";

import { loginSuccess, loginFailure, logout } from "../slices/authSlice";

// Define action types for socket operations
export const SOCKET_CONNECT = "socket/connect";
export const SOCKET_DISCONNECT = "socket/disconnect";
export const SOCKET_SEND = "socket/send";

// Game actions
export const SOCKET_START_MATCHMAKING = "socket/startMatchmaking";
export const SOCKET_CANCEL_MATCHMAKING = "socket/cancelMatchmaking";
export const SOCKET_PLAYER_READY = "socket/playerReady";
export const SOCKET_MAKE_MOVE = "socket/makeMove";
export const SOCKET_FORFEIT_GAME = "socket/forfeitGame";
export const SOCKET_REQUEST_REMATCH = "socket/requestRematch";

// Auth actions
export const SOCKET_AUTH_TOKEN_VERIFICATION = "socket/authTokenVerification";
export const SOCKET_LOGIN = "socket/login";
export const SOCKET_REGISTER = "socket/register";

// Type definitions for socket actions
interface SocketConnectAction {
  type: typeof SOCKET_CONNECT;
}

interface SocketDisconnectAction {
  type: typeof SOCKET_DISCONNECT;
}

interface SocketSendAction {
  type: typeof SOCKET_SEND;
  payload: any;
}

// Game action interfaces
interface SocketStartMatchmakingAction {
  type: typeof SOCKET_START_MATCHMAKING;
  payload?: string;
}

interface SocketCancelMatchmakingAction {
  type: typeof SOCKET_CANCEL_MATCHMAKING;
}

interface SocketPlayerReadyAction {
  type: typeof SOCKET_PLAYER_READY;
}

interface SocketMakeMoveAction {
  type: typeof SOCKET_MAKE_MOVE;
  payload: {
    position: number;
    symbol: "X" | "O";
  };
}

interface SocketForfeitGameAction {
  type: typeof SOCKET_FORFEIT_GAME;
}

interface SocketRequestRematchAction {
  type: typeof SOCKET_REQUEST_REMATCH;
  payload?: boolean;
}

// Auth action interfaces
interface SocketAuthTokenVerificationAction {
  type: typeof SOCKET_AUTH_TOKEN_VERIFICATION;
  payload: string;
}

interface SocketLoginAction {
  type: typeof SOCKET_LOGIN;
  payload: {
    username: string;
    password: string;
  };
}

interface SocketRegisterAction {
  type: typeof SOCKET_REGISTER;
  payload: {
    username: string;
    email: string;
    password: string;
  };
}

// Union type for all socket actions
export type SocketAction =
  | SocketConnectAction
  | SocketDisconnectAction
  | SocketSendAction
  | SocketStartMatchmakingAction
  | SocketCancelMatchmakingAction
  | SocketPlayerReadyAction
  | SocketMakeMoveAction
  | SocketForfeitGameAction
  | SocketRequestRematchAction
  | SocketAuthTokenVerificationAction
  | SocketLoginAction
  | SocketRegisterAction;

// Create the socket middleware
export const createSocketMiddleware = (): Middleware => {
  let socket: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  let pingInterval: NodeJS.Timeout | null = null;
  let isConnecting = false;

  return (store) => (next) => (action: unknown) => {
    console.log("Middleware received action:", action); // Add this line

    // Handle regular Redux actions normally
    if (
      typeof action !== "object" ||
      !action ||
      !("type" in action) ||
      typeof action.type !== "string" ||
      !action.type.startsWith("socket/")
    ) {
      return next(action);
    }

    // Handle socket actions
    const socketAction = action as SocketAction;
    const { dispatch, getState } = store;
    const state = getState();

    switch (socketAction.type) {
      case SOCKET_CONNECT:
        console.log("Handling SOCKET_CONNECT action"); // Add this line
        // Skip if already connecting
        if (isConnecting) {
          return next(action);
        }

        // Clean up existing connections
        if (socket) {
          socket.close();
          socket = null;
        }

        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }

        if (pingInterval) {
          clearInterval(pingInterval);
          pingInterval = null;
        }

        // Create new WebSocket connection
        try {
          isConnecting = true;
          dispatch(setMessage("Connecting to server..."));
          socket = new WebSocket(RivalsServer);

          socket.onopen = async () => {
            console.log("Connected to WebSocket server");
            isConnecting = false;
            dispatch(setConnected(true));
            dispatch(resetConnectionAttempts());
            dispatch(setMessage(""));

            // Send auth token if available
            try {
              const authToken = await AsyncStorage.getItem("authToken");
              if (authToken && socket) {
                socket.send(
                  JSON.stringify({
                    type: "authTokenVerification",
                    authToken: authToken,
                  })
                );
              }
            } catch (error) {
              console.error("Error retrieving auth token:", error);
            }

            // Set up ping interval to keep connection alive
            pingInterval = setInterval(() => {
              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "ping" }));
              }
            }, 15000);
          };

          socket.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log("Received WebSocket message:", data.type);

              // Handle different message types
              switch (data.type) {
                // Authentication responses
                // Handle authentication responses
                case "authSuccess":
                case "loginSuccess":
                case "registerSuccess":
                  if (data.token || data.authToken) {
                    // Get the token (handle different field names from server)
                    const token = data.token || data.authToken;

                    // Store token
                    AsyncStorage.setItem("authToken", token);

                    // Store player ID and username if provided
                    if (data.userID || (data.user && data.user.id)) {
                      const userId = data.userID || data.user.id;
                      AsyncStorage.setItem("playerID", userId);
                    }

                    if (data.username || (data.user && data.user.username)) {
                      const username = data.username || data.user.username;
                      AsyncStorage.setItem("username", username);
                    }
                    //debug
                    console.log("Dispatching login success with data:", {
                      token: data.token || data.authToken,
                      user: data.user || {
                        id: data.userID,
                        username: data.username,
                      },
                    });
                    // Dispatch success action with user data
                    dispatch(
                      loginSuccess({
                        token: token,
                        user: data.user || {
                          id: data.userID,
                          username: data.username,
                        },
                      })
                    );
                  }
                  break;

                case "authFailure":
                case "loginFailed":
                case "registerFailed":
                  dispatch(
                    loginFailure(data.message || "Authentication failed")
                  );
                  break;

                // Game-related responses
                case "matchFound":
                  dispatch(
                    updateOpponent({
                      name: data.opponentName || "Opponent",
                      id: data.opponentId || "opponent-id",
                    })
                  );
                  dispatch(setGameStage("ready"));
                  dispatch(setLoading(false));
                  break;

                case "searchingForMatch":
                  dispatch(setGameStage("searching"));
                  dispatch(setLoading(true));
                  break;

                case "enteringMatch":
                  // Update opponent ready status
                  dispatch(setOpponentReady(true));

                  // Update player symbol
                  if (data.playerSymbol) {
                    dispatch(setPlayerSymbol(data.playerSymbol));
                  }

                  // Set player ready
                  dispatch(setPlayerReady(true));

                  // Set game ID
                  if (data.gameID) {
                    dispatch(setGameID(data.gameID));
                  }

                  // Start the game
                  dispatch(setGameStage("playing"));
                  break;

                case "waitingForOpponent":
                  dispatch(setOpponentReady(false));
                  break;

                case "gameUpdate":
                  // Will be handled by other cases
                  break;

                case "gameMove":
                  // Handle move received from opponent
                  if (data.position !== undefined && data.symbol) {
                    const currentBoard = state.game?.board
                      ? [...state.game.board]
                      : Array(9).fill(null);
                    currentBoard[data.position] = data.symbol;
                    dispatch(updateBoard(currentBoard));

                    // Toggle turn
                    const currentTurn = state.game?.currentTurn || "X";
                    dispatch(setCurrentTurn(currentTurn === "X" ? "O" : "X"));
                  }
                  break;

                case "gameStarted":
                  // Update initial game state if provided
                  if (data.initialState && data.initialState.board) {
                    dispatch(updateBoard(data.initialState.board));
                  }

                  if (data.currentTurn) {
                    dispatch(setCurrentTurn(data.currentTurn));
                  }
                  break;

                case "gameOver":
                  dispatch(setWinner(data.winner));
                  break;

                case "playerForfeit":
                  // If opponent forfeits, player wins
                  if (state.game?.currentPlayer?.symbol) {
                    dispatch(setWinner(state.game.currentPlayer.symbol));
                  }
                  break;

                case "rematchOffered":
                  dispatch(setRematchOffered(true));
                  break;

                case "rematchAccepted":
                  dispatch(resetGame());
                  // Update symbol if provided
                  if (data.symbol) {
                    dispatch(setPlayerSymbol(data.symbol));
                  }
                  dispatch(setRematchOffered(false));
                  break;

                case "connectionStatus":
                  dispatch(setConnected(data.connected));

                  if (!data.connected && state.game?.stage === "playing") {
                    dispatch(
                      setMessage(
                        "Connection to server lost. Attempting to reconnect..."
                      )
                    );

                    // Attempt to reconnect automatically
                    reconnectTimeout = setTimeout(() => {
                      if (state.game && !state.game.isLocalPlay) {
                        dispatch({ type: SOCKET_CONNECT });
                      }
                    }, 2000);
                  }
                  break;

                case "error":
                  dispatch(setMessage(data.error || "Unknown error occurred"));
                  break;

                  // Clear invalid token
                  AsyncStorage.removeItem("authToken");
                  dispatch(logout());
                  break;

                default:
                  console.log("Unhandled WebSocket message type:", data.type);
                  break;
              }
            } catch (error) {
              console.error("Error processing WebSocket message:", error);
            }
          };

          socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            isConnecting = false;
            dispatch(setConnected(false));
          };

          socket.onclose = (event) => {
            console.log(
              `WebSocket closed (code: ${event.code}, reason: ${event.reason})`
            );
            isConnecting = false;
            dispatch(setConnected(false));

            // Clean up ping interval
            if (pingInterval) {
              clearInterval(pingInterval);
              pingInterval = null;
            }

            // Attempt to reconnect if not intentionally closed
            if (event.code !== 1000) {
              const maxAttempts = 5;
              const currentAttempts = state.game?.connectionAttempts || 0;

              if (currentAttempts < maxAttempts) {
                dispatch(incrementConnectionAttempts());

                const nextAttempt = currentAttempts + 1;
                const delay = Math.min(1000 * Math.pow(2, nextAttempt), 30000);

                dispatch(
                  setMessage(
                    `Connection failed. Retrying... (${nextAttempt}/${maxAttempts})`
                  )
                );

                reconnectTimeout = setTimeout(() => {
                  if (state.game && !state.game.isLocalPlay) {
                    dispatch({ type: SOCKET_CONNECT });
                  }
                }, delay);
              } else {
                dispatch(
                  setMessage(
                    "Connection failed after multiple attempts. Please try again later."
                  )
                );
              }
            }
          };
        } catch (error) {
          console.error("Error creating WebSocket:", error);
          isConnecting = false;
          dispatch(
            setMessage("Failed to connect to server. Please try again.")
          );
        }
        break;

      case SOCKET_DISCONNECT:
        console.log("Handling SOCKET_DISCONNECT action"); // Add this line
        if (socket) {
          // Use code 1000 to indicate normal closure (prevents reconnect)
          socket.close(1000, "Intentional disconnect");
          socket = null;
        }

        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }

        if (pingInterval) {
          clearInterval(pingInterval);
          pingInterval = null;
        }

        dispatch(setConnected(false));
        break;

      case SOCKET_SEND:
        console.log("Handling SOCKET_SEND action with payload:", socketAction.payload); // Add this line
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify((socketAction as SocketSendAction).payload)
          );
        } else {
          console.warn("Cannot send message: WebSocket is not connected");

          // Attempt to reconnect
          if (!socket && state.game && !state.game.isLocalPlay) {
            dispatch({ type: SOCKET_CONNECT });
          }
        }
        break;

      // Auth-related actions
      case SOCKET_AUTH_TOKEN_VERIFICATION:
        console.log("Handling SOCKET_AUTH_TOKEN_VERIFICATION action with payload:", socketAction.payload); // Add this line
        console.log(`socket is ${socket} with state ${socket?.readyState}`);
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "authTokenVerification",
              authToken: (socketAction as SocketAuthTokenVerificationAction)
                .payload,
            })
          );
        } else {
          // Try to connect first, then send
          dispatch({ type: SOCKET_CONNECT });
          setTimeout(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  type: "authTokenVerification",
                  authToken: (socketAction as SocketAuthTokenVerificationAction)
                    .payload,
                })
              );
            }
          }, 1000);
        }
        break;

      case SOCKET_LOGIN:
        console.log("Handling SOCKET_LOGIN action with payload:", socketAction.payload); // Add this line
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "login",
              ...(socketAction as SocketLoginAction).payload,
            })
          );
        } else {
          // Try to connect first, then send login
          dispatch({ type: SOCKET_CONNECT });
          setTimeout(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  type: "login",
                  ...(socketAction as SocketLoginAction).payload,
                })
              );
            }
          }, 1000);
        }
        break;

      case SOCKET_REGISTER:
        console.log("Handling SOCKET_REGISTER action with payload:", socketAction.payload); // Add this line
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "register",
              ...(socketAction as SocketRegisterAction).payload,
            })
          );
        } else {
          // Try to connect first, then send register
          dispatch({ type: SOCKET_CONNECT });
          setTimeout(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  type: "register",
                  ...(socketAction as SocketRegisterAction).payload,
                })
              );
            }
          }, 1000);
        }
        break;

      // Game-related actions
      case SOCKET_START_MATCHMAKING:
        console.log("Handling SOCKET_START_MATCHMAKING action with payload:", socketAction.payload); // Add this line
        if (state.game?.currentPlayer?.id) {
          const playerID = state.game.currentPlayer.id;

          // Ensure connection first
          if (!socket || socket.readyState !== WebSocket.OPEN) {
            dispatch({ type: SOCKET_CONNECT });

            // Retry matchmaking after a short delay
            setTimeout(() => {
              if (state.game?.isConnected) {
                dispatch({
                  type: SOCKET_SEND,
                  payload: {
                    type: "matchmake",
                    playerID,
                    game:
                      (socketAction as SocketStartMatchmakingAction).payload ||
                      "TTT",
                  },
                });
              }
            }, 1000);
          } else {
            dispatch({
              type: SOCKET_SEND,
              payload: {
                type: "matchmake",
                playerID,
                game:
                  (socketAction as SocketStartMatchmakingAction).payload ||
                  "TTT",
              },
            });
          }
        } else {
          dispatch(setMessage("Player ID is required for matchmaking"));
        }
        break;

      case SOCKET_CANCEL_MATCHMAKING:
        console.log("Handling SOCKET_CANCEL_MATCHMAKING action"); // Add this line
        dispatch({
          type: SOCKET_SEND,
          payload: {
            type: "cancelMatchmaking",
          },
        });
        break;

      case SOCKET_PLAYER_READY:
        console.log("Handling SOCKET_PLAYER_READY action"); // Add this line
        if (state.game?.gameID && state.game?.currentPlayer?.id) {
          dispatch({
            type: SOCKET_SEND,
            payload: {
              type: "isReady",
              gameID: state.game.gameID,
              playerID: state.game.currentPlayer.id,
            },
          });
        } else {
          dispatch(setMessage("Game ID and Player ID are required"));
        }
        break;

      case SOCKET_MAKE_MOVE:
        console.log("Handling SOCKET_MAKE_MOVE action with payload:", socketAction.payload); // Add this line
        if (state.game?.gameID && state.game?.currentPlayer?.id) {
          const { position, symbol } = (socketAction as SocketMakeMoveAction)
            .payload;

          dispatch({
            type: SOCKET_SEND,
            payload: {
              type: "makeMove",
              gameID: state.game.gameID,
              playerID: state.game.currentPlayer.id,
              position,
              symbol,
            },
          });
        } else {
          dispatch(setMessage("Game ID and Player ID are required"));
        }
        break;

      case SOCKET_FORFEIT_GAME:
        console.log("Handling SOCKET_FORFEIT_GAME action"); // Add this line
        if (state.game?.gameID && state.game?.currentPlayer?.id) {
          dispatch({
            type: SOCKET_SEND,
            payload: {
              type: "forfeitGame",
              gameID: state.game.gameID,
              playerID: state.game.currentPlayer.id,
            },
          });
        } else {
          dispatch(setMessage("Game ID and Player ID are required"));
        }
        break;

      case SOCKET_REQUEST_REMATCH:
        console.log("Handling SOCKET_REQUEST_REMATCH action with payload:", socketAction.payload); // Add this line
        if (state.game?.gameID && state.game?.currentPlayer?.id) {
          dispatch({
            type: SOCKET_SEND,
            payload: {
              type: "resetGame",
              gameID: state.game.gameID,
              playerID: state.game.currentPlayer.id,
              accept: !!(socketAction as SocketRequestRematchAction).payload,
            },
          });
        } else {
          dispatch(setMessage("Game ID and Player ID are required"));
        }
        break;

      default:
        console.log("Unhandled action type:", socketAction.type); // Add this line
        break;
    }

    return next(action);
  };
};

// Action creators for socket operations
export const socketConnect = (): SocketConnectAction => ({
  type: SOCKET_CONNECT,
});

export const socketDisconnect = (): SocketDisconnectAction => ({
  type: SOCKET_DISCONNECT,
});

export const socketSend = (payload: any): SocketSendAction => ({
  type: SOCKET_SEND,
  payload,
});

// Auth action creators
export const verifyAuthToken = (
  token: string
): SocketAuthTokenVerificationAction => ({
  type: SOCKET_AUTH_TOKEN_VERIFICATION,
  payload: token,
});

export const login = (
  username: string,
  password: string
): SocketLoginAction => ({
  type: SOCKET_LOGIN,
  payload: { username, password },
});

export const register = (
  username: string,
  email: string,
  password: string
): SocketRegisterAction => ({
  type: SOCKET_REGISTER,
  payload: { username, email, password },
});

// Game action creators
export const startMatchmaking = (
  gameType: string = "TTT"
): SocketStartMatchmakingAction => ({
  type: SOCKET_START_MATCHMAKING,
  payload: gameType,
});

export const cancelMatchmaking = (): SocketCancelMatchmakingAction => ({
  type: SOCKET_CANCEL_MATCHMAKING,
});

export const playerReady = (): SocketPlayerReadyAction => ({
  type: SOCKET_PLAYER_READY,
});

export const makeMove = (
  position: number,
  symbol: "X" | "O"
): SocketMakeMoveAction => ({
  type: SOCKET_MAKE_MOVE,
  payload: { position, symbol },
});

export const forfeitGame = (): SocketForfeitGameAction => ({
  type: SOCKET_FORFEIT_GAME,
});

export const requestRematch = (
  isAccepting: boolean = false
): SocketRequestRematchAction => ({
  type: SOCKET_REQUEST_REMATCH,
  payload: isAccepting,
});
