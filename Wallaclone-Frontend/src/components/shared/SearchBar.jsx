import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/button.jsx'
import FormErrorPopup from '../shared/formErrorPopUp.jsx'
import useTimer from '../../utils/useTimer.js'

function SearchBar() {
  const [filters, setFilters] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useTimer(error, () => {
    setError(null), 5000
  })

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
    <div className="relative mx-auto flex justify-between items-center">
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 w-full justify-center items-center px-2"
      >
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="🔍 Name"
          className="flex-1 min-w-[120px] px-2 py-1 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
          placeholder="Min €"
          className="flex-1 min-w-[80px] px-2 py-1 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
          placeholder="Max €"
          className="flex-1 min-w-[80px] px-2 py-1 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
        />
        <Button type="submit" className="flex-shrink-0">
          Search
        </Button>
        <Button
          type="button"
          onClick={handleResetFilters}
          className="flex-shrink-0"
        >
          Reset
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
