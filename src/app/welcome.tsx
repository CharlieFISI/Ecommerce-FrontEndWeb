import React from "react";
import { View, Text, Image, Pressable, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type AppRoutes =
  | "/register"
  | "/phone-login"
  | "/google-login"
  | "/facebook-login"
  | "/login";

const Welcome = () => {
  const router = useRouter();

  const handleNavigation = (route: AppRoutes) => {
    router.push(route);
  };

  return (
    <View className='flex-1'>
      <ImageBackground
        source={require("../assets/images/tech-background.jpg")}
        className='flex-1'
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
          locations={[0.15, 0.6]}
          className='flex-1 px-8 pb-12'
        >
          <Animated.View
            className='items-center mt-36'
            entering={FadeIn.delay(500).duration(1000)}
          >
            <Image
              source={require("../assets/images/logoWelcome.png")}
              className='w-24 h-24 mb-6'
              resizeMode='contain'
            />

            <Text className='my-2 text-5xl font-bold text-center text-white'>
              GeekStore
            </Text>
            <Text className='text-lg font-medium text-center text-white opacity-80'>
              Miles de productos tech en nuestra tienda
            </Text>
          </Animated.View>

          <Animated.View
            className='w-full mt-auto'
            entering={SlideInUp.delay(1000).duration(1000)}
          >
            <View className='flex flex-col gap-2'>
              <Pressable
                className='bg-[#4A90E2] py-4 px-6 rounded-full'
                onPress={() => handleNavigation("/register")}
              >
                <Text className='text-base font-semibold text-center text-white'>
                  Regístrate gratis
                </Text>
              </Pressable>

              <Pressable
                className='bg-transparent border border-[#404040] py-4 px-6 rounded-full flex-row items-center justify-center'
                onPress={() => handleNavigation("/phone-login")}
              >
                <AntDesign name='mobile1' size={20} color='#FFFFFF' />
                <Text className='ml-2 text-base font-semibold text-center text-white'>
                  Continuar con número de teléfono
                </Text>
              </Pressable>

              <Pressable
                className='bg-transparent border border-[#404040] py-4 px-6 rounded-full flex-row items-center justify-center'
                onPress={() => handleNavigation("/google-login")}
              >
                <AntDesign name='google' size={20} color='#FFFFFF' />
                <Text className='ml-2 text-base font-semibold text-center text-white'>
                  Continuar con Google
                </Text>
              </Pressable>

              <Pressable
                className='bg-transparent border border-[#404040] py-4 px-6 rounded-full flex-row items-center justify-center'
                onPress={() => handleNavigation("/facebook-login")}
              >
                <FontAwesome name='facebook' size={20} color='#FFFFFF' />
                <Text className='ml-2 text-base font-semibold text-center text-white'>
                  Continuar con Facebook
                </Text>
              </Pressable>

              <Pressable
                className='py-2'
                onPress={() => handleNavigation("/login")}
              >
                <Text className='text-base font-semibold text-center text-white'>
                  Iniciar sesión
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
