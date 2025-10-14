import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../config/firebaseConfig';

export default function ProfileScreen() {
  const user = auth.currentUser;

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>👤 Sobre mí</Text>
        <Text style={styles.info}>Correo: {user?.email}</Text>
        <Text style={styles.info}>UID: {user?.uid}</Text>
        <Text style={styles.info}>Registro: {user?.metadata.creationTime}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, color: '#fff', fontWeight: '700', marginBottom: 20 },
  info: { color: '#fff', fontSize: 16, marginBottom: 10 },
});
