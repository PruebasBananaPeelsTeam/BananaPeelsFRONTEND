import { useEffect, useState } from 'react';
import { getMyAdverts } from '../../services/adverts-service.js';
import Loader from '../../components/shared/loader.jsx';
import { isApiClientError } from '../../api/client.js';
import AdvertsGrid from '../../components/shared/AdvertsGrid.jsx';

function MyAdvertsBlock() {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchMyAdverts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results = [], totalPages = 1 } = await getMyAdverts(currentPage, limit);
        setAdverts(results);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching my adverts:', error);
        if (isApiClientError(error)) {
          setError(error.response?.data?.error || 'Error loading adverts');
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyAdverts();
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="shadow-md border border-gray-500 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6"> My Adverts </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <AdvertsGrid
          adverts={adverts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}
    </div>
  );
}

export default MyAdvertsBlock;
