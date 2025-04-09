import { useEffect, useState } from 'react'
import { getAdvertList } from '../../services/adverts-service.js'
import Advert from './Advert.jsx'

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
    
    <div className="adverts-list">
      <p>LISTADO DE ANUNCIOS</p>
      {results.length > 0 ? (
        results.map((advert) => <Advert key={advert._id} advert={advert} />)
      ) : (
        <p>No adverts available</p>
      )}
    </div>
  )
}

export default AdvertsPage