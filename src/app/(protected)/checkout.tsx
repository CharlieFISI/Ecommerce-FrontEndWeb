import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useProducts";
import { useStripe } from "../../hooks/useStripe";
import { Header } from "../../components/Header/Header";
import { LoadingScreen } from "../../components/Loading/LoadingScreen";

const CheckoutScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, calculateTotal } = useCart();
  const { initializePaymentSheet, openPaymentSheet, loading } = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = calculateTotal();

  useEffect(() => {
    if (total > 0) {
      initializePaymentSheet(Math.round(total * 100));
    }
  }, [total]);

  const handleSubmitOrder = async () => {
    if (!user?.address) {
      Alert.alert("Error", "Please add a shipping address before proceeding.");
      return;
    }

    setIsProcessing(true);
    const success = await openPaymentSheet();
    setIsProcessing(false);

    if (success) {
      router.push("/success");
    }
  };

  if (loading || isProcessing) {
    return <LoadingScreen />;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <View className='flex-1 bg-[#121212] items-center justify-center'>
        <Text className='text-lg text-white'>Your cart is empty</Text>
        <Pressable
          className='mt-4 bg-[#4A90E2] py-2 px-4 rounded-lg'
          onPress={() => router.push("/(protected)/home")}
        >
          <Text className='text-white'>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-[#121212]'>
      <Header title='Checkout' />

      <ScrollView className='flex-1' contentContainerStyle={{ paddingTop: 16 }}>
        {/* Shipping Address */}
        <View className='px-4 mb-6'>
          <Text className='mb-3 text-lg text-white'>Shipping address</Text>
          <Pressable
            className='bg-[#1E1E1E] p-4 rounded-xl'
            onPress={() => router.push("/(protected)/settings")}
          >
            <View className='flex-row items-start justify-between'>
              <View>
                <Text className='mb-1 text-base text-white'>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className='text-gray-400'>
                  {user?.address ? (
                    <>
                      <Text>{user.address.street}</Text>
                      <Text>
                        {user.address.city}, {user.address.state}{" "}
                        {user.address.postalCode}
                      </Text>
                      <Text>{user.address.country}</Text>
                    </>
                  ) : (
                    "Address not registered"
                  )}
                </Text>
              </View>
              <Text className='text-[#E63946]'>Change</Text>
            </View>
          </Pressable>
        </View>

        {/* Order Summary */}
        <View className='px-4 mb-6'>
          <View className='flex-row justify-between mb-4'>
            <Text className='text-gray-400'>Total:</Text>
            <Text className='font-bold text-white'>${total.toFixed(2)}</Text>
          </View>

          <Pressable
            className='bg-[#4A90E2] py-4 rounded-xl'
            onPress={handleSubmitOrder}
            disabled={loading || isProcessing}
          >
            <Text className='text-lg font-semibold text-center text-white'>
              {loading || isProcessing ? "Processing..." : "Pay Now"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;
