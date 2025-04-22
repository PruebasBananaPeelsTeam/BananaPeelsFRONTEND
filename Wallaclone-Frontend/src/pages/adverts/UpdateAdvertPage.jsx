import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdvertDetail, updateAdvert } from '../../services/adverts-service.js'//crear updateAdvert
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import Loader from '../../components/shared/loader.jsx'
import Page from '../../components/layout/page.jsx'

function UpdateAdvertPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        type: 'sell',  
        image: null,
        tags: [],
      })

  const { advertId } = useParams() 
  const [tagsList, setTagsList] = useState([]) 
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Cargar los detalles del anuncio
  useEffect(() => {
    const fetchAdvertDetails = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const advertDetails = await getAdvertDetail(advertId)  
        setFormData({
          ...formData,
          name: advertDetails.name,
          description: advertDetails.description,
          price: advertDetails.price,
          type: advertDetails.type,
          tags: advertDetails.tags,
        })
        setImagePreview(advertDetails.image) 

      } catch (err) {
        setError('Error loading the advert')
      } finally {
        setLoading(false)
      }
    }

    fetchAdvertDetails()
  }, [advertId])

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))
      setImagePreview(URL.createObjectURL(file))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Validar el formulario
  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required.'
    if (!formData.description.trim()) errors.description = 'Description is required.'
    if (!formData.price || formData.price <= 0) errors.price = 'Price must be greater than 0.'
    if (formData.tags.length === 0) errors.tags = 'You must select at least one category.'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    // Validar el formulario
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setError('Please correct before proceeding')
      return
    }

    // Preparar los datos para enviar
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
      await updateAdvert(advertId, dataToSend)  
      navigate(`/adverts/${advertId}`)  
    } catch (err) {
      setError('Error updating the advert.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />
  if (error) return <div>{error}</div>

  return (
    <Page>
      <div className="max-w-xl mx-auto mt-10 p-4 shadow-md bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Actualizar anuncio</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Nombre del producto"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Descripción"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <FormField
            label="Precio (€)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="sell">En venta</option>
              <option value="wanted">Se busca</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">Categorías</p>
            <div className="flex flex-wrap gap-4">
              {/*  listado de tags disponibles */}
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
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">Imagen</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            />
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
            {loading ? 'Actualizando...' : 'Actualizar anuncio'}
          </Button>
        </form>
      </div>
    </Page>
  )
}

export default UpdateAdvertPage

