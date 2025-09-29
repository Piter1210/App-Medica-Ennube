# SECURITY.md

## Resumen
Medidas de seguridad implementadas en la app móvil.

## Principios aplicados
- Comunicaciones por HTTPS.
- Autenticación vía Firebase Authentication (Email/Password).
- Tokens y datos sensibles guardados en almacenamiento seguro (expo-secure-store).
- No subir credenciales al repositorio.
- Validación básica de entradas.

## Amenazas y mitigaciones
- Fuga de tokens -> Guardado en SecureStore, borrado en logout.
- Exposición de claves en repo -> .gitignore para config y .env; rotación de claves.
- MITM -> Uso de HTTPS + evitar certificados ignorados.
- Almacenamiento inseguro -> No usar AsyncStorage para tokens.

## Procedimientos
- No subir `config/firebaseConfig.js` ni `config/openWeatherConfig.js`.
- Revocar credenciales comprometidas.
- Actualizar dependencias regularmente.

