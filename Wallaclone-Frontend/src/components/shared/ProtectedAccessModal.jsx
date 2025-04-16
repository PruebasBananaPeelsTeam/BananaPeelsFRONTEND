import { useNavigate } from 'react-router-dom';

const ProtectedAccessModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Acceso restringido</h2>
        <p className="mb-6 text-center text-gray-700">
          Esta sección está reservada para usuarios registrados. Por favor, inicia sesión para continuar o vuelve al inicio.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedAccessModal;
