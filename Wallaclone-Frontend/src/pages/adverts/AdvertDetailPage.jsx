import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdvertDetail } from './service-adverts'; //Crear en service el delete
import Page from '../../components/layout/Page'; //Crear en layout
import { isApiClientError } from '../../api/client';
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
        <div title="Advert Detail">
        {advert ? (
          <div className="advert-details">
            <h2>{advert.name}</h2>
  
            {advert.image && <img src={advert.image} alt={advert.name} />}

            <p>
            <strong>Description:</strong> {advert.description}
          </p>

          <p>
            <strong>Price:</strong> {advert.price} €
          </p>

          <p>
            <strong>Type:</strong> {advert.type === 'sell' ? 'SALE' : 'BUY'}
          </p>

          <p>
            <strong>Tags:</strong> {advert.tags.join(', ')}
          </p>

          <p>
            <strong>Owner:</strong> {advert.owner.username || advert.owner}
          </p>

          {/* <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Advert'}
          </button> */}

        </div>

      ) : (

        <p>Loading advert details...</p>

      )}
    </div>
  );
    
}