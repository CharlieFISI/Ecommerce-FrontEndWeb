import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

const FacebookLogin = () => {
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
          source={require("../assets/images/facebook-logo.png")}
          className='w-24 h-24 mb-8'
          resizeMode='contain'
        />

        <Text className='mb-8 text-2xl font-bold text-center text-white'>
          Iniciar sesión con Facebook
        </Text>

        <Pressable className='bg-[#1877F2] py-4 px-6 rounded-full w-full'>
          <Text className='text-base font-semibold text-center text-white'>
            Continuar con Facebook
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

export default FacebookLogin;
