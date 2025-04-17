import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAdvert, getTags } from '../../services/adverts-service.js'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import Loader from '../../components/shared/loader.jsx'
import Page from '../../components/layout/page.jsx'

const CreateAdvertPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: 'sell',
    image: null,
    tags: [],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [tagsList, setTagsList] = useState([])
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags()
        console.log('tags recibidos', tags)
        setTagsList(tags)
      } catch (err) {
        console.error('Error fetching tags:', err)
      }
    }
    fetchTags()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
      setImagePreview(URL.createObjectURL(file))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.'
    if (!formData.description.trim())
      newErrors.description = 'La descripción es obligatoria.'
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = 'El precio debe ser mayor que 0.'
    if (formData.tags.length === 0)
      newErrors.tags = 'Debes seleccionar al menos una categoría.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!validateForm()) {
      setError('Por favor, corrige los errores antes de continuar.')
      return
    }

    const dataToSend = new FormData()
    dataToSend.append('name', formData.name)
    dataToSend.append('description', formData.description)
    dataToSend.append('price', formData.price)
    dataToSend.append('type', formData.type)

    formData.tags.forEach((tag) => {
      dataToSend.append('tags', tag)
    })

    if (formData.image) {
      dataToSend.append('image', formData.image)
    }

    try {
      setLoading(true)
      await createAdvert(dataToSend)
      setSuccess(true)

      setFormData({
        name: '',
        description: '',
        price: '',
        type: 'sell',
        image: null,
        tags: [],
      })
      setImagePreview(null)
      navigate('/adverts')
    } catch (err) {
      console.error(err)
      setError('Error creando el anuncio. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
    <div className="max-w-xl mx-auto mt-10 p-4 shadow-md bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Crear nuevo anuncio
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm mb-3">
          ¡Anuncio creado con éxito!
        </p>
      )}
      {loading && (
        <p className="text-blue-600 text-sm mb-3">Enviando anuncio...</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Nombre del producto"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />

        <FormField
          label="Descripción"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          error={errors.description}
        />

        <FormField
          label="Precio (€)"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          error={errors.price}
        />

        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Tipo
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(223,184,13)]"
            >
              <option value="sell">En venta</option>
              <option value="wanted">Se busca</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-sm font-medium text-gray-700 mb-2">Categorías</p>
          <div className="flex flex-wrap gap-4">
            {tagsList.map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setFormData((prev) => {
                      const tags = new Set(prev.tags)
                      checked ? tags.add(tag) : tags.delete(tag)
                      return { ...prev, tags: [...tags] }
                    })
                  }}
                />
                <span className="capitalize">{tag}</span>
              </label>
            ))}
          </div>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Imagen
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <Button type="submit" disabled={loading}>
          Submit
          {loading && <Loader/> }
        </Button> 
      </form>
    </div>
    </Page>
  )
}

export default CreateAdvertPage
