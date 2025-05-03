import { Link, useNavigate } from 'react-router-dom'
import { slugify } from '../../utils/slugify'
import AdvertStatus from '../../components/shared/advertStatus'
import { FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Advert = ({ advert }) => {
  const { t } = useTranslation()
  const { _id, name, description, price, type, image, owner } = advert
  const navigate = useNavigate()
  const slug = slugify(name)
  const { user } = useAuth()

  // Verificar si el anuncio está en favoritos
  const isFavorite = user?.favorites?.some(
    (id) => id.toString() === _id.toString(),
  )

  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `data:image/jpeg;base64,${image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO'

  const shortName = name?.length > 20 ? name.slice(0, 20) + '…' : name
  const shortDescription =
    description?.length > 40 ? description.slice(0, 40) + '…' : description

  return (
    <div
      className="perspective cursor-pointer w-full p-2"
      style={{ perspective: '1200px' }}
      onClick={() => navigate(`/adverts/${_id}/${slug}`)}
    >
      <div className="relative w-full h-[340px] transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180">
        {/* Cara frontal */}
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 text-white font-bold text-3xl drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            {shortName}
          </div>

          {/* Corazón de favorito con animación */}
          {isFavorite && (
            <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm">
              <Heart size={22} className="text-red-500 animate-pulse" />
            </div>
          )}
        </div>

        {/* Cara trasera */}
        <div className="w-full h-full rotate-y-180 backface-hidden rounded-lg p-5 shadow-xl border flex flex-col justify-between relative overflow-hidden">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-2xl font-extrabold text-gray-900 truncate">
              {shortName}
            </h3>
            <p className="text-lg text-gray-800 line-clamp-2 mt-1">
              {shortDescription}
            </p>
          </div>
          {/* Precio + Tipo */}
          <div className="flex flex-col items-center my-3">
            <span className="text-3xl font-bold text-emerald-600">
              {price} €
            </span>
            <span
              className={`mt-1 text-xs font-medium px-2 py-1 rounded-full shadow-sm ${
                type === 'sell'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-rose-100 text-rose-600'
              }`}
            >
              {type === 'sell' ? 'For sale' : 'Wanted'}
            </span>
          </div>
          {/* Footer: Dueño + Estado */}
          <div className="flex items-center justify-between text-lg text-gray-600 mt-3 border-t pt-2">
            <Link
              to={`/users/${owner}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline text-indigo-500 font-medium truncate"
            >
              @{owner}
            </Link>

            <div className="flex items-center gap-2">
              <AdvertStatus
                reserved={advert.reserved}
                iconSize={14}
                textSize="text-lg"
              />
              {advert.sold && (
                <span className="inline-flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded-full shadow text-[10px] font-semibold">
                  <FaCheckCircle size={10} />
                  Sold
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advert
