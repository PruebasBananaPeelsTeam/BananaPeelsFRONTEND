import { register } from '../../services/auth-service'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/shared/formField'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      //user register
      const { message, user } = await register({
        email,
        password,
        username,
      })

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <FormField
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <button
          type="submit"
          disabled={isLoading || !email || !password || !username}
        >
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </>
  )
}

export default RegisterPage
