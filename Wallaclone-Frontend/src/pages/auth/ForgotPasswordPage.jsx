import { useState } from 'react'
import { client } from '../../api/client'
import FormField from '../../components/shared/formField'
import Button from '../../components/shared/button'
import Loader from '../../components/shared/loader'
import FormErrorPopup from '../../components/shared/formErrorPopUp'
import LanguageSelector from '../../components/shared/languageSelector'
import { useTranslation } from 'react-i18next'

function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await client.post('/api/auth/forgot-password', { email })
      setSuccessMessage(response.data.message)
    } catch (err) {
      setError({
        code: err.code || 'ERROR',
        message: err.message || t('forgotPasswordPage.defaultError'),
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
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      {/* Forgot Password Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {t('forgotPasswordPage.title')}
        </h2>

        <FormField
          label={t('forgotPasswordPage.emailLabel')}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading || !email}>
          {loading ? <Loader /> : t('forgotPasswordPage.submitButton')}
        </Button>

        {successMessage && (
          <p className="text-green-600 text-sm mt-2 text-center">
            {successMessage}
          </p>
        )}

        {error && (
          <FormErrorPopup error={error} onClose={() => setError(null)} />
        )}
      </form>
    </div>
  )
}

export default ForgotPasswordPage
