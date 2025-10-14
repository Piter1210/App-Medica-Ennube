import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigatedRef = useRef(false);
  const router = useRouter();

  // Redirige automáticamente si ya está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !navigatedRef.current) {
        navigatedRef.current = true;
        router.replace('/screens/HomeScreen');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      return Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor llena todos los campos ✍️',
      });
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Toast.show({
        type: 'success',
        text1: 'Bienvenido 🎉',
        text2: `Has iniciado sesión como ${email}`,
      });

      if (!navigatedRef.current) {
        navigatedRef.current = true;
        router.replace('/screens/HomeScreen');
      }
    } catch (error: any) {
      console.error('🔥 Error en login:', error);
      let msg = 'No se pudo iniciar sesión ❌';
      if (error.code === 'auth/invalid-email') msg = 'Correo inválido.';
      if (error.code === 'auth/user-not-found') msg = 'Usuario no encontrado.';
      if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
      Toast.show({ type: 'error', text1: 'Error al iniciar sesión', text2: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient colors={['#5f72bd', '#9b23ea']} style={styles.gradientBtn}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/screens/RegisterScreen')}>
            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 25, textAlign: 'center', color: '#3b3b98' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: { borderRadius: 10, overflow: 'hidden', marginTop: 10 },
  gradientBtn: { padding: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
  link: { color: '#3b3b98', marginTop: 18, textAlign: 'center', fontWeight: '600' },
});
