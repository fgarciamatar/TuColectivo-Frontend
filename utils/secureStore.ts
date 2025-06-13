import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}



export const guardarTokens = async ( accessToken: string, refreshToken: string) => {
  try {
    await SecureStore.setItemAsync("accessToken", JSON.stringify({ accessToken }));
    await SecureStore.setItemAsync("refreshToken", JSON.stringify({ refreshToken }));
  } catch (error) {
    console.error('Error guardando el token:', error);
  }

};

export const obtenerToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("tokens");
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    return null;
  }
};

export const borrarTokens = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  } catch (error) {
    console.error('Error borrando el token:', error);
  }
};

