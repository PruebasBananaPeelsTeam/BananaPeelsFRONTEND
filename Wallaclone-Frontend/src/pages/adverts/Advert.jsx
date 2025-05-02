import { Link, useNavigate } from 'react-router-dom'
import { slugify } from '../../utils/slugify'
import AdvertStatus from '../../components/shared/advertStatus'
import { FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { Heart } from 'lucide-react'

const Advert = ({ advert }) => {
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
        <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-lg p-5 shadow-lg border border-gray-400 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col justify-between text-center">
          <h3 className="text-lg font-bold truncate">{shortName}</h3>
          <p className="text-sm text-gray-300 line-clamp-3">
            {shortDescription}
          </p>
          <p className="text-xl font-semibold text-emerald-400">{price} €</p>
          <p
            className={`text-sm ${type === 'sell' ? 'text-blue-400' : 'text-rose-400'}`}
          >
            {type === 'sell' ? 'For sale' : 'Wanted'}
          </p>
          <div className="flex items-center justify-around mt-2">
            <Link
              to={`/users/${owner}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm italic text-indigo-300 hover:underline truncate"
            >
              {owner}
            </Link>
            <AdvertStatus
              reserved={advert.reserved}
              iconSize={16}
              textSize="text-sm"
            />
            {advert.sold && (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                <FaCheckCircle size={12} />
                Sold
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advert
