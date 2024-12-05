import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const ForgotPassword = () => {
  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <Text className='mb-8 text-4xl font-bold text-white'>
          Recuperar contraseña
        </Text>

        <Text className='text-[#666] text-base mb-6'>
          Ingresa tu correo electrónico y te enviaremos instrucciones para
          restablecer tu contraseña.
        </Text>

        <View className='space-y-4'>
          <View>
            <Text className='mb-2 text-base text-white'>
              Correo electrónico
            </Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='tu@email.com'
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <Pressable className='bg-[#4A90E2] py-4 px-6 rounded-full mt-6'>
            <Text className='text-base font-semibold text-center text-white'>
              Enviar instrucciones
            </Text>
          </Pressable>

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
