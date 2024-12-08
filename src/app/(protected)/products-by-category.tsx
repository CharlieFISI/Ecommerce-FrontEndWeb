import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StreetClothesScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView>
        {/* Hero Section */}
        <View className='relative h-[200px]'>
          <Image
            source={{ uri: "/placeholder.svg?height=200&width=375" }}
            className='w-full h-full'
          />
          <View className='absolute bottom-4 left-4'>
            <Text className='text-3xl font-bold text-white'>
              Street clothes
            </Text>
          </View>
        </View>

        {/* Sale Section */}
        <View className='p-4'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-xl font-bold text-white'>Sale</Text>
            <Text className='text-[#4A90E2]'>View all</Text>
          </View>
          <View className='flex-row flex-wrap justify-between'>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} className='w-[48%] mb-4'>
                <Image
                  source={{ uri: "/placeholder.svg?height=200&width=160" }}
                  className='w-full h-48 mb-2 rounded-lg'
                />
                <View className='flex-row mb-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <View
                      key={star}
                      className='w-4 h-4 mr-1 bg-yellow-400 rounded-full'
                    />
                  ))}
                </View>
                <Text className='mb-1 text-white'>Evening Dress</Text>
                <Text className='text-[#4A90E2]'>$24.99</Text>
              </View>
            ))}
          </View>
        </View>
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

export default StreetClothesScreen;
