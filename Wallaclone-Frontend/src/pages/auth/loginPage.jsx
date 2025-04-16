import { useEffect, useState } from 'react'
import { login } from '../../services/auth-service.js'
import { useNavigate } from 'react-router-dom'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import { isApiClientError } from '../../api/client'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'
import Loader from '../../components/shared/loader.jsx'
import { InfoCard } from '../../components/shared/infoCard.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth() //Codigo tocado para usar el contexto Auth
  const [input, setInput] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    try {
      const userData = await login({
        username: input.username,
        password: input.password,
      })
      authLogin(userData.token) // codigo tocado para usar el contexto Auth
      console.log(`input´s value are ${input.username} - ${input.password}`)
      // remember me ?
      navigate('/')
    } catch (error) {
      if (isApiClientError(error)) {
        let message = error.message
        if (input.username.includes('@')) {
          message +=
            ' It looks like you entered an email. Please use your username instead.'
        }
        const customError = new Error(message)
        customError.code = error.code
        setError(customError)
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <form onSubmit={handleSubmit} className="">
          <h1 className="font-bold text-3xl text-center">Sign In !</h1>

          <FormField
            label="User Name"
            type="text"
            id="username"
            name="username"
            required
            value={input.username}
            onChange={handleInputChange}
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
            value={input.password}
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-around">
            <Button type="submit" className="" disabled={isLoading}>
              LogIn
              {isLoading && <Loader />}
            </Button>
          </div>
          {/* errors pop up */}
          <FormErrorPopup error={error} onClose={() => setError(null)} />
        </form>

        {/* welcomming card */}
        <InfoCard
         title={
          <h2 className="font-bold text-3xl mt-1.5 text-center">Hi!</h2>
        }
        subtitle={
          <p className="text-center text-2xl mt-4">Welcome to Wallaclone!</p>
        }
        message={
          <p className="text-center text-2xl mt-4 p-2">
            Please log in to access your account.
          </p>
        }
        footerText={
          <p className="text-center text-2xl items-center h-full mb-4">
            👇Don’t have an account yet?👇
          </p>
        }
        linkText={
          <span className="cursor-pointer px-4 py-2 bg-[rgb(223,184,13)] text-white font-semibold rounded-xl hover:bg-yellow-600 transition disabled:opacity-50">
            Register
          </span>
        }
        linkTo="/register"
        className="text-center text-2xl justify-around p-4 m-5"
      />
      </div>
    </>
  )
}

export default LoginPage
