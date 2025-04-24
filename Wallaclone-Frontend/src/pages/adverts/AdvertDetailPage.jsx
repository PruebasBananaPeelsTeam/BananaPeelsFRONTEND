import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAdvertDetail } from '../../services/adverts-service'
import { isApiClientError } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import { useAuth } from '../../context/AuthContext'
import ReservedToggleButton from '../../components/shared/reservedToggleButton'
import Button from '../../components/shared/button'

function AdvertDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [advert, setAdvert] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (params.advertId && params.slug) {
      setLoading(true)

      getAdvertDetail(params.advertId, params.slug)
        .then((advert) => {
          setAdvert(advert)
          setLoading(false)
        })

        .catch((error) => {
          setLoading(false)
          if (isApiClientError(error)) {
            if (error.code === 'NOT_FOUND') {
              navigate('/404')
            }
          }
        })
    }
  }, [params.advertId, params.slug, navigate])

  // Pare renderizar la imagen desde la base de datos, usando buffer en el backend
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
            src={
              advert?.image
                ? advert.image.startsWith('http')
                  ? advert.image
                  : `data:image/jpeg;base64,${advert.image}`
                : 'https://fakeimg.pl/600x400?text=NO+PHOTO'
            }
            alt={advert?.name || 'No image'}
            className="w-full max-h-64 object-cover rounded-xl mb-4"
          />

            <p>
              <strong>Descripción:</strong> {advert.description}
            </p>

            <p>
              <strong>Precio:</strong> {advert.price} €
            </p>

            <p>
              <strong>Type:</strong>{' '}
              {advert.type === 'buy' ? 'Wanted' : 'For Sale'}{' '}
              {/* Cambiado para mostrar el tipo de anuncio */}
            </p>

            <p>
              <strong>Categorías:</strong> {advert.tags.join(', ')}
            </p>

            <p>
              <strong>Vendedor:</strong>{' '}
              {advert.owner?.username || advert.owner}
            </p>

            <Button onClick={() => navigate('/')} className="mb-4">
              ← Back
            </Button>

            {user && advert.owner._id === user._id && advert._id && (
              <>
              <Button onClick={() => navigate(`/adverts/${advert._id}/update`)} className="mb-4 ml-4">
                ✎ Update
              </Button>
              <ReservedToggleButton
                advert={advert}
                onToggled={(newState) =>
                  setAdvert((prev) => ({ ...prev, reserved: newState }))
                }
              />
              </>

            )}
          </div>
        </>
      ) : (
        <p className="text-red-600">No se encontró el anuncio.</p>
      )}
    </Page>
  )
}

export default AdvertDetailPage
