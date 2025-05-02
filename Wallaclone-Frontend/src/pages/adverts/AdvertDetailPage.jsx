// AdvertDetailPage.jsx
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getAdvertDetail,
  addFavorite,
  removeFavorite,
  toggleSoldAdvert,
} from '../../services/adverts-service'
import { isApiClientError } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import { useAuth } from '../../context/AuthContext'
import ReservedToggleButton from '../../components/shared/reservedToggleButton'
import AdvertStatus from '../../components/shared/advertStatus'
import Button from '../../components/shared/button'
import { useTranslation } from 'react-i18next'
import { checkChatByAdvert, getOrCreateChat } from '../../services/chat-service'
import { FaCheckCircle } from 'react-icons/fa'
import DeleteAdvertPage from './DeleteAdvertPage'
import { Heart, HeartOff } from 'lucide-react'

function AdvertDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [advert, setAdvert] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user, updateUserData } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (params.advertId && params.slug) {
      setLoading(true)
      getAdvertDetail(params.advertId, params.slug)
        .then((advert) => {
          advert._id = advert._id.toString()
          setAdvert(advert)
          const fav = user?.favorites?.some(
            (favId) => favId.toString() === advert._id,
          )
          setIsFavorite(fav)
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
  }, [params.advertId, params.slug, navigate, user])

  const handleStartChat = async () => {
    try {
      const existingChat = await checkChatByAdvert(advert._id)
      const chat = existingChat || (await getOrCreateChat(advert._id))
      navigate(`/chat/room/${chat._id}`)
    } catch (error) {
      console.error('Error al iniciar o encontrar chat:', error)
    }
  }

  const handleFavoriteToggle = async () => {
    try {
      let updatedFavorites
      if (isFavorite) {
        await removeFavorite(advert._id)
        updatedFavorites = user.favorites.filter(
          (id) => id.toString() !== advert._id.toString(),
        )
      } else {
        await addFavorite(advert._id)
        updatedFavorites = [...(user.favorites || []), advert._id.toString()]
      }
      updateUserData({ ...user, favorites: updatedFavorites })
      setIsFavorite(!isFavorite)
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
              alt={advert?.name || t('advertDetail.noImage')}
              className="w-full max-h-[300px] object-scale-down rounded-xl mb-2 mx-auto"
            />
            <div className="max-w-2xl mx-auto text-justify space-y-2 bg-gray-100 p-4 rounded-xl shadow">
              <p>
                <strong>{t('advertDetail.description')}:</strong>{' '}
                {advert.description}
              </p>
              <p>
                <strong>{t('advertDetail.price')}:</strong> {advert.price} €
              </p>
              <p>
                <strong>{t('advertDetail.type')}:</strong>{' '}
                {advert.type === 'buy'
                  ? t('advertDetail.typeWanted')
                  : t('advertDetail.typeForSale')}
              </p>
              <p>
                <strong>{t('advertDetail.categories')}:</strong>{' '}
                {advert.tags.join(', ')}
              </p>
              <p>
                <strong>{t('advertDetail.seller')}:</strong>{' '}
                <Link
                  to={`/users/${advert.owner?.username || advert.owner}`}
                  className="text-indigo-600 underline"
                >
                  {advert.owner?.username || advert.owner}
                </Link>
              </p>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-6">
              <div>
                <Button onClick={() => navigate('/')} className="w-full md:w-auto">
                  {t('advertDetail.backButton')}
                </Button>
              </div>

              {user && advert.owner._id !== user._id && (
                <div className="flex justify-center my-4">
                  <Button onClick={handleStartChat}>
                    {t('advertDetail.chatButton')}
                  </Button>
                </div>
              )}

              {user && advert.owner._id === user._id && advert._id && (
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <div>
                    <Button
                      onClick={() => navigate(`/adverts/${advert._id}/update`)}
                      className="w-full md:w-auto"
                    >
                      {t('advertDetail.updateButton')}
                    </Button>
                  </div>

                  <div className="w-full md:w-auto">
                    <DeleteAdvertPage />
                  </div>

                  <Button
                    onClick={async () => {
                      try {
                        const result = await toggleSoldAdvert(advert._id)
                        setAdvert((prev) => ({ ...prev, sold: result.sold }))
                      } catch (error) {
                        console.error('Error toggling sold status:', error)
                      }
                    }}
                    className="mb-4 ml-4"
                  >
                    {advert?.sold
                      ? t('advertDetail.markAsUnsold')
                      : t('advertDetail.markAsSold')}
                  </Button>

                  <ReservedToggleButton
                    advert={advert}
                    className="w-full md:w-auto"
                    onToggled={(newState) =>
                      setAdvert((prev) => ({ ...prev, reserved: newState }))
                    }
                  />
                </div>
              )}

              {user && advert._id && (
                <Button onClick={handleFavoriteToggle} className="mb-4 ml-2">
                  {isFavorite ? (
                    <span className="flex items-center gap-2 text-red-500">
                      <HeartOff size={18} /> {t('advertDetail.removeFromFavorites')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600">
                      <Heart size={18} /> {t('advertDetail.addToFavorites')}
                    </span>
                  )}
                </Button>
              )}

              <div className="w-full md:w-auto">
                <AdvertStatus
                  reserved={advert.reserved}
                  iconSize="28"
                  textSize="text-xl"
                />
              </div>

              {advert.sold && (
                <div className="flex items-center gap-2 bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold shadow ml-4">
                  <FaCheckCircle size={16} />
                  {t('advertDetail.sold')}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-600">{t('advertDetail.notFound')}</p>
      )}
    </Page>
  )
}

export default AdvertDetailPage
