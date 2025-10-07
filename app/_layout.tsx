import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
      </Stack>
      <Toast />
    </>
  );
}
