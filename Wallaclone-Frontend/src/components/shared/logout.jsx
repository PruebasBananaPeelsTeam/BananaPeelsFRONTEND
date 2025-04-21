import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx' 
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../shared/logoutButton.jsx'
import ConfirmationModalCard from './confirmationModalCard.jsx'

function Logout() {
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
          message={'Sure you want to leave?'}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default Logout
