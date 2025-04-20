import { useState } from 'react'
import { client } from '../../api/client'
import FormField from '../../components/shared/formField'
import Button from '../../components/shared/button'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import FormErrorPopup from '../../components/shared/formErrorPopUp'

function ForgotPasswordPage() {
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
      setSuccessMessage(response.data.meesage)
    } catch (err) {
      setError({
        code: err.code || 'ERROR',
        message: err.meesage || 'An error occurred. Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Page title="¿Olvidaste tu contraseña?">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Introduce tu correo electrónico"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading || !email}>
          {loading ? <Loader /> : 'Enviar instrucciones'}
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
    </Page>
  )
}
