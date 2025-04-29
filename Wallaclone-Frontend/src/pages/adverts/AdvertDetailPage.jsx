import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdvertDetail } from '../../services/adverts-service';
import { isApiClientError } from '../../api/client';
import Page from '../../components/layout/page';
import Loader from '../../components/shared/loader';
import { useAuth } from '../../context/AuthContext';
import ReservedToggleButton from '../../components/shared/reservedToggleButton';
import AdvertStatus from '../../components/shared/advertStatus';
import Button from '../../components/shared/button';
import { useTranslation } from 'react-i18next'; 

function AdvertDetailPage() {
  const { t } = useTranslation(); //  Hook de traducción
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (params.advertId && params.slug) {
      setLoading(true);

      getAdvertDetail(params.advertId, params.slug)
        .then((advert) => {
          setAdvert(advert);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (isApiClientError(error)) {
            if (error.code === 'NOT_FOUND') {
              navigate('/404');
            }
          }
        });
    }
  }, [params.advertId, params.slug, navigate]);

  const imageUrl = advert?.image
    ? advert.image.startsWith('http')
      ? advert.image
      : `data:image/jpeg;base64,${advert.image}`
    : 'https://fakeimg.pl/600x400?text=NO+PHOTO';

  return (
    <Page>
      {loading ? (
        <Loader />
      ) : advert ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center text-[rgb(223,184,13)] font-serif">
            {advert.name}
          </h2>
          <div className="text-black">
            <img
              src={imageUrl}
              alt={advert?.name || t('advertDetail.noImage')} // 👈 Traducción
              className="w-full max-h-64 object-cover rounded-xl mb-4"
            />

            <p>
              <strong>{t('advertDetail.description')}:</strong> {advert.description}
            </p>

            <p>
              <strong>{t('advertDetail.price')}:</strong> {advert.price} €
            </p>

            <p>
              <strong>{t('advertDetail.type')}:</strong>{' '}
              {advert.type === 'buy'
                ? t('advertDetail.typeWanted')
                : t('advertDetail.typeForSale')}
            </p>

            <p>
              <strong>{t('advertDetail.categories')}:</strong> {advert.tags.join(', ')}
            </p>

            <p>
              <strong>{t('advertDetail.seller')}:</strong>{' '}
              {advert.owner?.username || advert.owner}
            </p>

            <div className="flex justify-between">
              <Button onClick={() => navigate('/')} className="mb-4">
                {t('advertDetail.backButton')}
              </Button>

              {user && advert.owner._id === user._id && advert._id && (
                <>
                  <Button
                    onClick={() => navigate(`/adverts/${advert._id}/update`)}
                    className="mb-4 ml-4"
                  >
                    {t('advertDetail.updateButton')}
                  </Button>
                  <ReservedToggleButton
                    advert={advert}
                    onToggled={(newState) =>
                      setAdvert((prev) => ({ ...prev, reserved: newState }))
                    }
                  />
                </>
              )}

              <AdvertStatus
                reserved={advert.reserved}
                iconSize="28"
                textSize="text-xl"
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-600">{t('advertDetail.notFound')}</p>
      )}
    </Page>
  );
}

export default AdvertDetailPage;
