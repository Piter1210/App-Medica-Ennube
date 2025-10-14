// screens/WeatherScreen.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { getWeatherForCity } from '../services/weatherService';

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const w = await getWeatherForCity('Tehuacan');
        setWeather(w);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#fff" />;

  if (err) return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {err}</Text>
      <View style={{ height: 12 }} />
      <Button title="Reintentar" onPress={() => { setLoading(true); setErr(null); }} />
    </View>
  );

  // Elegir icono según la descripción del clima
  let weatherIconName = 'weather-sunny';
  if (weather.desc.toLowerCase().includes('rain')) weatherIconName = 'weather-rainy';
  else if (weather.desc.toLowerCase().includes('cloud')) weatherIconName = 'weather-cloudy';
  else if (weather.desc.toLowerCase().includes('storm')) weatherIconName = 'weather-lightning';

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <Text style={styles.city}>Tehuacán</Text>
      <MaterialCommunityIcons name={weatherIconName} size={100} color="white" />
      <Text style={styles.temp}>{weather.temp} °C</Text>
      <Text style={styles.desc}>{weather.desc}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Actualizar" onPress={() => { setLoading(true); setErr(null); }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
  },
  desc: {
    fontSize: 20,
    color: '#f0f0f0',
    marginTop: 6,
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
});
