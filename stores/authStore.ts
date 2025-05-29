// store/storeAuth.ts
import { create } from 'zustand';
import { guardarToken, obtenerToken, borrarToken } from '../utils/secureStore';

interface User {
  id?: string;
  name?: string;
  email: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginUsuario: (email: string, password: string) => Promise<void>;
  registroUsuario: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  cargarUsuarioDesdeStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  loginUsuario: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('https://tuservidor.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Credenciales inválidas');

      const data = await res.json();

      await guardarToken(data.token); // ⬅️ Guardamos el token

      set({
        user: { email: data.email, token: data.token },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  registroUsuario: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('https://tuservidor.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error('Error al registrar usuario');

      const data = await res.json();

      await guardarToken(data.token); // ⬅️ Guardamos el token

      set({
        user: { name: data.name, email: data.email, token: data.token },
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    await borrarToken(); // ⬅️ Eliminamos el token del storage
    set({ user: null, isAuthenticated: false, loading: false, error: null });
  },

  cargarUsuarioDesdeStorage: async () => {
    set({ loading: true });
    const token = await obtenerToken();
    if (token) {
      // Opcional: podrías validar token con backend o decodificarlo
      set({
        user: { email: '', token }, // ⚠️ Actualizá con más datos si los podés obtener
        isAuthenticated: true,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },
}));
