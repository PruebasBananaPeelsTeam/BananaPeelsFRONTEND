import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../shared/logoutButton.jsx'
import ConfirmationModalCard from './confirmationModalCard.jsx'
import { useTranslation } from 'react-i18next'

function Logout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { logout: authLogout } = useAuth()

  const handleLogout = () => {
    authLogout('token')
    navigate('/login')
  }

  return (
    <>
      <LogoutButton onClick={() => setShowModal(true)} />
      {showModal && (
        <ConfirmationModalCard
          message={t("confirmationModal.question")}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default Logout
