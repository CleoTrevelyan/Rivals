/* This WebSocket service will handle the connection: */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameMessageTypes } from "../hooks/useTicTacToeGame";

/**
 * WebSocket connection status
 */
export enum ConnectionStatus {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  ERROR = "error",
}

/**
 * GameSocket class for managing WebSocket connections for the game
 */
export class GameSocket {
  private socket: WebSocket | null = null;
  private serverUrl: string;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private gameID?: string;
  private playerID?: string;

  /**
   * Create a new GameSocket instance
   * @param serverUrl WebSocket server URL
   */
  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  /**
   * Get the current connection status
   */
  getStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  /**
   * Connect to the WebSocket server
   * @param gameID Optional game ID to join
   * @param playerID Optional player ID
   * @returns Promise that resolves when connected
   */
  async connect(gameID?: string, playerID?: string): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log("Already connected to WebSocket");
      return;
    }

    this.gameID = gameID;
    this.playerID = playerID;
    this.connectionStatus = ConnectionStatus.CONNECTING;

    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(this.serverUrl);

        this.socket.onopen = async () => {
          console.log("Connected to WebSocket server");
          this.connectionStatus = ConnectionStatus.CONNECTED;
          this.reconnectAttempts = 0;

          // Authenticate using stored token
          const authToken = await AsyncStorage.getItem("authToken");
          if (authToken) {
            this.send({
              type: "authTokenVerification",
              authToken,
            });
          }

          resolve();
        };

        this.socket.onmessage = this.handleMessage.bind(this);

        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          this.connectionStatus = ConnectionStatus.ERROR;
          reject(error);
        };

        this.socket.onclose = this.handleDisconnect.bind(this);
      } catch (error) {
        console.error("Error creating WebSocket:", error);
        this.connectionStatus = ConnectionStatus.ERROR;
        reject(error);
      }
    });
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connectionStatus = ConnectionStatus.DISCONNECTED;
    }
  }

  /**
   * Send a message to the server
   * @param data Message data to send
   */
  send(data: any): boolean {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
      return true;
    }
    console.warn("Cannot send message: WebSocket is not connected");
    return false;
  }

  /**
   * Register a message handler for a specific message type
   * @param messageType Message type to handle
   * @param handler Handler function
   */
  registerHandler(messageType: string, handler: (data: any) => void): void {
    this.messageHandlers.set(messageType, handler);
  }

  /**
   * Remove a message handler
   * @param messageType Message type to remove handler for
   */
  removeHandler(messageType: string): void {
    this.messageHandlers.delete(messageType);
  }

  /**
   * Clear all message handlers
   */
  clearHandlers(): void {
    this.messageHandlers.clear();
  }

  /**
   * Start matchmaking
   * @param gameType Type of game (e.g., "TTT" for Tic-Tac-Toe)
   */
  startMatchmaking(gameType: string): void {
    if (!this.playerID) {
      console.error("Player ID is required for matchmaking");
      return;
    }

    this.send({
      type: "matchmake",
      playerID: this.playerID,
      game: gameType,
    });
  }

  /**
   * Cancel ongoing matchmaking
   */
  cancelMatchmaking(): void {
    this.send({
      type: "cancelMatchmaking",
    });
  }

  /**
   * Signal player readiness
   */
  playerReady(): void {
    if (!this.gameID || !this.playerID) {
      console.error("Game ID and Player ID are required");
      return;
    }

    this.send({
      type: "isReady",
      gameID: this.gameID,
      playerID: this.playerID,
    });
  }

  /**
   * Make a move in the game
   * @param position Board position (0-8)
   * @param symbol Player symbol ("X" or "O")
   */
  makeMove(position: number, symbol: "X" | "O"): void {
    if (!this.gameID || !this.playerID) {
      console.error("Game ID and Player ID are required");
      return;
    }

    this.send({
      type: GameMessageTypes.MAKE_MOVE,
      gameID: this.gameID,
      playerID: this.playerID,
      position,
      symbol,
    });
  }

  /**
   * Forfeit the current game
   */
  forfeitGame(): void {
    if (!this.gameID || !this.playerID) {
      console.error("Game ID and Player ID are required");
      return;
    }

    this.send({
      type: GameMessageTypes.FORFEIT_GAME,
      gameID: this.gameID,
      playerID: this.playerID,
    });
  }

  /**
   * Request or accept a rematch
   * @param isAccepting Whether this is accepting a rematch request
   */
  requestRematch(isAccepting: boolean = false): void {
    if (!this.gameID || !this.playerID) {
      console.error("Game ID and Player ID are required");
      return;
    }

    this.send({
      type: GameMessageTypes.RESET_GAME,
      gameID: this.gameID,
      playerID: this.playerID,
      accept: isAccepting,
    });
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data.type);

      // Only process messages for our game if gameID is set
      if (this.gameID && data.gameID && data.gameID !== this.gameID) {
        return;
      }

      // Call the appropriate handler based on message type
      const handler = this.messageHandlers.get(data.type);
      if (handler) {
        handler(data);
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  }

  /**
   * Handle WebSocket disconnection
   */
  private handleDisconnect(): void {
    console.log("Disconnected from WebSocket server");
    this.connectionStatus = ConnectionStatus.DISCONNECTED;

    // Attempt to reconnect if appropriate
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      console.log(
        `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect(this.gameID, this.playerID).catch(() => {
          console.log("Reconnection attempt failed");
        });
      }, delay);
    }
  }
}

// Create and export a singleton instance
let gameSocketInstance: GameSocket | null = null;

/**
 * Get a singleton instance of the GameSocket
 * @param serverUrl WebSocket server URL
 */
export const getGameSocket = (serverUrl: string): GameSocket => {
  if (!gameSocketInstance) {
    gameSocketInstance = new GameSocket(serverUrl);
  }
  return gameSocketInstance;
};
