import { useState } from 'react';
import { login } from '../../services/auth-service.js';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../../components/shared/formField.jsx';
import Button from '../../components/shared/button.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password }); // ✅ login ya guarda el token y configura axios
      console.log(`input´s value are ${email} - ${password}`);
      navigate('/adverts');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-yellow-800 to-orange-800 p-3 rounded-l-2xl space-y-4"
        >
          <h1 className="font-bold text-2xl text-center">Sign up !</h1>

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
        </form>

        {/* Tarjeta de bienvenida */}
        <div className="bg-gradient-to-r from-orange-800 to-yellow-800 p-3 rounded-r-4xl space-y-4 w-[200px] flex flex-col justify-center">
          <h1 className="font-bold text-2xl text-center">HELLOOOO!</h1>
          <p className="text-center">Welcome to Wallaclone</p>
          <p className="text-center">Please log in to access your .</p>
          <div className="flex items-center text-xs justify-around p-4">
            <p className="flex items-center h-full">don´t have an account yet?</p>
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
  );
}

export default LoginPage;
