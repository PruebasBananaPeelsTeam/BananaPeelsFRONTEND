import { useEffect, useState } from 'react';
import { getFavorites } from '../../services/adverts-service';
import Advert from './Advert.jsx';
import Button from '../../components/shared/button.jsx';
import Loader from '../../components/shared/loader.jsx';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // número de favoritos por página

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await getFavorites(currentPage, limit, 'desc');
        setFavorites(response.results);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">⭐ My Favorites</h2>

      {loading ? (
        <Loader />
      ) : favorites.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {favorites.map((advert) => (
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
        <p className="text-center text-gray-600">No favorites found.</p>
      )}
    </>
  );
};

export default FavoritesPage;
