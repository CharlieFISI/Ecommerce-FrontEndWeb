import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { countryCodes } from "../constants/countryCodes";

import { FormTitle } from "../components/Form/FormTitle";
import { TextInput } from "../components/TextInput/TextInput";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

const PhoneLogin = () => {
  const router = useRouter();
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderCountryItem = ({ item }: any) => (
    <Pressable
      className='px-4 py-3 border-b border-gray-700'
      onPress={() => {
        setSelectedCountryCode(item);
        setModalVisible(false);
      }}
    >
      <Text className='text-white'>{`${item.country} (${item.code})`}</Text>
    </Pressable>
  );

  return (
    <ScrollView className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <FormTitle title='Iniciar sesión con teléfono' />

        <View className='space-y-4'>
          <View className='flex-row'>
            <TextInput
              className='bg-[#121212] text-white px-4 py-3 rounded-r-lg flex-1'
              placeholderTextColor='#666'
              placeholder='Ingresa tu número'
              keyboardType='phone-pad'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              label='Número de teléfono'
            />
          </View>

          <PrimaryButton
            title='Enviar código'
            onPress={() => {
              /* Lógica para enviar código */
            }}
          />

          <Text className='text-[#666] text-center text-sm mt-4'>
            Te enviaremos un código de verificación por SMS. Pueden aplicarse
            tarifas de mensajes y datos.
          </Text>
        </View>
      </Animated.View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='justify-end flex-1 bg-black bg-opacity-50'>
          <View className='bg-[#121212] rounded-t-lg max-h-96'>
            <View className='flex-row items-center justify-between p-4 border-b border-gray-700'>
              <Text className='text-lg font-bold text-white'>
                Seleccionar país
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <AntDesign name='close' size={24} color='white' />
              </Pressable>
            </View>
            <FlatList
              data={countryCodes}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code + item.country}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export { PhoneLogin as default };
