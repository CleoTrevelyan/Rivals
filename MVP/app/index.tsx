import React, { useEffect, useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { RivalsServer } from "@/components/constants.js";

export default function Index() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [playerID, setPlayerID] = useState(""); // State for player identifier
  const [gameID, setGameID] = useState(""); // State for game identifier

  useEffect(() => {
    const ws = new WebSocket(RivalsServer);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      const message = {
        type: "login",
        playerID: playerID,
        gameID: gameID,
      };
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Enter Player ID"
        value={playerID}
        onChangeText={setPlayerID}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Enter Game ID"
        value={gameID}
        onChangeText={setGameID}
        style={styles.textInput}
      />
      <Text>{message ? message : "No message received"}</Text>
      <Button title="Login" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});
