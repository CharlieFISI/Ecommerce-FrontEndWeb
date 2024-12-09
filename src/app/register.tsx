import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

import { FormTitle } from "../components/Form/FormTitle";
import { TextInput } from "../components/TextInput/TextInput";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { register, login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await register(firstName, lastName, email, password);
      await login(email, password);
      router.replace("/home");
    } catch (err) {
      setError("Error al registrar. Por favor, intenta de nuevo.");
    }
  };

  return (
    <View className='flex-1 px-8 pt-12 bg-black'>
      <Pressable onPress={() => router.back()} className='mb-8'>
        <AntDesign name='arrowleft' size={24} color='white' />
      </Pressable>

      <Animated.View entering={FadeIn.duration(1000)} className='flex-1'>
        <FormTitle title='Crear cuenta' />

        <View className='gap-3 space-y-4'>
          <TextInput
            label='Nombre'
            placeholder='Tu nombre'
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            label='Apellido'
            placeholder='Tu apellido'
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            label='Email'
            placeholder='tu@email.com'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <TextInput
            label='Contraseña'
            placeholder='Mínimo 8 caracteres'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View className='h-6'>
            {error ? <Text className='text-red-500'>{error}</Text> : null}
          </View>

          <PrimaryButton title='Crear cuenta' onPress={handleRegister} />

          <Text className='text-[#666] text-center text-sm mt-4'>
            Al registrarte, aceptas nuestros{" "}
            <Text className='text-[#4A90E2]'>términos y condiciones</Text> y{" "}
            <Text className='text-[#4A90E2]'>política de privacidad</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export { Register as default };
