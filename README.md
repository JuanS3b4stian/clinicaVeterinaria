# Clínica Veterinaria

API backend para una clínica veterinaria construida con Node.js, Express y MongoDB. El proyecto está enfocado en la gestión de veterinarios y en un flujo básico de autenticación y confirmación de cuenta.

## Qué incluye hoy

- Registro de veterinarios
- Inicio de sesión base
- Confirmación de cuenta mediante token
- Endpoint de perfil
- Conexión a MongoDB con `mongoose`
- Hash de contraseñas con `bcrypt`

## Tecnologías

- Node.js
- Express 5
- MongoDB
- Mongoose
- bcrypt
- dotenv
- nodemon para desarrollo

## Estructura

```text
backend/
├── src/
│   ├── config/db.js
│   ├── controllers/veterinaryController.js
│   ├── helpers/createId.js
│   ├── models/veterinary.js
│   ├── routes/veterinaryRoutes.js
│   └── index.js
├── package.json
└── .env
```

## Requisitos

- Node.js 18 o superior
- MongoDB local o remoto

## Variables de entorno

Crea un archivo `.env` dentro de `backend/` con este contenido:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/clinicaVeterinaria
NODE_ENV=development
```

También puedes usar `MONGODB_URL` si prefieres ese nombre.

## Instalación

```bash
cd backend
npm install
```

## Scripts

```bash
npm run dev
npm start
```

## Ejecución local

1. Instala dependencias en `backend/`.
2. Configura el archivo `.env`.
3. Ejecuta `npm run dev`.
4. Abre `http://localhost:3000` para comprobar que el servidor responde.

## Endpoints

Base path: `/api/veterinarios`

- `POST /register` - Registra un veterinario.
- `POST /login` - Punto de entrada para autenticación.
- `GET /confirm/:token` - Confirma la cuenta usando el token generado al registrar.
- `GET /profile` - Endpoint base para el perfil del usuario.

Endpoint general:

- `GET /` - Respuesta de estado del servidor.

## Modelo de veterinario

El modelo actual guarda estos campos:

- `name`
- `email`
- `password`
- `phone`
- `web`
- `token`
- `confirm`

Las contraseñas se hashean automáticamente antes de guardar el documento.

## Estado actual

- ✅ Servidor Express funcionando
- ✅ Conexión a MongoDB
- ✅ Registro de veterinarios
- ✅ Confirmación por token
- ✅ Hash de contraseñas
- 🔄 Login y perfil aún están en desarrollo
- ⏳ Frontend no incluido en este repositorio

## Próximos pasos sugeridos

- Completar la autenticación con sesión o JWT
- Agregar validaciones de entrada
- Proteger el endpoint de perfil
- Construir el frontend para consumo de la API