import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";
import { countryCodes } from "../constants/countryCodes";

const PhoneLogin = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <ScrollView className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <Text className='mb-8 text-4xl font-bold text-white'>
          Iniciar sesión con teléfono
        </Text>

        <View className='space-y-4'>
          <Text className='mb-2 text-base text-white'>Número de teléfono</Text>
          <View className='flex-row'>
            <View className='bg-[#121212] rounded-l-lg w-24'>
              <Picker
                selectedValue={selectedCountryCode}
                onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
                style={{ color: "white" }}
              >
                {countryCodes.map((country) => (
                  <Picker.Item
                    key={country.code + country.country}
                    label={`${country.country} (${country.code})`}
                    value={country.code}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-r-lg flex-1'
              placeholderTextColor='#666'
              placeholder='Ingresa tu número'
              keyboardType='phone-pad'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Pressable className='bg-[#4A90E2] py-4 px-6 rounded-full mt-6'>
            <Text className='text-base font-semibold text-center text-white'>
              Enviar código
            </Text>
          </Pressable>

          <Text className='text-[#666] text-center text-sm mt-4'>
            Te enviaremos un código de verificación por SMS. Pueden aplicarse
            tarifas de mensajes y datos.
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default PhoneLogin;
