import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
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
    Keyboard.dismiss(); // cerrar teclado antes de alert

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

      // Mostrar alert antes de navegar
      setTimeout(() => {
        Alert.alert(
          'Inicio de sesión',
          `Bienvenido ${email}`,
          [
            { text: 'Continuar', onPress: () => navigation.replace('Home') }
          ]
        );
      }, 200); // delay mínimo para asegurar que Toast termine
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: 'Correo o contraseña incorrectos ❌',
      });
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
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
    color: '#3b3b98',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3b3b98',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
  link: {
    color: '#3b3b98',
    marginTop: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
