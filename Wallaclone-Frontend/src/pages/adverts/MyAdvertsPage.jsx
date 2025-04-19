import { useEffect, useState } from 'react'
import {getMyAdverts} from '../../services/adverts-service.js'
import Advert from './Advert.jsx'
import { isApiClientError } from '../../api/client'
import Page from '../../components/layout/page'


function MyAdvertsPage() {
    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchMyAdverts = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const myAdverts = await getMyAdverts();
            setAdverts(myAdverts);
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
      }, []);
    
      if (loading) {
        return <div>Loading adverts...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (adverts.length === 0) {
        return <div>No adverts found.</div>;
      }
    
      return (
        <Page title="My Adverts" fullWidth={true}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {adverts.length > 0 ? (
              adverts.map((advert) => <Advert key={advert._id} advert={advert} />)
            ) : (
              <p className="text-center w-full col-span-full">No adverts created yet.</p>
            )}
          </div>
        </Page>
      )
}

export default MyAdvertsPage;
