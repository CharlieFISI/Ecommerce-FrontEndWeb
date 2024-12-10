import { useState } from "react";
import { Alert } from "react-native";
import { useStripe as useStripeNative } from "@stripe/stripe-react-native";

const ApiURL = process.env.EXPO_PUBLIC_API_BACKEND_URL;

export const useStripe = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripeNative();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async (amount: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${ApiURL}/payments/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret } = await response.json();

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "GeekStore",
      });

      if (error) {
        console.error("Error initializing payment sheet:", error);
        Alert.alert("Error", "Unable to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error in initializePaymentSheet:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error("Error presenting payment sheet:", error);
        Alert.alert("Error", error.message);
        return false;
      } else {
        Alert.alert("Success", "Your payment was successful!");
        return true;
      }
    } catch (error) {
      console.error("Error in openPaymentSheet:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    initializePaymentSheet,
    openPaymentSheet,
    loading,
  };
};
