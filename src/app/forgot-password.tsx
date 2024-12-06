import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

import { FormTitle } from "../components/FormTitle/FormTitle";
import { TextInput } from "../components/TextInput/TextInput";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

const ForgotPassword = () => {
  const router = useRouter();

  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <FormTitle title='Recuperar contraseña' />

        <Text className='text-[#666] text-base mb-6'>
          Ingresa tu correo electrónico y te enviaremos instrucciones para
          restablecer tu contraseña.
        </Text>

        <View className='space-y-4'>
          <TextInput
            label='Correo electrónico'
            placeholder='tu@email.com'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <PrimaryButton
            title='Enviar instrucciones'
            onPress={() => {
              /* Lógica para enviar instrucciones */
            }}
          />

          <Pressable className='py-2' onPress={() => router.push("/login")}>
            <Text className='text-[#4A90E2] text-center text-base'>
              Volver al inicio de sesión
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      <Animated.Text
        entering={FadeIn.delay(500).duration(1000)}
        className='text-[#666] text-center text-sm mb-4'
      >
        Si necesitas ayuda adicional, por favor contacta a nuestro equipo de
        soporte.
      </Animated.Text>
    </View>
  );
};

export default ForgotPassword;
