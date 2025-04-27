import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/auth-service';
import { isApiClientError } from '../../api/client';
import FormField from '../../components/shared/formField';
import Button from '../../components/shared/button';
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx';
import Loader from '../../components/shared/loader.jsx';
import useTimer from '../../utils/useTimer.js';

function RegisterPage() {
  const [input, setInput] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  useTimer(error, () => { setError(null); }, 5000);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { message, user } = await register({
        email: input.email,
        password: input.password,
        username: input.username,
      });
      navigate('/login');
    } catch (err) {
      if (isApiClientError(err)) {
        setError({
          code: err.code,
          message: err.message,
        });
      } else {
        setError({
          code: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred during registration.',
        });
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        <FormField
          label="Email"
          type="email"
          name="email"
          value={input.email}
          onChange={handleInputChange}
        />
        <FormField
          label="Username"
          type="text"
          name="username"
          value={input.username}
          onChange={handleInputChange}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={input.password}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          disabled={isLoading || !input.email || !input.password || !input.username}
          className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition duration-300 w-full"
        >
          {isLoading ? <Loader /> : 'Register'}
        </Button>

        <FormErrorPopup error={error} onClose={() => setError(null)} />
      </form>

      {/* Login Invitation */}
      <div className="mt-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-6 rounded-2xl shadow-lg w-full max-w-md text-center flex flex-col gap-4">
        <p className="text-gray-700">Already have an account?</p>
        <Link
          to="/login"
          className="cursor-pointer px-4 py-1.5 min-w-[90px] text-sm font-medium rounded-lg bg-[#1e1e1e]/90 text-white hover:bg-[#1e3a8a] transition-all duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
