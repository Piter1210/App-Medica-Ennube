// screens/LoginScreen.js
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { signIn, signUp } from '../services/AuthService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signIn(email, pwd);
      // onAuthStateChanged en App.js se encargará de navegar a Home
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(email, pwd);
      Alert.alert('Registro', 'Usuario registrado y autenticado');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión / Registrarse</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
      <TextInput placeholder="Contraseña" value={pwd} onChangeText={setPwd} style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={handleSignIn} disabled={loading} />
      <View style={{height: 8}} />
      <Button title="Crear cuenta" onPress={handleSignUp} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  input: { borderWidth:1, padding:10, marginBottom:10, borderRadius:6 },
  title: { fontSize:18, marginBottom:12, textAlign:'center' }
});
