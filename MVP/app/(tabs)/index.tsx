import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { RivalsServer } from "@/components/constants.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function Index() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Rivals!</Text>
      <Text style={styles.subtitle}>Your gaming dashboard</Text>
      
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {message ? message : "No messages from server"}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Logout" 
          onPress={handleLogout} 
          color="#FF3D71"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F3F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#8F9BB3',
    marginBottom: 32,
    textAlign: 'center',
  },
  messageContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 32,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#1A1A2E',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '50%',
  },
});