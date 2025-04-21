import React, { useState } from 'react'
import { logout } from '../../services/auth-service.js'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../shared/logoutButton.jsx'
import ConfirmationModalCard from './confirmationModalCard.jsx'

function Logout() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <LogoutButton onClick={() => setShowModal(true)} />
      {showModal && (
        <ConfirmationModalCard
          message={'Sure you want to leave?'}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default Logout
