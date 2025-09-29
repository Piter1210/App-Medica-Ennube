// screens/WeatherScreen.js
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { getWeather } from '../services/weatherService';

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const w = await getWeather('Tehuacan');
        setWeather(w);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:22,fontWeight:'700'},
  temp:{fontSize:20, marginTop:8},
  desc:{marginTop:6}
});
