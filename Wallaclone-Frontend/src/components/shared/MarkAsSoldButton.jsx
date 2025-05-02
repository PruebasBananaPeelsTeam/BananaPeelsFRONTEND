import Button from './button'
import { useState } from 'react'
import {
  toggleSoldAdvert,
  getAdvertDetail,
} from '../../services/adverts-service'
import { useTranslation } from 'react-i18next'
import { slugify } from '../../utils/slugify'

const MarkAsSoldButton = ({ advert, onToggle }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    try {
      setLoading(true)
      await toggleSoldAdvert(advert._id)
      const updatedAdvert = await getAdvertDetail(
        advert._id,
        slugify(advert.name),
      )
      onToggle(updatedAdvert)
    } catch (error) {
      console.error('Error toggling sold status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleToggle} disabled={loading} className="mb-4 ml-4">
      {advert?.sold
        ? t('advertDetail.markAsUnsold') || '✔ Mark as Unsold'
        : t('advertDetail.markAsSold') || '💰 Mark as Sold'}
    </Button>
  )
}

export default MarkAsSoldButton
