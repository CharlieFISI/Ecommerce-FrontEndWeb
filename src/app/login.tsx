import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const Login = () => {
  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <Text className='mb-8 text-4xl font-bold text-white'>
          Iniciar sesión
        </Text>

        <View className='space-y-4'>
          <View>
            <Text className='mb-2 text-base text-white'>
              Email o nombre de usuario
            </Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='Email o nombre de usuario'
            />
          </View>

          <View>
            <Text className='mb-2 text-base text-white'>Contraseña</Text>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-lg'
              placeholderTextColor='#666'
              placeholder='Contraseña'
              secureTextEntry
            />
          </View>

          <Pressable className='bg-[#4A90E2] py-4 px-6 rounded-full mt-6'>
            <Text className='text-base font-semibold text-center text-white'>
              Iniciar sesión
            </Text>
          </Pressable>

          <Link href='/forgot-password' asChild>
            <Pressable className='py-2'>
              <Text className='text-[#4A90E2] text-center text-base'>
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>
          </Link>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;
