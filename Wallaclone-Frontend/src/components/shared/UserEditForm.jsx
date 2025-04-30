import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import FormField from '../shared/formField'
import Button from '../shared/button'
import FormErrorPopup from '../shared/formErrorPopUp'
import { updateUser } from '../../services/auth-service'
import Loader from './loader'

const UserEditForm = () => {
  // 🔐 Traemos el usuario actual y la función para actualizarlo
  const { user, updateUserData } = useAuth()

  // 🧾 Guardamos los datos originales al cargar el componente
  const originalUser = {
    email: user?.email || '',
    username: user?.username || '',
  }

  // ✍️ useState controla lo que el usuario va escribiendo
  const [email, setEmail] = useState(originalUser.email)
  const [username, setUsername] = useState(originalUser.username)
  const [password, setPassword] = useState('')

  // 🧠 Estados para controlar errores, éxito y carga
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🧩 Esta función se ejecuta cuando se pulsa "Save changes"
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    // 🛠️ Comparamos con los valores originales
    const updatedData = {}
    if (email.trim() !== originalUser.email) updatedData.email = email.trim()
    if (username.trim() !== originalUser.username) updatedData.username = username.trim()
    if (password.trim().length > 0) updatedData.password = password.trim()

    // ❌ Si no hay cambios, mostramos error
    if (Object.keys(updatedData).length === 0) {
      return setError({
        code: 'NO_CHANGES',
        message: 'You have not modified any data.',
      })
    }

    // 🔍 Validaciones frontend
    if (updatedData.email && (!updatedData.email.includes('@') || !updatedData.email.includes('.'))) {
      return setError({
        code: 'INVALID_EMAIL',
        message: 'Please enter a valid email address.',
      })
    }

    if (updatedData.username && updatedData.username.length < 3) {
      return setError({
        code: 'INVALID_USERNAME',
        message: 'Username must be at least 3 characters.',
      })
    }

    if (updatedData.password && updatedData.password.length < 6) {
      return setError({
        code: 'INVALID_PASSWORD',
        message: 'Password must be at least 6 characters.',
      })
    }

    try {
      setLoading(true)

      // 🚀 Enviamos los cambios al backend
      console.log('🧪 Enviando al backend:', updatedData)
      await updateUser(updatedData)

      // 🧠 Actualizamos el usuario en el contexto y localStorage
      const newUserData = { ...user, ...updatedData }
      updateUserData(newUserData)

      // 🔄 Sincronizamos los inputs para que los cambios se reflejen
      setEmail(newUserData.email)
      setUsername(newUserData.username)
      setPassword('') // por seguridad

      setSuccess(true)
    } catch (err) {
      console.error('❌ Backend error:', err)

      let message = err.message || 'Something went wrong.'

      // 📦 Si el backend devuelve error más específico, lo usamos
      if (err.response?.data?.error) {
        message = err.response.data.error
      }

      // 🎯 Traducimos mensajes conocidos
      if (message === 'The email is already in use') {
        message = 'That email is already taken.'
      }
      if (message === 'The name is already in use') {
        message = 'That username is already taken.'
      }

      setError({
        code: err.code || 'ERROR',
        message,
      })
    } finally {
      setLoading(false)
    }
  }

  // 📄 Renderizamos el formulario
  return (
    <form
      className="space-y-4 w-full bg-white p-4 rounded-xl shadow-inner"
      onSubmit={handleSubmit}
    >
      {/* Email (requerido) */}
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Username (requerido) */}
      <FormField
        label="Username"
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Password (opcional) */}
      <FormField
        label="New password (optional)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Botón de envío */}
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader /> Updating...
          </>
        ) : (
          'Save changes'
        )}
      </Button>

      {/* Mensaje de éxito */}
      {success && (
        <div className="text-green-600 font-semibold">
          ✅ Profile updated successfully!
        </div>
      )}

      {/* Popup de error */}
      {error && (
        <FormErrorPopup error={error} onClose={() => setError(null)} />
      )}
    </form>
  )
}

export default UserEditForm
