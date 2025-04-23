import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Page from '../../components/layout/page.jsx'
import Button from '../../components/shared/button.jsx'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'
import Loader from '../../components/shared/loader.jsx'
import { deleteUser } from '../../services/auth-service'
import { clearSession } from '../../utils/storage.js'
import { useAuth } from '../../context/AuthContext.jsx'
import ConfirmationModalCard from '../../components/shared/confirmationModalCard.jsx'

const MyUserPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logout } = useAuth()
  const [showModal, setShowModal] = useState(false)

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
    }
  }

  return (
    <Page title="Mi perfil">
      <div className="max-w-xl mx-auto p-4 rounded bg-white shadow-md mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">My account</h2>

        {error && (
          <FormErrorPopup error={error} onClose={() => setError(null)} />
        )}
        {loading && <Loader />}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-4">
            You can permanently delete your account. All your ads will be
            deleted as well.
          </p>
          <Button onClick={() => setShowModal(true)} disabled={loading} danger>
            Delete Account
          </Button>
        </div>
      </div>
      {showModal && (
        <ConfirmationModalCard
          message="Are you sure you want to delete your account?"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowModal(false)}
        />
      )}
    </Page>
  )
}

export default MyUserPage
