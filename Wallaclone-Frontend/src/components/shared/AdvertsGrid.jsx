// components/shared/AdvertsGrid.jsx
import Advert from '../../pages/adverts/Advert.jsx';
import Button from './button.jsx';

const AdvertsGrid = ({ adverts, currentPage, totalPages, onPrev, onNext }) => {
  return (
    <>
      {adverts.length > 0 ? (
        <>
          <div id="adverts-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {adverts.map((advert) => (
              <Advert key={advert._id} advert={advert} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button onClick={onPrev} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="mx-4 text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={onNext} disabled={currentPage === totalPages}>
              Next
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
