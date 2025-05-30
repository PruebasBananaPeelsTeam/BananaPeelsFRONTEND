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
import { useTranslation } from 'react-i18next'

const MyUserPage = () => {
  const { t } = useTranslation()
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
        <h1 className="text-3xl font-bold text-gray-800">{t('myUserPage.title')}</h1>
        {user?.username && (
          <p className="text-lg text-gray-800 mt-1">
            {t('myUserPage.username')} {user.username}
          </p>
        )}
        {user?.email && (
          <p className="text-md text-gray-800">
            {t('myUserPage.email')} {user.email}
          </p>
        )}
      </div>

      <section className="mb-12">
        <MyAdvertsBlock />
      </section>

      <section className="mb-12">
        <FavoritesPage />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/800 backdrop-blur-md border border-gray-300 p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            {t('myUserPage.editTitle')}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {t('myUserPage.editSubtitle')}
          </p>
          <UserEditForm />
        </div>

        <div className="bg-red-50 border border-red-200 p-6 rounded-xl h-fit">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            {t('myUserPage.dangerZone')}
          </h2>
          <p className="text-sm text-red-500 mb-4">
            {t('myUserPage.dangerMessage')}
          </p>
          <Button danger onClick={() => setShowModal(true)} className="w-full">
            {t('myUserPage.deleteButton')}
          </Button>
        </div>
      </section>

      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}
      {loading && <Loader />}
      {showModal && (
        <ConfirmationModalCard
          message={t('myUserPage.confirmDelete')}
          onCancel={() => setShowModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </Page>
  )
}

export default MyUserPage
