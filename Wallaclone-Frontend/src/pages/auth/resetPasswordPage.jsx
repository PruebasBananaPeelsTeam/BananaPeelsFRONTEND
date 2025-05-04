import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { client } from '../../api/client'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import Loader from '../../components/shared/loader.jsx'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'
import LanguageSelector from '../../components/shared/languageSelector.jsx'
import { useTranslation } from 'react-i18next'

function ResetPasswordPage() {
  const { t } = useTranslation()
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      return setError({ message: t('resetPasswordPage.errorMismatch') })
    }

    try {
      setLoading(true)
      const response = await client.post('/api/auth/reset-password', {
        token,
        password,
      })
      setSuccessMessage(t('resetPasswordPage.successMessageRedirect'))
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError({
        code: err.code || 'ERROR',
        message: err.message || t('resetPasswordPage.defaultError'),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {t('resetPasswordPage.title')}
        </h2>

        <FormField
          label={t('resetPasswordPage.newPasswordLabel')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <FormField
          label={t('resetPasswordPage.confirmPasswordLabel')}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : t('resetPasswordPage.submitButton')}
        </Button>

        {successMessage && (
          <p className="text-green-600 text-sm text-center">{successMessage}</p>
        )}

        {error && (
          <FormErrorPopup error={error} onClose={() => setError(null)} />
        )}
      </form>
    </div>
  )
}

export default ResetPasswordPage
