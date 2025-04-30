import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import Advert from './Advert'
import FloatingNavButtons from '../../components/shared/FloatingNavButtons'

const UserPage = () => {
  const { username } = useParams()
  const [adverts, setAdverts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  useEffect(() => {
    const fetchUserAdverts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await client.get(`/api/users/${username}/adverts`, {
          params: { page: currentPage, limit },
        })
        setAdverts(response.data.results || [])
        setTotalPages(response.data.totalPages || 1)
      } catch (err) {
        setError('Error loading adverts')
      } finally {
        setLoading(false)
      }
    }

    fetchUserAdverts()
  }, [username, currentPage])

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

      <FloatingNavButtons
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </Page>
  )
}

export default UserPage
