
---

# PASO 11 — `report.md` (para convertir a PDF)
Crea **`report.md`** (luego conviertes a PDF con Word/Google Docs o `pandoc`):

```md
# Reporte: Implementación de Seguridad y Consumo de API - MiAppSegura

**Alumno:** [TU NOMBRE]  
**Fecha:** [FECHA]

## 1. Objetivo
Implementar autenticación segura en app móvil y consumir una API externa.

## 2. Herramientas
- React Native (Expo)
- Firebase Authentication
- expo-secure-store
- OpenWeather API

## 3. Pasos realizados
(Describe en 5-7 líneas cómo configuraste Firebase, keys, y qué hace cada archivo.)

## 4. Evidencias (capturas)
- `docs/screenshots/login.png` — Pantalla de login.
- `docs/screenshots/home_weather.png` — Resultado del consumo de OpenWeather.

## 5. Seguridad aplicada
- Tokens guardados en SecureStore.
- Uso de HTTPS.
- Validación de entradas en cliente.
- No exponer claves en repo.

## 6. Justificación de la API elegida
OpenWeather: API pública con clave gratuita, simple para pruebas y suficiente para demostrar integración HTTP GET y manejo de respuestas/errores.

## 7. Observaciones y mejoras
- En producción, mover claves sensibles a un backend.
- Implementar refresh tokens y revocación.
- Añadir biometría para acceso local.

