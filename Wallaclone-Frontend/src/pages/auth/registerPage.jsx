import { register } from '../../services/auth-service'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isApiClientError } from '../../api/client'
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

   // error Timer
    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          setError(null)
        }, 4000)
        return () => clearTimeout(timer)
      }
    }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { message, user } = await register({
        email: input.email,
        password: input.password,
        username: input.username,
      })

      navigate('/login')

    } catch (err) {

      if (isApiClientError(err)){
        setError({
          code: err.code,
          message: err.message
        })

      } else {
        //Not api error
        setError({
          code: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred during registration.'
      })
      }
      console.error(err)
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

        {/* errors pop up */}
        {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      </form>
    </div>
  )
}

export default RegisterPage
