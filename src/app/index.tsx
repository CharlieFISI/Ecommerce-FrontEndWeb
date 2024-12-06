import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeIn,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { SecondaryButton } from "../components/Buttons/SecondaryButton";
import { SocialButton } from "../components/Buttons/SocialButton";

WebBrowser.maybeCompleteAuthSession();

type AppRoutes = "/register" | "/phone-login" | "/facebook-login" | "/login";

const Welcome = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

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

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  useEffect(() => {
    if (userInfo) {
      router.replace("/home");
    }
  }, [userInfo]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        const { authentication } = response;
        const accessToken = authentication?.accessToken
          ? authentication.accessToken
          : null;
        await getUserInfo(accessToken);
        router.replace("/home");
      }
    } else {
      setUserInfo(user);
      router.replace("/home");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    return data ? JSON.parse(data) : null;
  };

  const getUserInfo = async (token: string | null) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
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
                title='Continuar con número de teléfono'
                icon='mobile1'
                onPress={() => handleNavigation("/phone-login")}
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

              <Pressable
                className='py-2'
                onPress={() => handleNavigation("/login")}
              >
                <Text className='text-base text-center text-white font-poppins-semibold'>
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

export { Welcome as default };
