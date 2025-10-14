import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { createAppointment, getAppointments, getAvailableAppointments } from '../services/medicalService';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [available, setAvailable] = useState<any[]>([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', reason: '' });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res: any = await getAppointments();
      const avail: any = await getAvailableAppointments();
      setAppointments(res);
      setAvailable(avail);
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      Toast.show({ type: 'error', text1: 'Faltan campos' });
      return;
    }
    try {
      setLoading(true);
      await createAppointment(newAppointment);
      Toast.show({ type: 'success', text1: 'Cita creada' });
      setNewAppointment({ date: '', time: '', reason: '' });
      fetchData();
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📅 Mis Citas</Text>

        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={newAppointment.date}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
        />
        <TextInput
          placeholder="Hora (HH:MM)"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={newAppointment.time}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
        />
        <TextInput
          placeholder="Motivo de la cita"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={newAppointment.reason}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, reason: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Agendar cita</Text>}
        </TouchableOpacity>

        <Text style={styles.subtitle}>📌 Citas agendadas</Text>
        {appointments.length === 0 ? (
          <Text style={{ color: '#fff' }}>No tienes citas</Text>
        ) : (
          appointments.map((c, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardText}>{c.date} — {c.time}</Text>
              <Text style={styles.cardText}>{c.reason}</Text>
            </View>
          ))
        )}

        <Text style={styles.subtitle}>🕒 Citas disponibles</Text>
        {available.length === 0 ? (
          <Text style={{ color: '#fff' }}>No hay horarios disponibles</Text>
        ) : (
          available.map((c, i) => (
            <View key={i} style={[styles.card, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Text style={styles.cardText}>{c.date} — {c.time}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <Toast />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginTop: 30, marginBottom: 10 },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    color: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    backgroundColor: '#5f72bd',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  card: { width: '90%', backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, marginTop: 8, borderRadius: 8 },
  cardText: { color: '#fff' },
});
