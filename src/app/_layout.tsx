import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import * as Font from "expo-font";
import { SplashScreen } from "expo-router";
import "../styles/index.css";

Font.loadAsync({
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
});

SplashScreen.hideAsync();

const Layout = () => {
  return (
    <View className='flex-1 font-sans'>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#000000",
          },
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='home' options={{ headerShown: false }} />
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name='register' options={{ headerShown: false }} />
        <Stack.Screen name='phone-login' options={{ headerShown: false }} />
        <Stack.Screen name='facebook-login' options={{ headerShown: false }} />
        <Stack.Screen name='forgot-password' options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export { Layout as default };
