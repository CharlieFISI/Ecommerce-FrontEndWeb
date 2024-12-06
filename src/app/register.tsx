import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

import { FormTitle } from "../components/FormTitle/FormTitle";
import { TextInput } from "../components/TextInput/TextInput";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

const Register = () => {
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
        <FormTitle title='Crear cuenta' />

        <View className='space-y-4'>
          <TextInput label='Nombre' placeholder='Tu nombre' />

          <TextInput
            label='Email'
            placeholder='tu@email.com'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <TextInput
            label='Contraseña'
            placeholder='Mínimo 8 caracteres'
            secureTextEntry
          />

          <TextInput
            label='Confirmar contraseña'
            placeholder='Confirma tu contraseña'
            secureTextEntry
          />

          <PrimaryButton
            title='Crear cuenta'
            onPress={() => {
              /* Lógica para crear cuenta */
            }}
          />

          <Text className='text-[#666] text-center text-sm mt-4'>
            Al registrarte, aceptas nuestros{" "}
            <Text className='text-[#4A90E2]'>términos y condiciones</Text> y{" "}
            <Text className='text-[#4A90E2]'>política de privacidad</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export { Register as default };
