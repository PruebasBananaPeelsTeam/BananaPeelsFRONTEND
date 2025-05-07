// components/shared/AdvertsGrid.jsx
import Advert from '../../pages/adverts/Advert.jsx';
import Button from './button.jsx';
import { useTranslation } from 'react-i18next'

const AdvertsGrid = ({ adverts, currentPage, totalPages, onPrev, onNext }) => {
  const { t } = useTranslation()
  return (
    <>
      {adverts.length > 0 ? (
        <>
          <div id="adverts-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {adverts.map((advert) => (
              <Advert key={advert._id} advert={advert} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-2 sm:gap-4 text-center">
            <Button onClick={onPrev} disabled={currentPage === 1}>
            {t("AdvertsGrid.paginationBack")}
            </Button>
            <span className="mx-4 text-gray-800">
            {t("AdvertsGrid.pagination")} {currentPage} {t("AdvertsGrid.pagination1")} {totalPages}
            </span>
            <Button onClick={onNext} disabled={currentPage === totalPages}>
            {t("AdvertsGrid.paginationNext")}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No adverts found.</p>
      )}
    </>
  );
};

export default AdvertsGrid;
