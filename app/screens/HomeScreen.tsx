import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
<<<<<<< HEAD
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
=======
import { onAuthStateChanged, signOut } from 'firebase/auth'; // ✅ Añadir signOut
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebaseConfig';
import { getWeatherForCity } from '../services/weatherService';

export default function HomeScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Detectar si hay usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/screens/LoginScreen'); // redirige al login
      } else {
        setCheckingAuth(false);
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Bienvenido',
            text2: `Sesión iniciada como ${user.email}`,
          });
        }, 300);
      }
    });

>>>>>>> origin/develop
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      await signOut(auth);
=======
      await signOut(auth); // ✅ Cerrar sesión en Firebase
      
>>>>>>> origin/develop
      Toast.show({
        type: 'success',
        text1: 'Sesión cerrada',
        text2: 'Has cerrado sesión correctamente',
      });
<<<<<<< HEAD
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al cerrar sesión',
        text2: error.message,
=======
      
      // La redirección se manejará automáticamente en el onAuthStateChanged
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo cerrar sesión: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const res = await getWeatherForCity('Tehuacan');
      setWeather({ temp: res.temp, desc: res.desc });
      Toast.show({
        type: 'success',
        text1: 'Clima actualizado ☀️',
        text2: `${res.temp}°C, ${res.desc}`,
      });
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Fallo al obtener el clima',
>>>>>>> origin/develop
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
<<<<<<< HEAD
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
=======
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenido — estás autenticado ✅</Text>

        <TouchableOpacity style={styles.button} onPress={fetchWeather} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Consultar clima (Tehuacán)</Text>
          )}
        </TouchableOpacity>

        {weather && (
          <View style={styles.weatherCard}>
            {weather.icon && <Text style={styles.weatherIcon}>{weather.icon}</Text>}
            <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
            <Text style={styles.weatherDesc}>{weather.desc}</Text>
          </View>
        )}
>>>>>>> origin/develop

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
          disabled={loading}
        >
<<<<<<< HEAD
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          )}
        </TouchableOpacity>
      </View>
=======
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
>>>>>>> origin/develop
      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
<<<<<<< HEAD
  title: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#eee', marginBottom: 20 },
=======
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20, textAlign: 'center' },
>>>>>>> origin/develop
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
<<<<<<< HEAD
});
=======
  weatherCard: {
    marginTop: 20,
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
  },
  weatherIcon: { fontSize: 48, marginBottom: 10 },
  weatherTemp: { fontSize: 32, fontWeight: '700', color: '#fff' },
  weatherDesc: { fontSize: 18, color: '#fff', marginTop: 4, textTransform: 'capitalize' },
});
>>>>>>> origin/develop
