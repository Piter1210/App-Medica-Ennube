// services/AuthService.js
import * as SecureStore from 'expo-secure-store';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const TOKEN_KEY = 'auth_token';

export async function signUp(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await userCred.user.getIdToken();
  await SecureStore.setItemAsync(TOKEN_KEY, idToken);
  return userCred.user;
}

export async function signIn(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCred.user.getIdToken();
  await SecureStore.setItemAsync(TOKEN_KEY, idToken);
  return userCred.user;
}

export async function signOutUser() {
  await signOut(auth);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getStoredToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}
