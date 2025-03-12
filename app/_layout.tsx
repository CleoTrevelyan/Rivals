import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { useAuth } from "@/store/hooks/useAuth";

// Inner layout component that has access to Redux state
function InnerLayout() {
  const { isAuthenticated, isLoading, verifyToken } = useAuth();

  useEffect(() => {
    // Verify token when app loads
    verifyToken();
  }, [verifyToken]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Redirect based on auth status */}
      {isAuthenticated ? (
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

// Root layout component that provides Redux
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }
        persistor={persistor}
      >
        <InnerLayout />
      </PersistGate>
    </Provider>
  );
}
