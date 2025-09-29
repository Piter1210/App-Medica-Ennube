// screens/HomeScreen.js
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signOutUser } from '../services/AuthService';

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  async function handleLogout() {
    await signOutUser();
    // onAuthStateChanged reenrutará a Login
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario autenticado</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <View style={{height:12}} />
      <Button title="Ver clima (OpenWeather)" onPress={() => navigation.navigate('Weather')} />
      <View style={{height:12}} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:20, fontWeight:'700'},
  text:{marginTop:8}
});
