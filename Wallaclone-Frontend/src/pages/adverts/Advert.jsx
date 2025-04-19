import { Link } from 'react-router-dom'
import { slugify } from '../../utils/slugify'

const Advert = ({ advert }) => {
  const { _id, name, description, price, type, image, owner } = advert

  const slug = slugify(name)

  const baseURL = import.meta.env.VITE_API_URL

  const imageUrl = image
    ? image.startsWith('http://') || image.startsWith('https://')
      ? image
      : `${baseURL}/images/${image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO'

  return (
    <Link to={`/adverts/${_id}/${slug}`}>
      <article className="advert cursor-pointer">
        <div className="advert-details">
          <div>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-50 object-cover mb-3"
            />
          </div>
          <div className="flex flex-col items-center space-y-1 text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-gray-600">{name}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-600">{price}€</p>
              <p className="text-sm">{type ? 'For sale' : 'For wanted'}</p>
            </div>
            <p className="text-xs text-gray-500">{owner}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Advert
