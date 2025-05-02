import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../api/client'
import Page from '../../components/layout/page'
import Loader from '../../components/shared/loader'
import AdvertsGrid from '../../components/shared/AdvertsGrid'
import { useTranslation } from 'react-i18next'

const UserPage = () => {
  const { t } = useTranslation()
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
        setError(t('userPage.errorLoading'))
      } finally {
        setLoading(false)
      }
    }

    fetchUserAdverts()
  }, [username, currentPage, t])

  if (loading) return <Loader />

  if (error)
    return (
      <Page title={t('userPage.title')} fullWidth>
        <p>{error}</p>
      </Page>
    )

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <Page title={t('userPage.adsFrom', { username })} fullWidth>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">👤 {username}</h2>
        <p className="text-gray-500">{t('userPage.latestAds')}</p>
      </div>

      <AdvertsGrid
        adverts={adverts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
      />
    </Page>
  )
}

export default UserPage
