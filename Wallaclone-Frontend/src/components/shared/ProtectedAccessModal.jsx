import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ProtectedAccessModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {t('protectedModal.title')}
        </h2>
        <p className="mb-6 text-center text-gray-700">
          {t('protectedModal.message')}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
          >
            {t('protectedModal.loginButton')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
          >
            {t('protectedModal.homeButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProtectedAccessModal
