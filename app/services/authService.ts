import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const STORAGE_KEY = 'userToken';

// Guardar token
export async function storeToken(token: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    await SecureStore.setItemAsync(STORAGE_KEY, token);
  }
}

// Obtener token
export async function getStoredToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(STORAGE_KEY);
  } else {
    return SecureStore.getItemAsync(STORAGE_KEY);
  }
}

// Logout / eliminar token
export async function logout() {
  if (Platform.OS === 'web') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  }
}
