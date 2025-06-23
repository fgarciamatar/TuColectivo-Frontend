// store/storeAuth.ts
import Constants from "expo-constants";
import { create } from "zustand";
import { guardarTokens } from "../utils/secureStore";

export interface UserInput {
  // Usuario para registro
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  dni: string;
  celular: string;
  rol?: string;
}

export interface User {
  //Usuario traido de login
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

export interface AuthTokens {
  //Tokens
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  //Respuesta del login
  message: string;
  access: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  //Almacenamiento de zustand
  userData: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  access: boolean;
  error: string | null;
  loginUsuario: (email: string, password: string) => Promise<AuthResponse>;
  registroUsuario: (data: UserInput) => Promise<void>;
setLoading: (loading: boolean) => void;

 setError: (error: string | null) => void;

}

export const API = Constants.expoConfig?.extra?.API;

export const useAuthStore = create<AuthState>((set) => ({
  userData: null,
  isAuthenticated: false,
  loading: false,
  access: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  registroUsuario: async (data: UserInput) => {
    set({ loading: true, error: null });
    const { nombre, apellido, email, dni, celular, contraseña } = data;
    const rol = "pasajero";

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          dni: Number(dni),
          celular,
          contraseña,
          rol,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Error al registrar usuario");
      }

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },

  loginUsuario: async (email, contraseña) => {
    set({ loading: true, error: null });
    try {
      console.log("API URL", API);

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const result = await res.json();

      const response: AuthResponse = {
        message: result.message,
        access: result.access,
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };

      set({
        userData: response.user,
        access: response.access,
      });
      // set({loading:false})
      guardarTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
}));
