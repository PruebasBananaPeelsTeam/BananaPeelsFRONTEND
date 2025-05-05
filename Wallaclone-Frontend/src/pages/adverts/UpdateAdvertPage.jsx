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
import { useTranslation } from 'react-i18next'

function UpdateAdvertPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { advertId } = useParams()

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: 'sell',
    image: null,
    tags: [],
  })

  const [tagsList, setTagsList] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  // Estados para manejar carga, errores y errores de validación por campo
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  
  // Cargar detalles del anuncio al montar el componente
  useEffect(() => {
    const fetchAdvertDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const advertDetails = await getAdvertDetail(advertId)

        // Si el anuncio no existe, lanzar un error 404
        if (!advertDetails || !advertDetails.name) {
          throw { response: { status: 404 } }
        }

        // Cargar datos en el formulario
        setFormData({
          name: advertDetails.name,
          description: advertDetails.description,
          price: advertDetails.price,
          type: advertDetails.type,
          image: null,
          tags: advertDetails.tags,
        })

        // Mostrar la imagen previa si existe
        setImagePreview(
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

  // Cargar lista de tags al montar el componente
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

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target

    // Si se está seleccionando una imagen
    if (files) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))
      setImagePreview(URL.createObjectURL(file))
    } else {
      //Para campos de texto, números...
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Validación de los datos antes de enviar el formulario
  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = t('errors.Name is required')
    if (!formData.description.trim()) errors.description = t('errors.Description is required')
    if (!formData.price || formData.price <= 0) errors.price = t('errors.Price must be a positive number')
    if (formData.tags.length === 0) errors.tags = t('errors.At least one tag is required')
    return errors
  }

   // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validar datos
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }

    setFieldErrors({})

    //Construir FormData para enviar incluyendo imagen y tags
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

    //Enviar los datos actualizados a la API
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
        <h2 className="text-2xl font-bold mb-4 text-center">{t('updateAdvert.title')}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label={t('updateAdvert.productLabel')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
          />
          <FormField
            label={t('updateAdvert.descriptionLabel')}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={fieldErrors.description}
          />
          <FormField
            label={t('updateAdvert.priceLabel')}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={fieldErrors.price}
          />

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              {t('updateAdvert.typeLabel')}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="sell">{t('updateAdvert.typeSell')}</option>
              <option value="buy">{t('updateAdvert.typeBuy')}</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">{t('updateAdvert.tagsLabel')}</p>
            {fieldErrors.tags && (
              <span className="text-sm text-red-500">{fieldErrors.tags}</span>
            )}
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
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              {t('updateAdvert.imageLabel')}
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
              <p className="text-sm text-gray-500 mb-1">{t('updateAdvert.previewLabel')}</p>
              <img
                src={imagePreview}
                alt="preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? t('updateAdvert.updatingButton') : t('updateAdvert.submitButton')}
          </Button>
        </form>
      </div>
    </Page>
  )
}

export default UpdateAdvertPage
