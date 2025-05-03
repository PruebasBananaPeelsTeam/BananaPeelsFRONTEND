import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { toggleReserved } from '../../services/adverts-service'
import Button from '../shared/button'
import { useTranslation } from 'react-i18next'

function ReservedToggleButton({ advert, onToggled, className = '' }) {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [isReserved, setIsReserved] = useState(advert.reserved)
  // chek if owner is the advert`s owner
  if (!user || advert.owner._id !== user._id) return null
  const handleClick = async () => {
    try {
      const result = await toggleReserved(advert._id)
      setIsReserved(result.reserved)
      onToggled?.(result.reserved)
    } catch (err) {
      console.error('Error toggling reserved state:', err.message)
    }
  }

  return (
    <Button onClick={handleClick} 
      className={`bg-yellow-600 text-white hover:bg-yellow-700 ${className}`}>
      {isReserved ? t('reservedToggleButton.cancel') : t('reservedToggleButton.reserve')}
    </Button>
  )
}

export default ReservedToggleButton
