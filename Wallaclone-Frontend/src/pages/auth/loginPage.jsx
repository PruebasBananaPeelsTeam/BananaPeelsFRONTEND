import { useState } from 'react'
import  { login }  from '../../services/auth-service.js'
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
        <form onSubmit={handleSubmit} className="bg-gray-900 p-3 rounded-2xl space-y-4">
        <h1 className='font-bold text-2xl text-center'>Login</h1>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
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
            Submit
          </button>
            <div className='text-xs justify-around'>
                <p>don´t have an account yet? 👇</p>
                <Link className='' to={'/register'}>Register 🍌</Link>
            </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage
