import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";
import "../styles/index.css";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`flex-1 items-center justify-center ${
        colorScheme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Text
        className={`text-xl font-bold ${
          colorScheme === "dark" ? "text-white" : "text-blue-600"
        }`}
      >
        Bienvenido a tu aplicación con NativeWind
      </Text>
    </View>
  );
}
