import { useEffect, useState } from 'react'
import { getAdvertList } from '../../services/adverts-service.js'
import Advert from './Advert.jsx'
import Layout from '../../components/layout/layout.jsx'

function AdvertsPage() {
  const [adverts, setAdverts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true)
      try {
        const response = await getAdvertList()
        console.log(response)
        setAdverts(response)
      } catch (error) {
        console.error('Error fetching adverts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAdverts()
  }, [])

  if (loading) {
    return <div>Loading...</div> // O puedes mostrar un spinner de carga aquí.
  }
  const { results } = adverts
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {results.length > 0 ? (
          results.map((advert) => <Advert key={advert._id} advert={advert} />)
        ) : (
          <p>No adverts available</p>
        )}
      </div>
    </Layout>
  )
}

export default AdvertsPage