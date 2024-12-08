import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavBar } from "../../components/NavBar/BottomNavBar";
import { SectionTitle } from "../../components/Section/SectionTitle";
import { ProductGridItem } from "../../components/Product/ProductGridItem";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { CategoryList } from "../../components/Category/CategoryList";

const Home = () => {
  const categories = [
    { id: "1", name: "All" },
    { id: "2", name: "Women" },
    { id: "3", name: "Men" },
    { id: "4", name: "Kids" },
    { id: "5", name: "Accessories" },
  ];

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <ScrollView>
        <HeroSection
          imageUrl='/placeholder.svg?height=400&width=375'
          title='Fashion sale'
          buttonText='Check'
          onButtonPress={() => console.log("Check button pressed")}
        />

        {/* Categories Section */}
        <CategoryList
          categories={categories}
          onCategoryPress={(category) =>
            console.log(`Pressed category: ${category.name}`)
          }
        />

        {/* New Section */}
        <View className='px-4'>
          <SectionTitle
            title='New'
            viewAll
            onViewAll={() => console.log("View all new items")}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <ProductGridItem
                key={item}
                imageUrl='/placeholder.svg?height=150&width=128'
                name={`New Item ${item}`}
                price={`$${(Math.random() * 100).toFixed(2)}`}
                onPress={() => console.log(`Pressed item ${item}`)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
};

export default Home;
