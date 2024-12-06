import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

import { FormTitle } from "../components/FormTitle/FormTitle";
import { TextInput } from "../components/TextInput/TextInput";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

const Login = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <FormTitle title='Iniciar sesión' />

        <View className='space-y-4'>
          <TextInput
            label='Email o nombre de usuario'
            placeholder='Email o nombre de usuario'
          />

          <TextInput
            label='Contraseña'
            placeholder='Contraseña'
            secureTextEntry
          />

          <PrimaryButton
            title='Iniciar sesión'
            onPress={() => {
              /* Lógica para iniciar sesión */
            }}
          />

          <Link href='/forgot-password' asChild>
            <Pressable className='py-2'>
              <Animated.Text className='text-[#4A90E2] text-center text-base'>
                ¿Olvidaste tu contraseña?
              </Animated.Text>
            </Pressable>
          </Link>
        </View>
      </Animated.View>
    </View>
  );
};

export { Login as default };
