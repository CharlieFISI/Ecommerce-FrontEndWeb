import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoriesScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      {/* Header */}
      <View className='flex-row items-center justify-between p-4 border-b border-gray-800'>
        <Text className='text-xl font-bold text-white'>Categories</Text>
        <View className='flex-row space-x-4'>
          <Text className='text-white'>Women</Text>
          <Text className='text-gray-400'>Men</Text>
          <Text className='text-gray-400'>Kids</Text>
        </View>
      </View>

      <ScrollView>
        {/* Summer Sales Banner */}
        <View className='bg-[#4A90E2] m-4 rounded-lg p-4'>
          <Text className='text-xl font-bold text-white'>SUMMER SALES</Text>
          <Text className='text-white opacity-80'>Up to 50% off</Text>
        </View>

        {/* Category List */}
        {["New", "Clothes", "Shoes", "Accessories"].map((category) => (
          <Pressable
            key={category}
            className='flex-row items-center p-4 border-b border-gray-800'
          >
            <View className='flex-1'>
              <Text className='text-lg text-white'>{category}</Text>
            </View>
            <Image
              source={{ uri: "/placeholder.svg?height=80&width=80" }}
              className='w-20 h-20 rounded-lg'
            />
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className='flex-row items-center justify-around py-4 bg-black border-t border-gray-800'>
        {["Home", "Shop", "Bag", "Favorites", "Profile"].map((item) => (
          <View key={item} className='items-center'>
            <View className='w-6 h-6 mb-1 bg-gray-600 rounded-full' />
            <Text className='text-xs text-gray-400'>{item}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
