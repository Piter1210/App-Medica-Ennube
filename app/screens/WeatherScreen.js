// screens/WeatherScreen.js
<<<<<<< HEAD
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { getWeatherForCity } from '../services/weatherService';
=======
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { getWeather } from '../services/weatherService';
>>>>>>> origin/develop

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
<<<<<<< HEAD
        const w = await getWeatherForCity('Tehuacan');
=======
        const w = await getWeather('Tehuacan');
>>>>>>> origin/develop
        setWeather(w);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

<<<<<<< HEAD
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
=======
  if (loading) return <ActivityIndicator style={{flex:1}} />;
  if (err) return (
    <View style={styles.container}>
      <Text>Error: {err}</Text>
      <View style={{height:12}} />
      <Button title="Reintentar" onPress={() => { setLoading(true); setErr(null); /* re-run effect via key change o similar */ }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weather.ciudad}</Text>
      <Text style={styles.temp}>{weather.temperatura} °C</Text>
      <Text style={styles.desc}>{weather.descripcion}</Text>
    </View>
>>>>>>> origin/develop
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:22,fontWeight:'700'},
  temp:{fontSize:20, marginTop:8},
  desc:{marginTop:6}
>>>>>>> origin/develop
});
