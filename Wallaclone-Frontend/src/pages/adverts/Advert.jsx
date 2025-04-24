import { Link } from 'react-router-dom'
import { slugify } from '../../utils/slugify'

const Advert = ({ advert }) => {
  const { _id, name, description, price, type, image, owner } = advert

  const slug = slugify(name)
  const baseURL = import.meta.env.VITE_API_URL

  // Renderizar la imagen desde la base de datos, usando buffer en el backend
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `data:image/jpeg;base64,${image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO'

  // Limitar nombre y descripción a 15 caracteres
  const shortName = name?.length > 15 ? name.slice(0, 15) + '…' : name
  const shortDescription = description?.length > 15 ? description.slice(0, 15) + '…' : description

  return (
    <Link to={`/adverts/${_id}/${slug}`} className="perspective">
      <div className="relative w-[200px] h-[200px] transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180 cursor-pointer">
        
        {/* Frente: Imagen */}
        <div className="absolute w-full h-full backface-hidden rounded-[15px] overflow-hidden border border-gray-300 shadow-lg">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Reverso: Info */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-[15px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-[#1f1f1f] text-white flex flex-col justify-center text-center space-y-3">
          <h3 className="text-lg font-bold text-white truncate drop-shadow">{shortName}</h3>
          <p className="text-sm text-gray-300 line-clamp-3">{shortDescription}</p>
          <p className="text-lg font-semibold text-emerald-300">{price} €</p>
          <p className={`text-sm ${type ? 'text-blue-400' : 'text-rose-400'}`}>
            {type === 'sell' ? 'For sale' : 'Wanted'}
          </p>
          <p className="text-xs text-gray-400 italic">{owner}</p>
        </div>
      </div>
    </Link>
  )
}

export default Advert
