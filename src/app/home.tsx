import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();

  return (
    <ScrollView className='flex-1 bg-gray-100'>
      <View className='p-4 bg-blue-600'>
        <Text className='text-2xl text-white font-poppins-bold'>GeekStore</Text>
      </View>

      <View className='p-4'>
        <Text className='mb-4 text-xl font-poppins-semibold'>
          Categorías Populares
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Smartphones", "Laptops", "Accesorios", "Audio"].map(
            (category, index) => (
              <Pressable key={index} className='items-center mr-4'>
                <View className='items-center justify-center w-16 h-16 mb-2 bg-blue-500 rounded-full'>
                  <AntDesign name='mobile1' size={24} color='white' />
                </View>
                <Text className='text-sm font-poppins-regular'>{category}</Text>
              </Pressable>
            )
          )}
        </ScrollView>
      </View>

      <View className='p-4'>
        <Text className='mb-4 text-xl font-poppins-semibold'>
          Ofertas del Día
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <Pressable
              key={item}
              className='mr-4 bg-white rounded-lg shadow-md'
              style={{ width: 200 }}
            >
              <Image
                source={{ uri: `https://picsum.photos/200/200?random=${item}` }}
                className='w-full h-32 rounded-t-lg'
              />
              <View className='p-2'>
                <Text className='font-poppins-semibold'>Producto {item}</Text>
                <Text className='text-gray-600'>$199.99</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        className='px-4 py-2 m-4 bg-blue-600 rounded-full'
        onPress={() => router.push("/")}
      >
        <Text className='text-center text-white font-poppins-semibold'>
          Cerrar Sesión
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Home;
