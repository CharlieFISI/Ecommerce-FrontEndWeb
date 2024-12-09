import React, { useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { SecondaryButton } from "../components/Buttons/SecondaryButton";
import { SocialButton } from "../components/Buttons/SocialButton";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

type AppRoutes = "/register" | "/phone-login" | "/facebook-login" | "/login";

const Index = () => {
  const router = useRouter();
  const { promptAsync } = useGoogleAuth();

  const logoPosition = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoPosition.value }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  useEffect(() => {
    logoPosition.value = withTiming(-20, { duration: 1000 });
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
  }, []);

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
          <Animated.View className='items-center mt-32' style={logoStyle}>
            <Image
              source={require("../assets/images/geekstore-logo.png")}
              className='w-24 h-24 mb-6'
              resizeMode='contain'
            />
          </Animated.View>

          <Animated.View
            className='items-center w-full mt-4'
            style={contentStyle}
          >
            <Text className='mb-2 text-4xl text-center text-white font-poppins-bold'>
              GeekStore
            </Text>
            <Text className='mb-8 font-sans text-lg text-center text-white opacity-80'>
              Miles de productos tech en nuestra tienda
            </Text>
          </Animated.View>

          <Animated.View className='w-full mt-auto' style={contentStyle}>
            <View className='flex flex-col gap-2'>
              <PrimaryButton
                title='Regístrate gratis'
                onPress={() => handleNavigation("/register")}
              />

              <SocialButton
                title='Continuar con Google'
                icon='google'
                onPress={() => promptAsync()}
              />

              <SocialButton
                title='Continuar con Facebook'
                icon='facebook'
                onPress={() => handleNavigation("/facebook-login")}
              />

              <SecondaryButton
                title='Iniciar sesión'
                onPress={() => handleNavigation("/login")}
              />
            </View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export { Index as default };
