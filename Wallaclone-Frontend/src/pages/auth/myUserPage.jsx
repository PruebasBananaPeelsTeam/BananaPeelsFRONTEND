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
import MyAdvertsBlock from '../adverts/MyAdvertsPage.jsx'
import UserEditForm from '../../components/shared/UserEditForm.jsx'
import FavoritesPage from '../adverts/FavoritesPage.jsx'

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
    <Page fullWidth>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">👤 My Profile</h1>
        {user?.username && (
          <p className="text-lg text-gray-800 mt-1">Username: {user.username}</p>
        )}
        {user?.email && (
          <p className="text-md text-gray-800">Email: {user.email}</p>
        )}
      </div>

      {/* Ads */}
      <section>
        <MyAdvertsBlock />
      </section>

      <section>
        <FavoritesPage />
      </section>

      {/* Profile management grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Edit user form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
          <p className="text-gray-600 mb-4">
            You can update your email, username, or password below.
          </p>
          <UserEditForm />
        </div>

        {/* Delete user */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl h-fit">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            ⚠️ Danger Zone
          </h2>
          <p className="text-sm text-red-500 mb-4">
            Deleting your account will remove all your data and ads permanently.
          </p>
          <Button danger onClick={() => setShowModal(true)} className="w-full">
            Delete Account
          </Button>
        </div>
      </section>

      {/* Modals & feedback */}
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}
      {loading && <Loader />}
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
