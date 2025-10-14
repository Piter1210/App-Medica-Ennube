import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebaseConfig';

export default function HomeScreen() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/screens/LoginScreen');
      } else {
        setUserEmail(user.email ?? '');
        setCheckingAuth(false);
        Toast.show({
          type: 'success',
          text1: 'Bienvenido',
          text2: `Sesión iniciada como ${user.email}`,
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      Toast.show({
        type: 'success',
        text1: 'Sesión cerrada',
        text2: 'Has cerrado sesión correctamente',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al cerrar sesión',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>Verificando sesión...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido 👋</Text>
        <Text style={styles.subtitle}>{userEmail}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/screens/AppointmentsScreen')}
        >
          <Text style={styles.buttonText}>📅 Citas Médicas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/screens/WeatherScreen')}
        >
          <Text style={styles.buttonText}>☀️ Consultar Clima</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/screens/ProfileScreen')}
        >
          <Text style={styles.buttonText}>👤 Sobre mí</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#eee', marginBottom: 20 },
  button: {
    width: '80%',
    padding: 16,
    backgroundColor: '#5f72bd',
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  logoutButton: { backgroundColor: '#e74c3c' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
