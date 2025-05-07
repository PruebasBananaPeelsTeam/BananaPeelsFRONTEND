import { useEffect, useState } from 'react';
import { getFavorites } from '../../services/adverts-service';
import Loader from '../../components/shared/loader.jsx';
import AdvertsGrid from '../../components/shared/AdvertsGrid.jsx';
import { useTranslation } from 'react-i18next';

const FavoritesPage = () => {
  const { t } = useTranslation()
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

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
    <div className="shadow-md border border-gray-500 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{t("favorites.title")}</h2>

      {loading ? (
        <Loader />
      ) : (
        <AdvertsGrid
          adverts={favorites}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
