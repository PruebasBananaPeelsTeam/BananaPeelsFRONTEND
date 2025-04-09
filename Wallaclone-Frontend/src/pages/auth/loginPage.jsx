import { useState } from 'react'
import { login } from '../../services/auth-service.js'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userData = await login({
        email,
        password,
      })
      console.log(`input´s value are ${email} - ${password}`)
      localStorage.setItem('accessToken', userData.accessToken)
      navigate('/adverts')
    } catch (error) {
      console.error('Login failed', error)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-r from-yellow-900 to-gray-900 p-3 rounded-l-2xl space-y-4"
          >
            <h1 className="font-bold text-2xl text-center">Sign up !</h1>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 mt-1 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 mt-1 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="w-full font-semibold py-1 rounded-lg hover:bg-yellow-600 transition"
            >
              LOG IN
            </button>
          </form>
        </div>
        {/* Tarjeta de bienvenida */}
        <div className="bg-gradient-to-r from-gray-900 to-yellow-800 p-3 rounded-r-4xl space-y-4 w-[200px] flex flex-col justify-center">
          <h1 className="font-bold text-2xl text-center">HELLOOOO!</h1>
          <p className="text-center">Welcome to Wallaclone</p>
          <p className="text-center">Please log in to access your .</p>
          <div className="flex items-center text-xs justify-around p-4">
            <p className="flex items-center h-full">
              don´t have an account yet?
            </p>
            <Link
              className="bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-900 to-yellow-600 font-semibold px-6 py-3  shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:brightness-210 rounded-4xl p-1.5 flex items-center h-full"
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
