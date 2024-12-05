import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const Register = () => {
  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <Text className='mb-8 text-4xl font-bold text-white'>Crear cuenta</Text>

        <View className='space-y-4'>
          <View>
            <Text className='mb-2 text-base text-white'>Nombre</Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='Tu nombre'
            />
          </View>

          <View>
            <Text className='mb-2 text-base text-white'>Email</Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='tu@email.com'
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View>
            <Text className='mb-2 text-base text-white'>Contraseña</Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='Mínimo 8 caracteres'
              secureTextEntry
            />
          </View>

          <View>
            <Text className='mb-2 text-base text-white'>
              Confirmar contraseña
            </Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='Confirma tu contraseña'
              secureTextEntry
            />
          </View>

          <Pressable className='bg-[#4A90E2] py-4 px-6 rounded-full mt-6'>
            <Text className='text-base font-semibold text-center text-white'>
              Crear cuenta
            </Text>
          </Pressable>

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

export default Register;
