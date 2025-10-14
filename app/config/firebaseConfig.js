import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { KEYS } from './keys';

const firebaseConfig = {
  apiKey: KEYS.FIREBASE_API_KEY,
  authDomain: KEYS.FIREBASE_AUTH_DOMAIN,
  projectId: KEYS.FIREBASE_PROJECT_ID,
  storageBucket: KEYS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: KEYS.FIREBASE_MESSAGING_SENDER_ID,
  appId: KEYS.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Verificar conexión y autenticación
onAuthStateChanged(auth, (user) => {
  console.log(user ? '🔐 Usuario autenticado:' : '❌ No hay usuario conectado', user?.email);
});

export default app;
