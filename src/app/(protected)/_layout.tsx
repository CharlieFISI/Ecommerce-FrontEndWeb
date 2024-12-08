import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "expo-router";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/' />;
  }

  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
      <Stack.Screen name='categories' options={{ headerShown: false }} />
    </Stack>
  );
};

export { ProtectedLayout as default };
