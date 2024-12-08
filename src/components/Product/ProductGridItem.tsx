import { View, Text, Image, Pressable } from "react-native";

type ProductGridItemProps = {
  imageUrl: string;
  name: string;
  price: string;
  rating?: number;
  onPress?: () => void;
};

export const ProductGridItem = ({
  imageUrl,
  name,
  price,
  rating,
  onPress,
}: ProductGridItemProps) => (
  <Pressable className='w-[48%] mb-4' onPress={onPress}>
    <Image source={{ uri: imageUrl }} className='w-full h-48 mb-2 rounded-lg' />
    {rating && (
      <View className='flex-row mb-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <View
            key={star}
            className={`w-4 h-4 rounded-full mr-1 ${
              star <= rating ? "bg-yellow-400" : "bg-gray-600"
            }`}
          />
        ))}
      </View>
    )}
    <Text className='mb-1 text-white'>{name}</Text>
    <Text className='text-[#4A90E2]'>{price}</Text>
  </Pressable>
);
