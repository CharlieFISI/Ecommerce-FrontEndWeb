import React from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { ProductInfo } from "../../hooks/useProducts";
import { AntDesign } from '@expo/vector-icons';

type ProductGridItemProps = {
  product: ProductInfo;
  onPress: () => void;
  onFavoritePress: () => void;
};

export const ProductGridItem = ({ product, onPress, onFavoritePress }: ProductGridItemProps) => (
  <Pressable onPress={onPress} className="mb-4">
    <View className="relative">
      <Image 
        source={
          product.imageUrl 
            ? { uri: product.imageUrl }
            : require("../../assets/images/no-image-available.jpg")
        }
        className="w-full h-48 mb-2 rounded-lg"
      />
      <Pressable 
        className="absolute p-2 bg-black bg-opacity-50 rounded-full top-2 right-2"
        onPress={(e) => {
          e.stopPropagation();
          onFavoritePress();
        }}
      >
        <AntDesign name="heart" size={20} color="white" />
      </Pressable>
    </View>
    <Text className="mb-1 text-base text-white">{product.name}</Text>
    {product.lowestPrice !== null && (
      <Text className="text-[#4A90E2] text-sm">
        From ${product.lowestPrice.toFixed(2)}
      </Text>
    )}
  </Pressable>
);

