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
      const chat = existingChat || (await getOrCreateChat(advert._id))
      navigate(`/chat/room/${chat._id}`)
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
            
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-2 md:p-4">
            
              {/* IMAGEN */}
              <div className="md:w-1/2 w-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={advert?.name || t('advertDetail.noImage')}
                  className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                />
              </div>

              {/* DETALLES Y BOTONES */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-left text-[rgb(13,31,15)] font-serif">
                {advert.name}
                </h2>
                <div className="space-y-2 text-gray-800 text-justify">
                  <p><strong>{t('advertDetail.description')}:</strong> {advert.description}</p>
                  <p><strong>{t('advertDetail.price')}:</strong> {advert.price} €</p>
                  <p><strong>{t('advertDetail.type')}:</strong> {advert.type === 'buy' ? t('advertDetail.typeWanted') : t('advertDetail.typeForSale')}</p>
                  <p><strong>{t('advertDetail.categories')}:</strong> {advert.tags.join(', ')}</p>
                  <p><strong>{t('advertDetail.seller')}:</strong>{' '}
                    <Link
                      to={`/users/${advert.owner}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline text-indigo-500 font-medium truncate"
                    >
                      @{advert.owner}
                    </Link>
                  </p>                    
                </div>

                {/* BOTONES */}
                <div className="flex flex-col gap-4">
                  {/* Primera fila */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button onClick={() => navigate(-1)} className="w-full md:w-auto">
                      {t("advertDetail.backButton")}
                    </Button>

                    {user && advert.owner === user.username && (
                      <>
                        <Button onClick={() => navigate(`/adverts/${advert._id}/update`)} className="w-full md:w-auto">
                          {t('advertDetail.updateButton')}
                        </Button>
                        <DeleteAdvertPage />
                      </>
                    )}

                    {user && advert.owner !== user.username && (
                      <>
                        <Button onClick={handleStartChat} className="w-full md:w-auto">
                          💬 Chat
                        </Button>
                        <Button onClick={handleFavoriteToggle} className="w-full md:w-auto">
                          {isFavorite ? (
                            <span className="flex items-center gap-2 text-pink-300">
                              <HeartOff size={18} /> {t('advertDetail.removeFromFavorites')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 text-pink-300">
                              <Heart size={18} /> {t('advertDetail.addToFavorites')}
                            </span>
                          )}
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Segunda fila (solo para propietario) */}
                  {user && advert.owner === user.username && (
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button
                        onClick={async () => {
                          try {
                            const result = await toggleSoldAdvert(advert._id)
                            setAdvert((prev) => ({ ...prev, sold: result.sold }))
                          } catch (error) {
                            console.error('Error toggling sold status:', error)
                          }
                        }}
                        className="w-full md:w-auto"
                      >
                        {advert?.sold ? t("advertDetail.markAsUnsold") : t("advertDetail.markAsSold")}
                      </Button>

                      <ReservedToggleButton
                        advert={advert}
                        className="w-full md:w-auto"
                        onToggled={(newState) =>
                          setAdvert((prev) => ({ ...prev, reserved: newState }))
                        }
                      />

                      <AdvertStatus
                        reserved={advert.reserved}
                        iconSize="20"
                        textSize="text-xl"
                      />

                      {advert.sold && (
                        <div className="flex items-center gap-2 bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold shadow w-full md:w-auto justify-center">
                          <FaCheckCircle size={16} />
                          {t('advertDetail.sold')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-600">{t('advertDetail.notFound')}</p>
        )}
</Page>

    );
}

export default AdvertDetailPage
