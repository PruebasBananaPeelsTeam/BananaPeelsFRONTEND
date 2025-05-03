// pages/adverts/AdvertsPage.jsx
import { useEffect, useState } from 'react'
import { getAdvertList } from '../../services/adverts-service.js'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../components/shared/loader.jsx'
import AdvertsGrid from '../../components/shared/AdvertsGrid.jsx'
import { useTranslation } from 'react-i18next'

function AdvertsPage() {
  const { t } = useTranslation()
  const [adverts, setAdverts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = 15

  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true)
      try {
        const filters = Object.fromEntries(searchParams.entries())
        filters.tag = searchParams.getAll('tag')
        const pageFromUrl = parseInt(searchParams.get('page')) || 1
        setCurrentPage(pageFromUrl)

        const response = await getAdvertList(pageFromUrl, limit, filters)
        setAdverts(response.results)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Error fetching adverts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdverts()
  }, [searchParams])

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', currentPage + 1)
      setSearchParams(newParams)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', currentPage - 1)
      setSearchParams(newParams)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="p-6 ml-10 mr-10 mt-10 mb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] mb-10 ml-2">
        {t("AdvertsPage.title")}
      </h1>
      <AdvertsGrid
        adverts={adverts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
      />
    </div>
  )
}

export default AdvertsPage
