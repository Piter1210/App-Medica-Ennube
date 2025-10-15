<<<<<<< HEAD

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

##8. Amenazas y medidas de mitigación

-Robo de credenciales:
Puede ocurrir si el usuario utiliza contraseñas débiles o las guarda sin cifrar.
Mitigación: Uso de Firebase Authentication, que cifra contraseñas y aplica validación segura.

-Exposición de claves de API:
Riesgo de que las claves (como la de OpenWeather) queden visibles en el código fuente o repositorio.
Mitigación: Guardar las claves en archivos .env o en el backend, nunca en el repositorio público.

-Interceptación de tráfico:
Los datos transmitidos (por ejemplo, tokens o peticiones a la API) pueden ser interceptados en redes inseguras.
Mitigación: Forzar el uso de HTTPS y certificados SSL en todas las conexiones.

-Sesiones persistentes no seguras:
Si un usuario mantiene la sesión activa por mucho tiempo, alguien más podría acceder sin autenticarse.
Mitigación: Implementar cierre automático de sesión y validación periódica del token.

-Acceso físico al dispositivo:
Si el celular se pierde o es robado, alguien podría acceder a la app o los datos almacenados.
Mitigación: Guardar los tokens en expo-secure-store y agregar autenticación biométrica o PIN.

-Errores en el manejo de peticiones:
Fallos de red o errores en la API podrían exponer mensajes internos o datos.
Mitigación: Manejo de errores controlado, sin mostrar mensajes sensibles al usuario final.

=======

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

##8. Amenazas y medidas de mitigación

-Robo de credenciales:
Puede ocurrir si el usuario utiliza contraseñas débiles o las guarda sin cifrar.
Mitigación: Uso de Firebase Authentication, que cifra contraseñas y aplica validación segura.

-Exposición de claves de API:
Riesgo de que las claves (como la de OpenWeather) queden visibles en el código fuente o repositorio.
Mitigación: Guardar las claves en archivos .env o en el backend, nunca en el repositorio público.

-Interceptación de tráfico:
Los datos transmitidos (por ejemplo, tokens o peticiones a la API) pueden ser interceptados en redes inseguras.
Mitigación: Forzar el uso de HTTPS y certificados SSL en todas las conexiones.

-Sesiones persistentes no seguras:
Si un usuario mantiene la sesión activa por mucho tiempo, alguien más podría acceder sin autenticarse.
Mitigación: Implementar cierre automático de sesión y validación periódica del token.

-Acceso físico al dispositivo:
Si el celular se pierde o es robado, alguien podría acceder a la app o los datos almacenados.
Mitigación: Guardar los tokens en expo-secure-store y agregar autenticación biométrica o PIN.

-Errores en el manejo de peticiones:
Fallos de red o errores en la API podrían exponer mensajes internos o datos.
Mitigación: Manejo de errores controlado, sin mostrar mensajes sensibles al usuario final.


>>>>>>> origin/develop
