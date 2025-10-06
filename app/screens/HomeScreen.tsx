import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, View } from 'react-native';
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
      Keyboard.dismiss();
      if (!token) {
        Alert.alert(
          'No autenticado',
          'Debes iniciar sesión para acceder a esta pantalla',
          [{ text: 'OK', onPress: () => navigation.replace('Login') }]
        );
      } else {
        setTimeout(() => {
          Alert.alert('Bienvenido', 'Has iniciado sesión correctamente');
        }, 200);
      }
    })();
  }, []);

  const handleLogout = async () => {
    Keyboard.dismiss();
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: async () => {
            await logout();
            setTimeout(() => {
              Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente', [
                { text: 'OK', onPress: () => navigation.replace('Login') }
              ]);
            }, 200);
          }
        }
      ]
    );
  };

  const fetchWeather = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const res = await getWeatherForCity('Tehuacan');
      setWeather({ temp: res.temp, desc: res.desc });

      setTimeout(() => {
        Alert.alert('Clima actualizado', `Temperatura: ${res.temp}°C, ${res.desc}`);
      }, 200);
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
