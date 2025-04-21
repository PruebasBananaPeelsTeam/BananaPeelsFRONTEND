import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../api/client";
import Page from "../../components/layout/page.jsx";
import FormField from "../../components/shared/formField.jsx";
import Button from "../../components/shared/button.jsx";
import Loader from "../../components/shared/loader.jsx";
import FormErrorPopup from "../../components/shared/formErrorPopUp.jsx";

function ResetPasswordPage() {
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

        if(password !== confirmPassword) {
            return setError({ message: 'Passwords do not match' })
        }
        try {
            setLoading(true)
            const response = await client.post('/api/auth/reset-password', {
                token,
                password,
            })
            setSuccessMessage(response.data.message)
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            setError({
                code: err.code || 'ERROR',
                message: err.message || 'An error occurred. Please try again.',
            })
            
        } finally {
            setLoading(false)
        }
    }

    return(
        <Page title="Restablecer contraseña">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Nueva contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <FormField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Restablecer'}
        </Button>

        {successMessage && (
          <p className="text-green-600 text-sm text-center">
            {successMessage} Redirigiendo al login...
          </p>
        )}

        {error && (
          <FormErrorPopup error={error} onClose={() => setError(null)} />
        )}
      </form>
    </Page>
    )
}

export default ResetPasswordPage