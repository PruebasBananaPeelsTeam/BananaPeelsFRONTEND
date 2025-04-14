import { register } from '../../services/auth-service'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/shared/formField'
import Button from '../../components/shared/button'
import FormErrorPopup from '../../components/shared/formErrorPopup'

function RegisterPage() {
  const [input, setInput] = useState({email: '', password: '', username: ''})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { message, user } = await register({
        email: input.email,
        password: input.password,
        username: input.username,
      })

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(245,245,220)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-center text-2xl font-bold text-[rgb(223,184,13)] font-serif">
          Register
        </h1>

        <div className="space-y-4">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />

          <FormField
            label="Username"
            type="text"
            name="username"
            value={input.username}
            onChange={handleInputChange}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !input.email || !input.password || !input.username}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  )
}

export default RegisterPage
