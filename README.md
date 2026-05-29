# Clínica Veterinaria

API backend para una clínica veterinaria construida con Node.js, Express y MongoDB, con un frontend separado en React + Vite + Tailwind para el área pública de autenticación.

## Qué incluye hoy

- Registro, login y perfil de veterinarios
- Confirmación de cuenta mediante token
- Recuperación de password con token temporal
- Endpoint de perfil protegido con JWT
- Conexión a MongoDB con `mongoose`
- Hash de contraseñas con `bcrypt`
- Frontend público con React Router y Axios

## Tecnologías

- Node.js
- Express 5
- MongoDB
- Mongoose
- bcrypt
- dotenv
- jsonwebtoken
- nodemailer
- React
- Vite
- Tailwind CSS
- Axios

## Estructura

```text
backend/
├── src/
│   ├── config/db.js
│   ├── controllers/veterinaryController.js
│   ├── helpers/
│   ├── middlewares/authMiddleware.js
│   ├── models/veterinary.js
│   ├── routes/veterinaryRoutes.js
│   └── index.js
├── package.json
└── .env

frontend/
├── src/
│   ├── components/
│   ├── config/axiosClient.js
│   ├── context/AuthContext.jsx
│   ├── hooks/useAuth.js
│   ├── layouts/AuthLayout.jsx
│   └── pages/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
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
JWT_SECRET=una_clave_larga_y_segura
FRONTEND_URL=http://localhost:5173
```

También puedes usar `MONGODB_URL` si prefieres ese nombre.

En el frontend crea `frontend/.env` con:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

## Instalación

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Scripts

```bash
npm run dev
npm start

cd ../frontend
npm run dev
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
- `POST /forget-password` - Solicita el email para recuperar password.
- `GET /forget-password/:token` - Valida el token temporal.
- `POST /forget-password/:token` - Guarda la nueva contraseña.
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
- ✅ JWT y middleware de autenticación
- ✅ Frontend público con rutas de auth

## Próximos pasos sugeridos

- Completar la autenticación con sesión o JWT
- Agregar validaciones de entrada
- Proteger el endpoint de perfil
- Construir el frontend para consumo de la API