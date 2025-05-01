import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAdvertDetail } from '../../services/adverts-service'
import { isApiClientError } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import { useAuth } from '../../context/AuthContext'
import ReservedToggleButton from '../../components/shared/reservedToggleButton'
import AdvertStatus from '../../components/shared/advertStatus'
import Button from '../../components/shared/button'
import DeleteAdvertPage from './DeleteAdvertPage'
import { checkChatByAdvert, getOrCreateChat } from '../../services/chat-service'
import { toggleSoldAdvert } from '../../services/adverts-service'
import { FaCheckCircle } from 'react-icons/fa'

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

  // inicializador de chats
  const handleStartChat = async () => {
    try {
      const existingChat = await checkChatByAdvert(advert._id) // O advert.id si no es _id

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
              className="w-full max-h-[300px] object-scale-down rounded-xl mb-2 mx-auto"
            />
            
          <div className="max-w-2xl mx-auto text-justify space-y-2 bg-gray-100 p-4 rounded-xl shadow">
            <p >
              <strong>Description:</strong> {advert.description}
            </p>

            <p>
              <strong>Price:</strong> {advert.price} €
            </p>

            <p>
              <strong>Type:</strong>{' '}
              {advert.type === 'buy' ? 'Wanted' : 'For Sale'}{' '}
              {/* Mostrar el tipo de anuncio */}
            </p>

            <p>
              <strong>Tags:</strong> {advert.tags.join(', ')}
            </p>

            <p>
              <strong>Owner:</strong>{' '}
              {advert.owner?.username || advert.owner}
            </p>
          </div>

            {/* Botones y estado */}

            <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-6">

              {/* Botón Back */}
              <div>  
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full md:w-auto"
                >
                  ← Back
                </Button>
              </div>
              
              {/* Condición para mostrar los botones de actualización, eliminación y reserva */}
              {/* chat button */}
              {user && advert.owner._id !== user._id && (
                <div className="flex justify-center my-4">
                  <Button onClick={handleStartChat}>💬 Chat</Button>
                </div>
              )}

              {/* Update button */}
              {user && advert.owner._id === user._id && advert._id && (
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  
                    <div>
                      <Button
                        onClick={() => navigate(`/adverts/${advert._id}/update`) }
                        className="w-full md:w-auto"
                        
                      >
                        ✎ Update
                      </Button>
                    </div>
                      
                      
                      <div className="w-full md:w-auto">
                        <DeleteAdvertPage  />
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
              {/*reserved mark*/}
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
        <p className="text-red-600">No se encontró el anuncio.</p>
      )}
    </Page>
  )
}

export default AdvertDetailPage
