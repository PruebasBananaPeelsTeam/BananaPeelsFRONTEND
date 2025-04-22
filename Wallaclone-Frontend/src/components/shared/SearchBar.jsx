import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/button.jsx'
import FormErrorPopup from '../shared/formErrorPopUp.jsx'

function SearchBar() {
  const [filters, setFilters] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleResetFilters = () => {
    setFilters({ name: '', priceMin: '', priceMax: '' })
    setError(null)
    navigate('/')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = filters.name.trim()
    const min = Number(filters.priceMin)
    const max = Number(filters.priceMax)

    // ✅ Validations
    if (min && max && min > max) {
      setError({
        code: 'INVALID_PRICE_RANGE',
        message: 'The minimum price cannot be greater than the maximum.',
      })
      return
    }

    if (!filters.name && !filters.priceMin && !filters.priceMax) {
      setError({
        code: 'EMPTY_FILTERS',
        message: 'You must complete at least one filter.',
      })
      return
    }

    if (trimmedName && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(trimmedName)) {
      setError({
        code: 'INVALID_NAME',
        message: 'The name filter can only contain letters.',
      })
      return
    }

    const queryParams = new URLSearchParams()
    if (filters.name) queryParams.append('name', filters.name)
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin)
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax)

    navigate(`/?${queryParams.toString()}`)

    setTimeout(() => {
      const element = document.getElementById('adverts-list')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)

    setFilters({ name: '', priceMin: '', priceMax: '' })
    setError(null) // clear error when doing valid search
  }

  return (
    <div className="flex items-center flex-col">
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-md shadow max-w-xl mx-auto mt-5"
      >
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="🔍"
          className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
          placeholder="Min €"
          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
          placeholder="Max €"
          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <Button type="submit">Search</Button>
        <Button type="button" onClick={handleResetFilters}>
          Reset
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
