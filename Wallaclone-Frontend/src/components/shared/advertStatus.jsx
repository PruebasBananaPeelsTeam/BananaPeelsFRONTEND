import { Reserve } from 'iconsax-reactjs'

export default function AdvertStatus({ reserved, iconSize, textSize }) {
  const colorClass = reserved ? 'text-red-600' : 'text-green-600'

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
        {reserved ? 'Reserved' : 'Available'}
      </p>
    </div>
  )
}
