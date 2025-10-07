import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  // Validar formato de email
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (loading) return;

    // Validaciones completas
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPass.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor llena todos los campos ✍️',
      });
    }

    if (!validateEmail(email)) {
      return Toast.show({
        type: 'error',
        text1: 'Correo inválido',
        text2: 'Ingresa un correo electrónico válido 📧',
      });
    }

    if (password.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Contraseña débil',
        text2: 'Debe tener al menos 6 caracteres 🔒',
      });
    }

    if (password !== confirmPass) {
      return Toast.show({
        type: 'error',
        text1: 'Contraseñas no coinciden',
        text2: 'Verifica que ambas contraseñas sean iguales ⚠️',
      });
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(userCredential.user, { displayName: name.trim() });

      Toast.show({
        type: 'success',
        text1: 'Cuenta creada 🎉',
        text2: `Bienvenido, ${name}!`,
      });

      router.replace('/screens/LoginScreen');
    } catch (error: any) {
      console.error('🔥 Error en registro:', error);
      let msg = 'No se pudo crear la cuenta ❌';
      if (error.code === 'auth/email-already-in-use') msg = 'El correo ya está registrado.';
      if (error.code === 'auth/invalid-email') msg = 'Correo inválido.';
      if (error.code === 'auth/weak-password') msg = 'Contraseña demasiado débil.';
      Toast.show({ type: 'error', text1: 'Error al registrar', text2: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
          <Text style={styles.title}>Crear cuenta</Text>

          <TextInput
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#aaa"
          />

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

          <TextInput
            placeholder="Confirmar contraseña"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <LinearGradient colors={['#5f72bd', '#9b23ea']} style={styles.gradientBtn}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
