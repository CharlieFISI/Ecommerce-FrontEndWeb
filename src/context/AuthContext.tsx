import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  googleUser: GoogleUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  authenticateWithGoogle: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ApiURL = process.env.EXPO_PUBLIC_API_BACKEND_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const storedToken = await AsyncStorage.getItem("@token");
    const storedGoogleUser = await AsyncStorage.getItem("@googleUser");
    if (storedToken) {
      setToken(storedToken);
      await fetchUserInfo(storedToken);
    }
    if (storedGoogleUser) {
      setGoogleUser(JSON.parse(storedGoogleUser));
    }
  };

  const fetchUserInfo = async (authToken: string) => {
    try {
      const response = await fetch(`${ApiURL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener información del usuario");
      }

      const userData: User = await response.json();
      setUser(userData);
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${ApiURL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const { token: authToken } = await response.json();
      setToken(authToken);
      await AsyncStorage.setItem("@token", authToken);
      await fetchUserInfo(authToken);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${ApiURL}/api/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      setUser(null);
      setToken(null);
      setGoogleUser(null);
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@googleUser");
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${ApiURL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: "BUYER",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar");
      }

      await login(email, password);
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const authenticateWithGoogle = async (googleToken: string) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${googleToken}` },
        }
      );
      const googleUserInfo: GoogleUser = await userInfoResponse.json();
      setGoogleUser(googleUserInfo);
      await AsyncStorage.setItem("@googleUser", JSON.stringify(googleUserInfo));

      const email = googleUserInfo.email;
      const password = googleUserInfo.id;

      try {
        await login(email, password);
      } catch (loginError) {
        await register(
          googleUserInfo.given_name,
          googleUserInfo.family_name,
          email,
          password
        );
      }
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        googleUser,
        login,
        logout,
        register,
        authenticateWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
