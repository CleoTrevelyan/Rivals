import { useEffect, useState } from "react";
import { RivalsServer } from "@/components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseAuthSocketProps {
  onMessage: (data: any) => void;
}

/**
 * Custom hook to manage WebSocket connection for authentication
 */
export const useAuthSocket = ({ onMessage }: UseAuthSocketProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(RivalsServer);

    ws.onopen = async () => {
      console.log("Connected to the WebSocket server");
      setSocket(ws);
      setIsConnected(true);

      // Send stored JWT for authentication if available
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        ws.send(
          JSON.stringify({
            type: "authTokenVerification",
            authToken: authToken,
          })
        );
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
      setIsConnected(false);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onMessage]);

  return {
    socket,
    isConnected,
  };
};

export default useAuthSocket;
