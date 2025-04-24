import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Page from '../../components/layout/page.jsx'
import Button from '../../components/shared/button.jsx'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'
import Loader from '../../components/shared/loader.jsx'
import ConfirmationModalCard from '../../components/shared/confirmationModalCard.jsx'
import { deleteUser } from '../../services/auth-service.js'
import { clearSession } from '../../utils/storage.js'
import { useAuth } from '../../context/AuthContext.jsx'
import MyAdvertList from '../../components/shared/myAdvertList.jsx'

const MyUserPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const { user, logout } = useAuth()

  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      await deleteUser()
      clearSession()
      logout()
      navigate('/')
    } catch (err) {
      console.error('Error deleting account:', err)
      setError({
        code: err.code || 'ERROR',
        message: err.message || 'An error occurred while deleting the account.',
      })
    } finally {
      setLoading(false)
      setShowModal(false)
    }
  }

  return (
    <Page title="My Profile">
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-purple-800 via-red-500 to-red-800 h-32 md:h-40 relative">
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold">
              👤 {user?.username || 'My account'}
            </h2>
            {user?.email && (
              <p className="text-sm mt-1 text-gray-200">{user.email}</p>
            )}
          </div>
        </div>

        {/* Profile content */}
        <div className="p-6">
          {error && (
            <FormErrorPopup error={error} onClose={() => setError(null)} />
          )}
          {loading && <Loader />}

          {/* Ads section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">My Ads</h3>
            <p className="text-gray-600">
              Here you'll see the ads you've published.
            </p>
            <MyAdvertList />
          </div>

          {/* Danger zone */}
          <div className="mt-10 border-t border-gray-300 pt-6">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You can permanently delete your account. All your ads will be
              deleted as well.
            </p>
            <Button danger onClick={() => setShowModal(true)}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <ConfirmationModalCard
          message="Are you sure you want to delete your account?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </Page>
  )
}

export default MyUserPage
