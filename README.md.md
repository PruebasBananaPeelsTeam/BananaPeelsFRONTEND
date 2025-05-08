# 🪑 MuebleMarket Frontend

MuebleMarket es una aplicación web para la compraventa de **muebles de segunda mano**, desarrollada como proyecto final del Web Development Bootcamp de KeepCoding. Este repositorio contiene el **frontend** del proyecto, creado en equipo por Aida Fuentes, Javier Rodríguez, Noemí Martín y Roberto Gómez.

## 🌍 Sitio en producción

La web ya está desplegada y accesible públicamente:

🔗 [https://bananapeels.duckdns.org/](https://bananapeels.duckdns.org/)

## 🚀 Tecnologías utilizadas

- **React 19**
- **Vite**
- **TailwindCSS**
- **React Router DOM v7**
- **Axios**
- **Socket.IO Client**
- **i18next** (español / inglés)
- **Lucide / React Icons**

## 📁 Estructura del proyecto

```
src/
├── api/             # Cliente Axios y gestión de errores
├── assets/          # Recursos estáticos
├── components/
│   ├── layout/      # Estructura visual
│   └── shared/      # Componentes reutilizables (botones, loader, formularios, etc.)
├── context/         # AuthContext global
├── hooks/           # Custom hook para polling de chats
├── i18n/            # Archivos de traducción
├── pages/
│   ├── adverts/     # CRUD de anuncios, favoritos, usuario
│   ├── auth/        # Registro, login, recuperación de cuenta
│   └── chat/        # Chat entre usuarios por anuncio
├── services/        # Peticiones HTTP a la API REST
├── styles/          # Estilos globales y personalizados
├── utils/           # slugify, timers, almacenamiento local
├── App.jsx
├── main.jsx
└── socket.js
```

## 🧠 Funcionalidades implementadas

### Zona pública
- Registro y login
- Recuperación de contraseña por email
- Listado de anuncios
- Filtros por nombre, tags y precio
- Ver detalle de un anuncio
- Ver anuncios de un usuario específico

### Zona privada
- Crear, editar y eliminar anuncios propios
- Marcar como reservado o vendido
- Sistema de favoritos (añadir, quitar, ver)
- Chat entre miembros (por anuncio)
- Ver y editar datos del perfil
- Eliminar cuenta de usuario
- Logout

### Notificaciones
- Sistema de polling para detectar mensajes de chat no leídos
- Indicador visual en el botón "My Chats"
- La notificación desaparece automáticamente al entrar al chat correspondiente

## 🌍 Idiomas disponibles
- Español (`es`)
- Inglés (`en`)

La interfaz detecta automáticamente el idioma del navegador del usuario.

## 🛠 Cómo ejecutar el proyecto en local

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd MuebleMarket-Frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivo .env
```
VITE_API_URL=http://localhost:3000/api
```
Reemplaza el puerto si tu backend usa uno diferente.

### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```
La aplicación se abrirá en http://localhost:5173.

## 📦 Scripts disponibles

```bash
npm run dev        # Modo desarrollo
npm run build      # Compilación para producción
npm run preview    # Previsualizar build compilado
npm run lint       # Revisión de código
npm run pretty     # Formatear código con Prettier
```

## 👥 Autores

Este proyecto ha sido desarrollado en equipo por:
- Aida Fuentes
- Javier Rodríguez
- Noemí Martín
- Roberto Gómez

*"No más entrenamiento requieres tú. Lo que necesitas, sabes ya."* – Maestro Yoda