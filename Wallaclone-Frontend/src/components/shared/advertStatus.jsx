import { Reserve } from 'iconsax-reactjs'
import { useTranslation } from 'react-i18next'

export default function AdvertStatus({ reserved, iconSize, textSize }) {
  const colorClass = reserved ? 'text-red-600' : 'text-green-600'
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-1 mt-2">
      <Reserve
        size={iconSize}
        className={`
          transition-colors duration-1000 ease-in-out 
          ${colorClass}
        `}
        variant={reserved ? 'Bold' : 'Outline'}
      />
      <p
        className={`
          font-semibold 
          transition-colors duration-1000 ease-in-out 
          ${textSize} 
          ${colorClass}
        `}
      >
        {reserved ? t('advertStatus.reserved') : t('advertStatus.available')}
      </p>
    </div>
  )
}
