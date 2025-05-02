import { useNavigate, useParams } from 'react-router-dom'
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
import {
  checkChatByAdvert,
  getOrCreateChat,
} from '../../services/chat-service'
import { FaCheckCircle } from 'react-icons/fa'
import DeleteAdvertPage from './DeleteAdvertPage'
import { Heart, HeartOff } from 'lucide-react'

function AdvertDetailPage() {
  const { t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [advert, setAdvert] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user, toggleFavorite } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  // ⚠️ Este solo carga el anuncio, sin depender de user
  useEffect(() => {
    if (params.advertId && params.slug) {
      setLoading(true)

      getAdvertDetail(params.advertId, params.slug)
        .then(advert => {
          advert._id = advert._id.toString()
          setAdvert(advert)
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          if (isApiClientError(error) && error.code === 'NOT_FOUND') {
            navigate('/404')
          }
        })
    }
  }, [params.advertId, params.slug])

  // ✅ Este detecta si el anuncio está en favoritos
  useEffect(() => {
    if (advert && user?.favorites) {
      const fav = user.favorites.some(
        favId => favId.toString() === advert._id
      )
      setIsFavorite(fav)
    }
  }, [user?.favorites, advert])

  const handleFavoriteToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (isFavorite) {
        await removeFavorite(advert._id)
        toggleFavorite(advert._id.toString(), false)
      } else {
        await addFavorite(advert._id)
        toggleFavorite(advert._id.toString(), true)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('❌ Error actualizando favorito:', error)
    }
  }

  const handleStartChat = async () => {
    try {
      const existingChat = await checkChatByAdvert(advert._id)
      if (existingChat) {
        navigate(`/chat/room/${existingChat._id}`)
      } else {
        const newChat = await getOrCreateChat(advert._id)
        navigate(`/chat/room/${newChat._id}`)
      }
    } catch (error) {
      console.error('Error al iniciar o encontrar chat:', error)
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
              <p><strong>{t('advertDetail.description')}:</strong> {advert.description}</p>
              <p><strong>{t('advertDetail.price')}:</strong> {advert.price} €</p>
              <p><strong>{t('advertDetail.type')}:</strong> {advert.type === 'buy' ? t('advertDetail.typeWanted') : t('advertDetail.typeForSale')}</p>
              <p><strong>{t('advertDetail.categories')}:</strong> {advert.tags.join(', ')}</p>
              <p><strong>{t('advertDetail.seller')}:</strong> {advert.owner?.username || advert.owner}</p>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-6">
              <div>
                <Button onClick={() => navigate('/')} className="w-full md:w-auto">← Back</Button>
              </div>

              {user && advert.owner._id !== user._id && (
                <div className="flex justify-center my-4">
                  <Button onClick={handleStartChat}>💬 Chat</Button>
                </div>
              )}

              {user && advert.owner._id === user._id && advert._id && (
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <Button onClick={() => navigate(`/adverts/${advert._id}/update`)} className="w-full md:w-auto">
                    {t('advertDetail.updateButton')}
                  </Button>

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
                    {advert?.sold ? '✔ Mark as Unsold' : '💰 Mark as Sold'}
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
                <Button type="button" onClick={(e) => handleFavoriteToggle(e)} className="mb-4 ml-2">
                  {isFavorite ? (
                    <span className="flex items-center gap-2 text-red-500">
                      <HeartOff size={18} /> Remove from favorites
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600">
                      <Heart size={18} /> Add to favorites
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
                  Sold
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
