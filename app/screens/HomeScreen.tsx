import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { getStoredToken, logout } from '../services/authService';
import { getWeatherForCity } from '../services/weatherService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getStoredToken();
      if (!token) navigation.replace('Login');
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await getWeatherForCity('Tehuacan');
      setWeather({ temp: res.temp, desc: res.desc });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Fallo al obtener información');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍⚕️ Bienvenido a tu portal médico</Text>
      <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={fetchWeather} disabled={loading}>
        <Text style={styles.buttonText}>Consultar recomendaciones de salud</Text>
      </TouchableOpacity>

      {weather && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clima en Tehuacán</Text>
          <Text style={styles.cardText}>🌡 Temperatura: {weather.temp}°C</Text>
          <Text style={styles.cardText}>📝 Descripción: {weather.desc}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogout}>
        <Text style={styles.buttonSecondaryText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F3F8FF' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 6, color: '#1E3A8A' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#475569' },
  buttonPrimary: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#1E40AF' },
  cardText: { fontSize: 14, color: '#334155' },
  buttonSecondary: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  buttonSecondaryText: { color: '#EF4444', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
