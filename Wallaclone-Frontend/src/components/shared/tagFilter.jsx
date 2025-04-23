import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getTags } from '../../services/adverts-service.js'
import FormErrorPopup from './formErrorPopUp.jsx'

const tagImages = {
  Decoration: '/images/Decoracion.png',
  Ilumination: '/images/Iluminacion.jpg',
  Forniture: '/images/Menaje.png',
  Garden: '/images/Menaje.png',
}

function TagFilter() {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // 🔁 Cargar todos los tags disponibles
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
    let updated

    if (selectedTags.includes(clickedTag)) {
      updated = selectedTags.filter((tag) => tag !== clickedTag)
    } else {
      updated = [...selectedTags, clickedTag]
    }

    setSelectedTags(updated)

    const searchParams = new URLSearchParams()
    updated.forEach((tag) => searchParams.append('tag', tag))

    navigate(`/?${searchParams.toString()}`)

    setTimeout(() => {
      const element = document.getElementById('adverts-list')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <>
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {tags.map((tag) => (
          <div key={tag} className="flex flex-col items-center">
            <img
              src={tagImages[tag]}
              alt={tag}
              onClick={() => handleTagClick(tag)}
              className={`w-16 h-16 object-contain cursor-pointer border-3 rounded transition 
                ${selectedTags.includes(tag) ? 'border-gray-800' : 'border-transparent'}`}
            />
            <span className="text-xs mt-1 capitalize">{tag}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default TagFilter
