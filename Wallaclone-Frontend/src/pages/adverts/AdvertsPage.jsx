import { useEffect, useState } from 'react';
import { getAdvertList } from '../../services/adverts-service.js';
import Advert from './Advert.jsx';
import Button from '../../components/shared/button.jsx';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/shared/loader.jsx'

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const limit = 10;

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      try {
        const filters = Object.fromEntries(searchParams.entries());
        filters.tag = searchParams.getAll('tag');

        const response = await getAdvertList(currentPage, limit, filters);
        setAdverts(response);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching adverts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [currentPage, searchParams]);

  if (loading) {
    return <Loader />;
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
      <div id="adverts-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {results?.length > 0 ? (
          results.map((advert) => <Advert key={advert._id} advert={advert} />)
        ) : (
          <p>No adverts available</p>
        )}
      </div>

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
