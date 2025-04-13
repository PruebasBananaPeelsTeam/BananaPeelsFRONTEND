import { useEffect, useState } from 'react'
import { login } from '../../services/auth-service.js'
import { useNavigate, Link } from 'react-router-dom'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import { isApiClientError } from '../../api/client'
import FromErrorPopup from '../../components/shared/formErrorPopup.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
    try {
      const userData = await login({
        email,
        password,
      })
      console.log(`input´s value are ${email} - ${password}`)
      // remember me ?
      localStorage.setItem('accessToken', userData.accessToken)
      navigate('/')
    } catch (error) {
      if (isApiClientError(error)) {
        setError(error)
      }
      console.error(error)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <form onSubmit={handleSubmit} className="">
          <h1 className="">Sign up !</h1>

          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" className="">
            LogIn
          </Button>

          {/* errors pop up */}
          <FromErrorPopup error={error} onClose={() => setError(null)} />
        </form>

        {/* welcomming card */}
        <div className="">
          <h1 className="font-bold text-2xl text-center">HELLOOOO!</h1>
          <p className="text-center">Welcome to Wallaclone</p>
          <p className="text-center">Please log in to access your .</p>
          <div className="flex items-center text-xs justify-around p-4">
            <p className="flex items-center h-full">
              don´t have an account yet?
            </p>
            <Link
              className="text-yellow-500 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] px-4 py-3  shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:brightness-210 rounded-4xl p-1.5 flex items-center h-full"
              to={'/register'}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
