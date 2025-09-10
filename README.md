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
