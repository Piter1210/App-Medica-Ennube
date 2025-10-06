import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebaseConfig';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor llena todos los campos ✍️',
      });
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Toast.show({
        type: 'success',
        text1: '¡Bienvenido!',
        text2: 'Inicio de sesión exitoso 🎉',
      });

      setTimeout(() => navigation.replace('Home'), 1500);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: 'Correo o contraseña incorrectos ❌',
      });
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#43e97b']} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
          <Text style={styles.title}>Inicio de Sesión</Text>
          <Text style={styles.subtitle}>Tu salud, a un toque de distancia</Text>

          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#777"
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#777"
          />

          <Animatable.View animation="pulse" iterationCount="infinite" iterationDelay={2500}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </Animatable.View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
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
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'center',
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
    color: '#475569',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 14,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
  link: {
    color: '#2563eb',
    marginTop: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
