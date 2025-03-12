// useAuthSocket.ts - Optimized with connection management and reconnect functionality
import { useEffect, useState, useRef, useCallback } from "react";
import { RivalsServer } from "@/components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseAuthSocketProps {
  onMessage: (data: any) => void;
}

export const useAuthSocket = ({ onMessage }: UseAuthSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // Use refs to maintain stable references
  const socketRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);

  // Update the callback ref when onMessage changes
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // Function to create WebSocket connection
  const createWebSocketConnection = useCallback(() => {
    // Close existing connection if any
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }

    // Create new connection
    const ws = new WebSocket(RivalsServer);
    socketRef.current = ws;

    ws.onopen = async () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
      setConnectionAttempts(0);

      // Send stored JWT for authentication if available
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (authToken) {
          ws.send(
            JSON.stringify({
              type: "authTokenVerification",
              authToken: authToken,
            })
          );
        }
      } catch (error) {
        console.error("Error retrieving auth token:", error);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log(
        `WebSocket closed (code: ${event.code}, reason: ${event.reason})`
      );
      setIsConnected(false);
      socketRef.current = null;

      // Attempt to reconnect (with backoff) if not intentionally closed
      if (event.code !== 1000) {
        const maxAttempts = 5;
        if (connectionAttempts < maxAttempts) {
          const nextAttempt = connectionAttempts + 1;
          const delay = Math.min(1000 * Math.pow(2, nextAttempt), 30000); // Exponential backoff with 30s max

          console.log(
            `Reconnecting (attempt ${nextAttempt}) after ${delay / 1000}s`
          );
          setConnectionAttempts(nextAttempt);

          setTimeout(() => {
            createWebSocketConnection();
          }, delay);
        }
      }
    };
  }, [connectionAttempts]);

  // Initialize WebSocket connection on mount
  useEffect(() => {
    createWebSocketConnection();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        // Use code 1000 to indicate normal closure (prevents reconnect)
        socketRef.current.close(1000, "Component unmounting");
        socketRef.current = null;
      }
    };
  }, [createWebSocketConnection]);

  // Stable sendMessage function
  const sendMessage = useCallback(
    (message: any) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(JSON.stringify(message));
        return true;
      } else {
        console.warn("WebSocket not connected - can't send message");

        // Attempt to reconnect if there's no active connection
        if (!socketRef.current) {
          createWebSocketConnection();
        }
        return false;
      }
    },
    [createWebSocketConnection]
  );

  return {
    isConnected,
    sendMessage,
  };
};

export default useAuthSocket;
