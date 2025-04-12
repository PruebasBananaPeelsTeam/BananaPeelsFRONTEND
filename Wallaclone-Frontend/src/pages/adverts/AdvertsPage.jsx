import { useEffect, useState } from 'react'
import { getAdvertList } from '../../services/adverts-service.js'
import Advert from './Advert.jsx'
import Button from '../../components/shared/button.jsx'

function AdvertsPage() {
  // Estado para los anuncios, carga, y paginación
  const [adverts, setAdverts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // Página actual
  const [totalPages, setTotalPages] = useState(1) // Total de páginas

  const limit = 10 // Anuncios por página

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true)
      try {
        // Pasamos la página actual y el límite
        const response = await getAdvertList(currentPage, limit)
        console.log(response)
        setAdverts(response)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Error fetching adverts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAdverts()
  }, [currentPage]) // Se ejecuta cada vez que cambie la página

  if (loading) {
    return <div>Loading...</div> // O puedes mostrar un spinner de carga aquí.
  }

  const { results } = adverts

  // Función para cambiar a la siguiente página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Función para cambiar a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {results.length > 0 ? (
          results.map((advert) => <Advert key={advert._id} advert={advert} />)
        ) : (
          <p>No adverts available</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default AdvertsPage
