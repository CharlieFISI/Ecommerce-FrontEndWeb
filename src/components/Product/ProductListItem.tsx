import React from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { ProductInfo } from "../../hooks/useProducts";
import { AntDesign } from '@expo/vector-icons';

type ProductListItemProps = {
  product: ProductInfo;
  onPress: () => void;
  onFavoritePress: () => void;
};

export const ProductListItem = ({ product, onPress, onFavoritePress }: ProductListItemProps) => (
  <Pressable
    className="flex-row mb-4 overflow-hidden bg-gray-900 rounded-lg"
    onPress={onPress}
  >
    <Image
      source={
        product.imageUrl 
          ? { uri: product.imageUrl }
          : require("../../assets/images/no-image-available.jpg")
      }
      className="w-24 h-24"
    />
    <View className="justify-between flex-1 p-3">
      <View>
        <Text className="mb-1 text-base text-white">{product.name}</Text>
        {product.lowestPrice !== null && (
          <Text className="text-[#4A90E2]">
            From ${product.lowestPrice.toFixed(2)}
          </Text>
        )}
      </View>
      <Text className="text-sm text-gray-400">
        {product.listings.length} seller{product.listings.length !== 1 ? 's' : ''}
      </Text>
    </View>
    <Pressable 
      className="justify-center p-3"
      onPress={(e) => {
        e.stopPropagation();
        onFavoritePress();
      }}
    >
      <AntDesign name="heart" size={24} color="white" />
    </Pressable>
  </Pressable>
);

