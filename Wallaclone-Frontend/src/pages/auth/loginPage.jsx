import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth-service.js';
import { useAuth } from '../../context/AuthContext.jsx';
import FormField from '../../components/shared/formField.jsx';
import Button from '../../components/shared/button.jsx';
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx';
import Loader from '../../components/shared/loader.jsx';
import useTimer from '../../utils/useTimer.js';

function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [input, setInput] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }, []);

  useTimer(error, () => {
    setError(null);
  }, 5000);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { tokenJWT, user } = await login({
        username: input.username,
        password: input.password,
      });
      authLogin(tokenJWT, user);
      navigate('/');
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>

        <FormField
          label="Username"
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

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition duration-300 w-full"
        >
          {isLoading ? <Loader /> : 'Login'}
        </Button>

        <Link
          to="/forgot-password"
          className="text-sm text-blue-400 hover:text-blue-300 text-center mt-4 transition"
        >
          Forgot your password?
        </Link>

        <FormErrorPopup error={error} onClose={() => setError(null)} />
      </form>

      {/* Register Invitation */}
      <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center flex flex-col gap-4">
        <p className="text-gray-300">Don't have an account?</p>
        <Link
          to="/register"
          className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
