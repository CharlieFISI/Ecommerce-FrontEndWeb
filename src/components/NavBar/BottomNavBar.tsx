import { View, Text, Pressable } from "react-native";
import { NAV_ITEMS } from "../../constants/navItems";

type NavItemProps = {
  name: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
};

const NavBarItem = ({ name, icon, isActive, onPress }: NavItemProps) => (
  <Pressable className='items-center' onPress={onPress}>
    <View
      className={`w-6 h-6 rounded-full mb-1 ${
        isActive ? "bg-[#4A90E2]" : "bg-gray-600"
      }`}
    />
    <Text
      className={`text-xs ${isActive ? "text-[#4A90E2]" : "text-gray-400"}`}
    >
      {name}
    </Text>
  </Pressable>
);

export const BottomNavBar = () => {
  return (
    <View className='flex-row items-center justify-around py-4 bg-black border-t border-gray-800'>
      {NAV_ITEMS.map((item, index) => (
        <NavBarItem
          key={item.name}
          {...item}
          isActive={index === 0}
          onPress={() => console.log(`Pressed ${item.name}`)}
        />
      ))}
    </View>
  );
};
