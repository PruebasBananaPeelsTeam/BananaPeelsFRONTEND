import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import Advert from './Advert'

const UserPage = () => {
  const { username } = useParams()
  const [adverts, setAdverts] = useState([])
  const [loading, isLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserAdverts = async () => {
      try {
        const response = await client.get(`/api/users/${username}/adverts`)
        setAdverts(response.data)
      } catch (err) {
        setError('Error loading adverts')
      } finally {
        isLoading(false)
      }
    }
    fetchUserAdverts()
  }, [username])

  if (loading) return <Loader />
  if (error)
    return (
      <Page title="User" fullWidth>
        <p>{error}</p>
      </Page>
    )

  return (
    <Page title={`Ads from ${username}`} fullWidth>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">👤 {username}</h2>
        <p className="text-gray-500">Latest ads published by this user</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {adverts.length > 0 ? (
          adverts.map((advert) => <Advert key={advert._id} advert={advert} />)
        ) : (
          <p className="col-span-full text-center">No ads found.</p>
        )}
      </div>
    </Page>
  )
}

export default UserPage
