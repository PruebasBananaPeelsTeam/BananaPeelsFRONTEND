import { useEffect, useState } from 'react';
import { getMyAdverts } from '../../services/adverts-service.js';
import Advert from './Advert.jsx';
import Loader from '../../components/shared/loader.jsx';
import Button from '../../components/shared/button.jsx';
import { isApiClientError } from '../../api/client.js';

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
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-4">My Adverts</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {adverts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                {adverts.map((advert) => (
                  <Advert key={advert._id} advert={advert} />
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span className="mx-4 text-gray-800">
                  Page {currentPage} of {totalPages}
                </span>
                <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center w-full col-span-full">
              No adverts created yet.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MyAdvertsBlock;
