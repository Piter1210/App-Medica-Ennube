
# App Médica en la Nube 

## Descripción de la aplicación
Esta es una **aplicación móvil para reservas médicas**, que permite a los usuarios:

- Registrarse y autenticarse de manera segura.
- Consultar médicos disponibles y sus horarios.
- Reservar citas médicas directamente desde la app.
- Recibir confirmaciones y notificaciones en tiempo real.
- Gestionar historial de citas y detalles del paciente.

La app está **integrada a la nube**, lo que permite sincronizar datos entre dispositivos y mantener la información segura y centralizada.


## 1. Estrategia de Versionamiento
Usamos **GitFlow** para organizar nuestras ramas y versiones:

- main: Rama de producción, contiene siempre la versión estable.
- develop: Rama de desarrollo, donde se integran las features.
- feature/*: Para nuevas funcionalidades. feature/autenticacion-segura.
- release/*: Preparación de versiones para producción.  release/v1.0.0.
- hotfix/*: Correcciones urgentes en producción.  hotfix/login-bug.
- **Tags**: Se usan para marcar versiones estables y hotfixes.  
  - v1.0.0→ primera versión estable de la app.  
  - v1.0.1-hotfix-login→ corrección rápida de un bug crítico.  

## 2. Configuración inicial de ramas

- Se creó la rama principal main desde donde se despliega la aplicación.
- Se creó la rama develop para integrar features antes de la release.
- Se definieron las ramas siguientes:
  - feature/autenticacion-segura
  - release/v1.0.0
  - hotfix/login-bug

## 3. Flujo de trabajo

1. Crear una rama feature/* desde develop.
2. Hacer commits individuales en la feature.
3. Merge de feature/* a develop cuando la funcionalidad esté lista.
4. Crear release/* desde develop para preparar producción.
5. Merge de release/* a main y creación de **tag** de versión.
6. Si hay errores críticos en main, crear hotfix/*, merge a main y develop, y crear **tag** de hotfix.

# Welcome to your Expo app 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# MiAppSegura

## Requisitos
- Node.js, npm
- Expo CLI
- Cuenta Firebase y OpenWeather (API Key)

## Instalación
1. `npm install`
2. Crear `config/firebaseConfig.js` con credenciales de Firebase (NO subir).
3. Crear `services/WeatherService.js` o `config/openWeatherConfig.js` con la API key de OpenWeather (NO subir).
4. `npx expo start`

## Uso
- Registrar/Ingresar usuario desde la app.
- Verás "Usuario autenticado" en home.
- Navegar a Weather para consumir OpenWeather.

## integración de la API OpenWeather

Para obtener el clima, usamos la **API de OpenWeather**. Esta API nos permite consultar:

- Temperatura actual de la ciudad.
- Estado del clima (soleado, nublado, lluvia, etc.).
- Iconos representativos del clima.
- Datos adicionales como humedad, velocidad del viento, entre otros.

### Configuración
1. Crear un archivo weatherService.ts 
#javascript
export const OPENWEATHER_API_KEY = "TU_API_KEY_AQUI"  (No subir a repso)

###Todas las capturas se encuentran en assets\App Funcionando. Estas evidencias muestran el correcto funcionamiento de la app:
#Login:
-Archivo: assets\App Funcionando/login.png
-Muestra la pantalla de inicio de sesión con correo y contraseña.
-Al iniciar sesión correctamente, aparece un mensaje  indicando “Bienvenido”.
#Pantalla de clima:
-Archivo: assets\App Funcionando/Climaapi.png
-Muestra los datos obtenidos de OpenWeather:
-Temperatura actual (res.temp °C)
-Descripción del clima (res.desc)
-Icono representativo del clima (res.icon)


