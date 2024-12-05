import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const GoogleLogin = () => {
  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View
        entering={FadeIn.duration(1000)}
        className='items-center justify-center flex-1'
      >
        <Image
          source={require("../assets/images/google-logo.png")}
          className='w-24 h-24 mb-8'
          resizeMode='contain'
        />

        <Text className='mb-8 text-2xl font-bold text-center text-white'>
          Iniciar sesión con Google
        </Text>

        <Pressable className='w-full px-6 py-4 bg-white rounded-full'>
          <Text className='text-base font-semibold text-center text-black'>
            Continuar con Google
          </Text>
        </Pressable>

        <Text className='text-[#666] text-center text-sm mt-8 px-4'>
          Al continuar, aceptas los Términos de servicio de GeekStore y
          confirmas que has leído nuestra Política de privacidad.
        </Text>
      </Animated.View>
    </View>
  );
};

export default GoogleLogin;
