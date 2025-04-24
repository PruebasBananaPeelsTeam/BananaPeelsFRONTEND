import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAdvertDetail,
  updateAdvert,
  getTags,
} from '../../services/adverts-service.js'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import Loader from '../../components/shared/loader.jsx'
import Page from '../../components/layout/page.jsx'
import { slugify } from '../../utils/slugify.js'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'

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
  const [fieldErrors, setFieldErrors] = useState({})
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

  // Fetch advert details
  useEffect(() => {
    const fetchAdvertDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const advertDetails = await getAdvertDetail(advertId)

        if (!advertDetails || !advertDetails.name) {
          throw { response: { status: 404 } }
        }

        setFormData({
          name: advertDetails.name,
          description: advertDetails.description,
          price: advertDetails.price,
          type: advertDetails.type,
          image: null,
          tags: advertDetails.tags,
        })
        setImagePreview(
          //si es URL se usa directamente, si es base64 se convierte, y si no hay imagen se pone un placeholder
          advertDetails.image
            ? advertDetails.image.startsWith('http')
              ? advertDetails.image
              : `data:image/jpeg;base64,${advertDetails.image}`
            : 'https://fakeimg.pl/600x400?text=NO+PHOTO'
        )

        
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true)
        } else {
          setError({
            code: 'Fetch Error',
            message: 'Error loading the advert.',
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAdvertDetails()
  }, [advertId, navigate])

  useEffect(() => {
    if (notFound) {
      navigate('/adverts')
    }
  }, [notFound, navigate])

  if (notFound) return null

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags()
        setTagsList(tags)
      } catch (err) {
        console.error('Error loading tags', err)
      }
    }

    fetchTags()
  }, [])

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
    if (!formData.description.trim())
      errors.description = 'Description is required.'
    if (!formData.price || formData.price <= 0)
      errors.price = 'Price must be greater than 0.'
    if (formData.tags.length === 0)
      errors.tags = 'You must select at least one category.'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validar el formulario
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }

    //Limpiar errores si todo va bien
    setFieldErrors({})

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
      const slug = slugify(formData.name)
      navigate(`/adverts/${advertId}/${slug}`)
    } catch (err) {
      setError({
        code: 'Update Error',
        message: err.response?.data?.message || 'Error updating the advert.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <Page>
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}
      <div className="max-w-xl mx-auto mt-10 p-4 shadow-md bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Advert</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Product"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
          />
          <FormField
            label="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={fieldErrors.description}
          />
          <FormField
            label="Price (€)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={fieldErrors.price}
          />

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="sell">On sale</option>
              <option value="wanted">Wanted</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
            {fieldErrors.tags && (
              <span className="text-sm text-red-500">{fieldErrors.tags}</span>
            )}
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
            <label className="text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
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
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update advert'}
          </Button>
        </form>
      </div>
    </Page>
  )
}

export default UpdateAdvertPage
