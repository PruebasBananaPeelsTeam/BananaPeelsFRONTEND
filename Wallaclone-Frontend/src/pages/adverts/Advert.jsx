import { Link, useNavigate } from 'react-router-dom'
import { slugify } from '../../utils/slugify'
import AdvertStatus from '../../components/shared/advertStatus'

const Advert = ({ advert }) => {
  const { _id, name, description, price, type, image, owner } = advert

  const navigate = useNavigate()
  const slug = slugify(name)

  // Renderizar la imagen desde la base de datos, usando buffer en el backend
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `data:image/jpeg;base64,${image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO'

  // Limitar nombre y descripción a 15 caracteres
  const shortName = name?.length > 15 ? name.slice(0, 15) + '…' : name
  const shortDescription =
    description?.length > 15 ? description.slice(0, 15) + '…' : description

  return (
    <div
      className="perspective cursor-pointer"
      onClick={() => navigate(`/adverts/${_id}/${slug}`)}
    >
      <div className="relative w-[200px] h-[200px] transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180">
        {/* Frente: Imagen */}
        <div className="absolute w-full h-full backface-hidden rounded-[15px] overflow-hidden border border-gray-300 shadow-lg">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Reverso: Info */}
        <div className="absolute w-full min-h-[200px] overflow-hidden rotate-y-180 backface-hidden rounded-[15px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-[#1f1f1f] text-white flex flex-col justify-between text-center space-y-2">
          <h3 className="text-lg font-bold text-white truncate drop-shadow">
            {shortName}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-3">
            {shortDescription}
          </p>
          <p className="text-lg font-semibold text-emerald-300">{price} €</p>
          <p className={`text-sm ${type ? 'text-blue-400' : 'text-rose-400'}`}>
            {type === 'sell' ? 'For sale' : 'Wanted'}
          </p>
          <div className="flex items-baseline justify-around">
            <Link
              to={`/users/${owner}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xl italic text-indigo-400 hover:underline truncate"
            >
              {owner}
            </Link>
            <AdvertStatus
              reserved={advert.reserved}
              iconSize={14}
              textSize="text-base"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advert
