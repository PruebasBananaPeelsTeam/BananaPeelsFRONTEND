# WALLACLONE 
- clone the repo 
### first of all
- npm install
### then run
- npm run dev

## nota: install prettier - code formatter and tailwindcss intellisense extensions
- npm run pretty

# Sistema de Autenticación con React Context en Wallaclone

Este documento explica el funcionamiento completo del sistema de autenticación implementado en el frontend de Wallaclone, usando **React Context API**, `localStorage`, y protección de rutas mediante `PrivateRoute` y `ProtectedAccessModal`.

---

## 📁 Estructura general

- **`AuthContext.jsx`**: gestiona el estado global de autenticación (token, login/logout, estado de sesión).
- **`AuthProvider`**: proveedor que rodea toda la app y permite acceder al contexto.
- **`useAuth()`**: hook personalizado para consumir el contexto.
- **`PrivateRoute.jsx`**: componente que protege rutas privadas.
- **`ProtectedAccessModal.jsx`**: modal que se muestra si el usuario no está autenticado.

---

## 🔒 `AuthContext.jsx` explicado paso a paso

### 1. Crear el contexto
```js
const AuthContext = createContext();
```
Se crea un contexto global que contendrá la información de la sesión.

### 2. Estado del token
```js
const [token, setToken] = useState(null);
```
Guarda el token JWT una vez que el usuario inicia sesión.

### 3. Cargar token desde localStorage (persistencia)
```js
useEffect(() => {
  const storedToken = storage.get('token');
  if (storedToken) {
    setToken(storedToken);
  }
}, []);
```
Esto permite mantener la sesión activa tras refrescar la página.

### 4. Funciones de login y logout
```js
const login = (newToken) => {
  setToken(newToken);
  storage.set('token', newToken);
};

const logout = () => {
  setToken(null);
  storage.remove('token');
};
```
- `login`: guarda el token en memoria y almacenamiento.
- `logout`: lo elimina.

### 5. Estado derivado
```js
const isAuthenticated = !!token;
```
Se evalúa si hay token para saber si el usuario está logueado.

### 6. Proveedor del contexto
```js
<AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
  {children}
</AuthContext.Provider>
```
Hace accesibles todos los valores y funciones a cualquier componente hijo.

### 7. Hook personalizado
```js
export const useAuth = () => useContext(AuthContext);
```
Simplifica el acceso al contexto desde cualquier componente.

---

## 👥 `AuthProvider` en el `main.jsx`

```jsx
<AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>
```
Rodea toda la aplicación para que el contexto sea accesible desde cualquier componente.

---

## ⛔️ `PrivateRoute.jsx`

```jsx
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <ProtectedAccessModal />;
  }

  return children;
};
```
- Si el usuario **no está autenticado**, muestra el modal.
- Si sí lo está, permite el acceso a la ruta.

Uso en rutas:
```jsx
<Route path="/adverts/new" element={
  <PrivateRoute>
    <CreateAdvertPage />
  </PrivateRoute>
} />
```

---

## 🔐 `ProtectedAccessModal.jsx`

Componente visual que se muestra cuando se intenta acceder a una ruta protegida sin estar logueado.

```jsx
<div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
  <h2>Acceso restringido</h2>
  <p>Inicia sesión para continuar.</p>
  <button onClick={() => navigate('/login')}>Iniciar sesión</button>
  <button onClick={() => navigate('/')}>Home</button>
</div>
```

Ventajas:
- Experiencia de usuario mejorada.
- No redirige bruscamente, sino que **informa**.

---

## 🚀 Flujo del login

1. El usuario rellena el formulario y pulsa "Login".
2. Se hace una petición a `/api/login` que devuelve un token JWT.
3. Se llama a `authLogin(token)`, que:
   - Guarda el token en `AuthContext`
   - Lo guarda en `localStorage`
4. Se redirige al usuario al home (o ruta protegida original si lo implementas).
5. El `AuthContext` informa a toda la app de que ahora el usuario está autenticado.

---

## 📅 A tener en cuenta

- Puedes añadir expiración del token usando `jwt-decode` y controlar si ya ha caducado.
- Puedes extender `PrivateRoute` para redirigir al login y luego devolver al usuario a la página que quería ver.

---

## 📖 Resumen para documentar o explicar

> Usamos React Context para almacenar el token JWT y el estado de sesión.
> Todas las rutas privadas se protegen con `PrivateRoute`, que muestra un modal si no estás logueado.
> Guardamos el token en `localStorage` para mantener la sesión activa al recargar.
> Esto permite proteger rutas, mostrar u ocultar botones y garantizar una experiencia segura.

