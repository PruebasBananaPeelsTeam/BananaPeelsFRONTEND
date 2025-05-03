import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getTags } from '../../services/adverts-service.js'
import FormErrorPopup from './formErrorPopUp.jsx'
import Button from '../shared/button.jsx'

const tagImages = {
  Decoration: '/images/Decoracion.png',
  Ilumination: '/images/Iluminacion.jpg',
  Forniture: '/images/Menaje.png',
  Garden: '/images/planta.webp',
}

function TagFilter() {
  const [tags, setTags] = useState([])
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const selectedTags = new URLSearchParams(location.search).getAll('tag')

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => {
        setError({
          code: 'TAGS_FETCH_ERROR',
          message: 'Could not load tags. Please try again later.',
        })
      })
  }, [])

  const handleTagClick = (clickedTag) => {
    const searchParams = new URLSearchParams(location.search)
    const currentTags = searchParams.getAll('tag')

    const updated = currentTags.includes(clickedTag)
      ? currentTags.filter((tag) => tag !== clickedTag)
      : [...currentTags, clickedTag]

    const newSearchParams = new URLSearchParams()
    updated.forEach((tag) => newSearchParams.append('tag', tag))
    newSearchParams.set('page', '1')

    navigate(`/?${newSearchParams.toString()}`)
  }

  const handleClearFilters = () => {
    navigate('/')
  }

  useEffect(() => {
    const element = document.getElementById('adverts-list')
    if (element) {
      slowScrollTo(element.offsetTop, 800) // Scroll lento
    }
  }, [location.search])

  // ✨ Animación de scroll lenta
  const slowScrollTo = (targetY, duration) => {
    const startY = window.scrollY
    const diff = targetY - startY
    let start

    const step = (timestamp) => {
      if (!start) start = timestamp
      const time = timestamp - start
      const percent = Math.min(time / duration, 1)

      window.scrollTo(0, startY + diff * percent)

      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-2">
      <h2 className="text-xl font-bold text-center text-gray-700 mt-10">
        Elige una categoría para comenzar tu búsqueda:
      </h2>
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      {/* CONTENEDOR PRINCIPAL */}
      <div className="p-4 flex flex-col gap-6 items-center mt-8 mb-1">
        {/* BLOQUE DE FILTROS ACTIVOS */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-3 w-full">
            <span className="text-gray-800 font-bold text-md flex items-center">
              🎯 Filters applied:
            </span>
            {selectedTags.map((tag) => (
              <img
                key={tag}
                src={tagImages[tag]}
                alt={tag}
                title={tag}
                className="w-10 h-10 object-cover rounded-full border-2 border-indigo-400 shadow-sm"
              />
            ))}
          </div>
        )}

        {/* TAGS FLEXIBLES */}
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={tagImages[tag]}
                alt={tag}
                className={`w-52 h-42 object-cover rounded-2xl border-4 transition-all ${
                  selectedTags.includes(tag)
                    ? 'border-indigo-500'
                    : 'border-transparent'
                }`}
              />
              <span className="text-base mt-2 font-semibold text-gray-700 capitalize">
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* BOTÓN DE LIMPIAR FILTROS */}
        {selectedTags.length > 0 && (
          <div className="flex justify-end w-full">
            <Button onClick={handleClearFilters}>Clean filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TagFilter
