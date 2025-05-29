// utils/secureStore.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';

export const guardarToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error guardando el token:', error);
  }
};

export const obtenerToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    return null;
  }
};

export const borrarToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error borrando el token:', error);
  }
};
