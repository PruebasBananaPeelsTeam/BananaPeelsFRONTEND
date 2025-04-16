import { useEffect, useState } from 'react';
import { getAdvertList } from '../../services/adverts-service.js';
import Advert from './Advert.jsx';
import Button from '../../components/shared/button.jsx';
import { useSearchParams } from 'react-router-dom'; // Importa useSearchParams

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams(); // Obtén los parámetros de búsqueda
  const limit = 10;

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      try {
        // Construye el objeto de filtros a partir de los parámetros de búsqueda
        const filters = {};
        for (const [key, value] of searchParams.entries()) {
          filters[key] = value;
        }

        // Pasa la página actual, el límite y los filtros
        const response = await getAdvertList(currentPage, limit, filters);
        console.log(response);
        setAdverts(response);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching adverts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
    // El useEffect se ejecutará cuando cambie currentPage o los searchParams
  }, [currentPage, searchParams]);

  if (loading) {
    return <div>Loading...</div>
  }

  const { results } = adverts;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {results?.length > 0 ? ( // Añadido optional chaining para evitar errores si results es undefined
          results.map((advert) => <Advert key={advert._id} advert={advert} />)
        ) : (
          <p>No adverts available</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
}

export default AdvertsPage;