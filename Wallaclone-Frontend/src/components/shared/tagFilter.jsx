import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getTags } from '../../services/adverts-service.js'
import FormErrorPopup from './formErrorPopUp.jsx'

// 🖼️ Imagenes de los tags
const tagImages = {
  Decoration: '/images/Decoracion.png',
  Ilumination: '/images/Iluminacion.jpg',
  Forniture: '/images/Menaje.png',
  Garden: '/images/Menaje.png',
}

function TagFilter() {
  // Estado para guardar todos los tags disponibles
  const [tags, setTags] = useState([])

  // Estado para guardar posibles errores al cargar tags
  const [error, setError] = useState(null)

  const navigate = useNavigate()  // Para cambiar de URL
  const location = useLocation()  // Para saber qué URL tengo ahora mismo

  // 🔥 Aquí no guardamos los tags seleccionados en memoria, sino que los sacamos directamente de la URL
  const selectedTags = new URLSearchParams(location.search).getAll('tag')

  // 🚀 Cuando el componente se monta, carga todos los tags desde el backend
  useEffect(() => {
    getTags()
      .then(setTags) // Guarda los tags que vienen del servidor
      .catch(() => {
        setError({
          code: 'TAGS_FETCH_ERROR',
          message: 'Could not load tags. Please try again later.',
        })
      })
  }, [])

  // 🖱️ Esta función se llama cuando haces click en un tag
  const handleTagClick = (clickedTag) => {
    const searchParams = new URLSearchParams(location.search)
    const currentTags = searchParams.getAll('tag')

    let updated
    if (currentTags.includes(clickedTag)) {
      // Si ya estaba seleccionado, lo quitamos
      updated = currentTags.filter((tag) => tag !== clickedTag)
    } else {
      // Si no estaba, lo añadimos
      updated = [...currentTags, clickedTag]
    }

    // Creamos nuevos parámetros de búsqueda
    const newSearchParams = new URLSearchParams()
    updated.forEach((tag) => newSearchParams.append('tag', tag))
    newSearchParams.set('page', '1') // Siempre volvemos a la página 1

    // Cambiamos la URL
    navigate(`/?${newSearchParams.toString()}`)
  }

  // 🧹 Cuando haces click en "Limpiar filtros", navegas al inicio
  const handleClearFilters = () => {
    navigate('/')
  }

  // 🧠 Cada vez que cambia la URL (tags seleccionados), hacemos scroll suave
  useEffect(() => {
    const element = document.getElementById('adverts-list')
    if (element) {
      slowScrollTo(element.offsetTop, 800) // 800ms para hacer scroll despacito
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
    <>
      {/* 🛑 Mostrar popup de error si no cargan los tags */}
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      {/* 🎯 Si hay tags seleccionados, mostramos el aviso y el botón limpiar */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 p-4">
          <p className="text-lg text-gray-700">
            Resultados filtrados por:
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full mx-1"
              >
                {tag}
              </span>
            ))}
          </p>
          {/* Botón para limpiar todos los filtros */}
          <button
            onClick={handleClearFilters}
            className="ml-4 text-red-500 underline hover:text-red-700 transition"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* 🖼️ Mostramos todas las imágenes de los tags */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {tags.map((tag) => (
          <div key={tag} className="flex flex-col items-center">
            <img
              src={tagImages[tag]}
              alt={tag}
              onClick={() => handleTagClick(tag)}
              className={`w-24 h-24 object-contain cursor-pointer border-4 rounded-2xl transition 
                ${selectedTags.includes(tag) ? 'border-gray-800 scale-105' : 'border-transparent'}`}
            />
            <span className="text-base mt-2 capitalize">{tag}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default TagFilter
