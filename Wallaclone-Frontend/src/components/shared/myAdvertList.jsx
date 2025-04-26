import { useEffect, useState } from 'react'
import { getMyAdverts } from '../../services/adverts-service.js'
import Advert from '../../pages/adverts/Advert.jsx'
import Loader from '../shared/loader.jsx'

const MyAdvertList = () => {
  const [adverts, setAdverts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMyAdverts = async () => {
      try {
        const { results = [] } = await getMyAdverts(); // <-- Solo nos interesa results aquí
        setAdverts(results)
      } catch (err) {
        setError('Error loading adverts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMyAdverts()
  }, [])

  if (loading) return <Loader />
  if (error) return <p className="text-red-500">{error}</p>
  if (adverts.length === 0) return <p>You haven't created any adverts yet.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {adverts.map((advert) => (
        <Advert key={advert._id} advert={advert} />
      ))}
    </div>
  )
}

export default MyAdvertList
