import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdvertDetail } from '../../services/adverts-service'
import { isApiClientError } from '../../api/client';
import Page from '../../components/layout/page';

//Revisar si nos hace falta un ConfirmationDialog para confirmar la eliminacion cuando la hagamos


function AdvertDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [advert, setAdvert] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params.advertId && params.slug) {
          setLoading(true);

          getAdvertDetail(params.advertId, params.slug)
            .then((advert) => {
                setAdvert(advert)
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


      return (
        <Page>
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl space-y-6 mx-auto">
            {loading ? (
              <p className="text-blue-600 text-center">Loading...</p>
            ) : advert ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-[rgb(223,184,13)] font-serif">
                  {advert.name}
                </h2>
      
                {advert.image && (
                  <img
                    src={advert.image}
                    alt={advert.name}
                    className="w-full max-h-64 object-cover rounded-xl mb-4"
                  />
                )}
      
                <p>
                  <strong>Descripción:</strong> {advert.description}
                </p>
      
                <p>
                  <strong>Precio:</strong> {advert.price} €
                </p>
      
                <p>
                  <strong>Tipo:</strong>{' '}
                  {advert.type === 'sell' ? 'En venta' : 'Se busca'}
                </p>
      
                <p>
                  <strong>Categorías:</strong> {advert.tags.join(', ')}
                </p>
      
                <p>
                  <strong>Vendedor:</strong> {advert.owner?.username || advert.owner}
                </p>
              </div>
            ) : (
              <p className="text-red-600">No se encontró el anuncio.</p>
            )}
          </div>
        </Page>
      );
      
}

export default AdvertDetailPage