import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
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
      if (!token) navigation.replace('Login'); // redirige si no hay token
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login'); // reemplaza la pantalla actual
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await getWeatherForCity('Tehuacan');
      setWeather({ temp: res.temp, desc: res.desc });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Fallo al obtener clima');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido — estás autenticado</Text>

      <Button title="Consultar clima (Tehuacán)" onPress={fetchWeather} disabled={loading} />

      {weather && (
        <View style={{ marginTop: 12 }}>
          <Text>Temperatura: {weather.temp}°C</Text>
          <Text>Descripción: {weather.desc}</Text>
        </View>
      )}

      <View style={{ height: 12 }} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 18, marginBottom: 12 }
});
