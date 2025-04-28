import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdvertDetail, deleteAdvert } from '../../services/adverts-service'
import Button from '../../components/shared/button.jsx'
import Loader from '../../components/shared/loader.jsx'
import Page from '../../components/layout/page.jsx'
import ConfirmationModalCard from './confirmationModalCard.jsx'

function DeleteAdvertPage() {
  const { advertId } = useParams()
  const navigate = useNavigate()

  // Estados para manejar el loading, el estado del modal de confirmación, y el error
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState(null)
  const [advert, setAdvert] = useState(null)

  // useEffect para cargar los detalles del anuncio cuando se monta el componente
  useEffect(() => {

    const fetchAdvertDetails = async () => {
      setLoading(true) 
      setError(null) 

      try {
        // Llamada al servicio para obtener los detalles
        const advertDetails = await getAdvertDetail(advertId) 
        // Guardar los detalles del anuncio
        setAdvert(advertDetails) 
      } catch (err) {
        setError('An error occurred while fetching the advert details.')
      } finally {
        setLoading(false) 
      }
    }

    // Llamada a la función para cargar los detalles
    fetchAdvertDetails() 
  }, [advertId]) 


  // Función que maneja la eliminación del anuncio
  const handleDelete = async () => {
    setLoading(true) 

    try {
      // Llamada al servicio para eliminar el anuncio
      await deleteAdvert(advertId) 
      navigate('/adverts') 
    } catch (err) {
      setError('An error occurred while deleting the advert.') 
    } finally {
      setLoading(false) 
      setShowConfirmation(false) 
    }
  }

  // Funciones para abrir y cerrar el modal de confirmación
  const openConfirmationModal = () => { setShowConfirmation(true) }
  const closeConfirmationModal = () => { setShowConfirmation(false) }

  // Si el anuncio aún se está cargando, mostrar un loader
  if (loading) {
    return <Loader /> 
  }

  // Si hay un error al cargar los detalles del anuncio, mostrar un mensaje de error
  if (error) {
    return <div>{error}</div> 
  }

  return (
    <Page>
        <div>  
            <Button onClick={openConfirmationModal}>Delete Advert</Button>
            {/* Modal de confirmación */}
            {showConfirmation && (
                <ConfirmationModalCard
                message="Are you sure you want to delete this advert?" // Mensaje del modal
                onConfirm={handleDelete} // Acción cuando se confirme la eliminación
                onCancel={closeConfirmationModal} // Acción cuando se cancele la eliminación
                />
            )}
        </div>
    </Page>
  )
}

export default DeleteAdvertPage
