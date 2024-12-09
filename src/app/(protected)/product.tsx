import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useProduct, useProducts, ProductInfo } from "../../hooks/useProducts";
import { ProductGridItem } from "../../components/Product/ProductGridItem";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id as string);
  const { data: allProducts } = useProducts();

  const relatedProducts = allProducts
    ?.filter(
      (p) => p.categoryId === product?.categoryId && p.id !== product?.id
    )
    .slice(0, 5);

  if (isLoading || !product) {
    return (
      <View className='flex-1 bg-[#121212] items-center justify-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center justify-between p-4 border-b border-gray-800'>
        <View className='flex-row items-center'>
          <Pressable onPress={() => router.back()} className='mr-4'>
            <AntDesign name='left' size={24} color='white' />
          </Pressable>
          <Text className='text-xl font-bold text-white'>{product.name}</Text>
        </View>
        <Pressable onPress={() => console.log("Add to favorites")}>
          <AntDesign name='heart' size={24} color='white' />
        </Pressable>
      </View>

      <Image
        source={
          product.imageUrl
            ? { uri: product.imageUrl }
            : require("../../assets/images/no-image-available.jpg")
        }
        className='w-full h-[500px]'
        resizeMode='cover'
      />

      <View className='p-4'>
        <Text className='mb-4 text-2xl font-bold text-white'>
          {product.name}
        </Text>
        <Text className='mb-6 text-gray-400'>{product.description}</Text>

        <Text className='mb-4 text-lg text-white'>Available from Sellers</Text>
        {product.listings.map((listing, index) => (
          <Pressable
            key={index}
            className='flex-row items-center justify-between p-4 mb-2 border border-gray-800 rounded-lg'
          >
            <View>
              <Text className='text-base text-white'>{listing.sellerName}</Text>
              <Text className='text-sm text-gray-400'>
                Stock: {listing.stock} units
              </Text>
            </View>
            <Text className='text-[#4A90E2] text-lg'>
              ${listing.price.toFixed(2)}
            </Text>
          </Pressable>
        ))}
      </View>

      {relatedProducts && relatedProducts.length > 0 && (
        <View className='p-4 border-t border-gray-800'>
          <Text className='mb-4 text-lg text-white'>You may also like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relatedProducts.map((relatedProduct) => (
              <View
                key={relatedProduct.id}
                className='mr-4'
                style={{ width: 150 }}
              >
                <ProductGridItem
                  product={relatedProduct}
                  onPress={() =>
                    router.push({
                      pathname: "/(protected)/product",
                      params: { id: relatedProduct.id },
                    })
                  }
                  onFavoritePress={() => console.log('Add to favorites:', product.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductScreen;
