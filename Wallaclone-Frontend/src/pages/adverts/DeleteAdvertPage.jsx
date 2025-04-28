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
      setLoading(true) // Iniciar el loading
      setError(null) // Limpiar cualquier error previo

      try {
        const advertDetails = await getAdvertDetail(advertId) // Llamada al servicio para obtener los detalles
        setAdvert(advertDetails) // Guardar los detalles del anuncio
      } catch (err) {
        setError('An error occurred while fetching the advert details.') // Mostrar error si no se pueden cargar los detalles
      } finally {
        setLoading(false) // Detener el loading una vez que se obtiene la respuesta
      }
    }

    fetchAdvertDetails() // Llamada a la función para cargar los detalles
  }, [advertId]) // Dependencia para volver a cargar si el advertId cambia

  // Función que maneja la eliminación del anuncio
  const handleDelete = async () => {
    setLoading(true) // Iniciar el loading mientras se procesa la eliminación

    try {
      await deleteAdvert(advertId) // Llamada al servicio para eliminar el anuncio
      navigate('/adverts') // Redirigir al listado de anuncios si la eliminación es exitosa
    } catch (err) {
      setError('An error occurred while deleting the advert.') // Mostrar un mensaje de error si algo sale mal
    } finally {
      setLoading(false) // Detener el loading una vez que se obtiene la respuesta
      setShowConfirmation(false) // Cerrar el modal de confirmación
    }
  }

  // Función para abrir el modal de confirmación
  const openConfirmationModal = () => {
    setShowConfirmation(true) // Cambiar el estado para mostrar el modal
  }

  // Función para cerrar el modal de confirmación
  const closeConfirmationModal = () => {
    setShowConfirmation(false) // Cambiar el estado para cerrar el modal
  }

  // Si el anuncio aún se está cargando, mostrar un loader
  if (loading) {
    return <Loader /> // Mostrar el Loader mientras se cargan los detalles o se procesa la eliminación
  }

  // Si hay un error al cargar los detalles del anuncio, mostrar un mensaje de error
  if (error) {
    return <div>{error}</div> // Mostrar el error si algo salió mal
  }

  return (
    <div>
      {/* Mensaje de confirmación antes de eliminar */}
      <h1>Are you sure you want to delete this advert?</h1>
      <p>{advert ? advert.name : 'Loading...'}</p>{' '}
      {/* Mostrar el nombre del anuncio o mensaje de carga */}
      {/* Botón para abrir el modal de confirmación */}
      <button onClick={openConfirmationModal}>Delete Advert</button>
      {/* Modal de confirmación */}
      {showConfirmation && (
        <ConfirmationModalCard
          message="Are you sure you want to delete this advert?" // Mensaje del modal
          onConfirm={handleDelete} // Acción cuando se confirme la eliminación
          onCancel={closeConfirmationModal} // Acción cuando se cancele la eliminación
        />
      )}
    </div>
  )
}

export default DeleteAdvertPage
