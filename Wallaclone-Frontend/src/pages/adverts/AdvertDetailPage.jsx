import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAdvertDetail, addFavorite, removeFavorite } from '../../services/adverts-service'
import { isApiClientError } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import { useAuth } from '../../context/AuthContext'
import ReservedToggleButton from '../../components/shared/reservedToggleButton'
import AdvertStatus from '../../components/shared/advertStatus'
import Button from '../../components/shared/button'
import DeleteAdvertPage from './DeleteAdvertPage'
import { Heart, HeartOff } from 'lucide-react'

function AdvertDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [advert, setAdvert] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user, updateUserData } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  // Obtener anuncio
  useEffect(() => {
    if (params.advertId && params.slug) {
      setLoading(true)
      getAdvertDetail(params.advertId, params.slug)
        .then(advert => {
          advert._id = advert._id.toString() // 👈 aseguramos el formato
          setAdvert(advert)

          // Comprobamos si está en favoritos
          const fav = user?.favorites?.some(
            favId => favId.toString() === advert._id
          )
          setIsFavorite(fav)

          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          if (isApiClientError(error) && error.code === 'NOT_FOUND') {
            navigate('/404')
          }
        })
    }
  }, [params.advertId, params.slug, navigate, user])

  // Añadir o quitar favorito
  const handleFavoriteToggle = async () => {
    try {
      let updatedFavorites

      if (isFavorite) {
        await removeFavorite(advert._id)
        updatedFavorites = user.favorites.filter(
          id => id.toString() !== advert._id.toString()
        )
      } else {
        await addFavorite(advert._id)
        updatedFavorites = [...(user.favorites || []), advert._id.toString()]
      }

      updateUserData({ ...user, favorites: updatedFavorites })
      setIsFavorite(!isFavorite)

      // Depuración
      console.log('✅ Favorito actualizado:', !isFavorite)
      console.log('🧠 updatedFavorites:', updatedFavorites)
      console.log('🆔 advert._id:', advert._id.toString())
    } catch (error) {
      console.error('❌ Error actualizando favorito:', error)
    }
  }

  const imageUrl = advert?.image
    ? advert.image.startsWith('http')
      ? advert.image
      : `data:image/jpeg;base64,${advert.image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO'

  return (
    <Page>
      {loading ? (
        <Loader />
      ) : advert ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center text-[rgb(223,184,13)] font-serif">
            {advert.name}
          </h2>
          <div className="text-black">
            <img
              src={imageUrl}
              alt={advert?.name || 'No image'}
              className="w-full max-h-64 object-cover rounded-xl mb-4"
            />

            <p><strong>Description:</strong> {advert.description}</p>
            <p><strong>Price:</strong> {advert.price} €</p>
            <p><strong>Tipe:</strong> {advert.type === 'buy' ? 'Wanted' : 'For Sale'}</p>
            <p><strong>Tags:</strong> {advert.tags.join(', ')}</p>
            <p><strong>Seller:</strong> {advert.owner?.username || advert.owner}</p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button onClick={() => navigate('/')} className="mb-4">← Back</Button>

              {user && advert.owner._id === user._id && (
                <>
                  <Button
                    onClick={() => navigate(`/adverts/${advert._id}/update`)}
                    className="mb-4 ml-2"
                  >
                    ✎ Update
                  </Button>

                  <DeleteAdvertPage />

                  <ReservedToggleButton
                    advert={advert}
                    onToggled={(newState) =>
                      setAdvert(prev => ({ ...prev, reserved: newState }))
                    }
                  />
                </>
              )}

              {user && advert._id && (
                <Button onClick={handleFavoriteToggle} className="mb-4 ml-2">
                  {isFavorite ? (
                    <span className="flex items-center gap-2 text-red-500">
                      <HeartOff size={18} /> Quitar de favoritos
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600">
                      <Heart size={18} /> Añadir a favoritos
                    </span>
                  )}
                </Button>
              )}

              <AdvertStatus
                reserved={advert.reserved}
                iconSize="28"
                textSize="text-xl"
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-600">No se encontró el anuncio.</p>
      )}
    </Page>
  )
}

export default AdvertDetailPage
