import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAdvert, getTags } from '../../services/adverts-service.js'
import FormField from '../../components/shared/formField.jsx'
import Button from '../../components/shared/button.jsx'
import Page from '../../components/layout/page.jsx'
import Loader from '../../components/shared/loader.jsx'
import FormErrorPopup from '../../components/shared/formErrorPopUp.jsx'
import { useTranslation } from 'react-i18next'

const CreateAdvertPage = () => {
  const  { t } = useTranslation() // hook de i18next para traducir el texto
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
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags()
        setTagsList(tags)
      } catch (err) {
        console.error('Error fetching tags:', err)
      }
    }
    fetchTags()
  }, [])

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timeout)
    }
  }, [error])

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

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required.'
    if (!formData.description.trim())
      errors.description = 'Description is required.'
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = 'Price must be greater than 0.'
    if (formData.tags.length === 0)
      errors.tags = 'Please select at least one category.'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }

    setFieldErrors({})

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
      navigate('/')
    } catch (err) {
      const backendErrors = err.response?.data?.errors 
      if (backendErrors) {
        const fieldErrors = {}
        backendErrors.forEach(({ field, message }) => {
          const key = `errors.${message}`
          fieldErrors[field] = t(key) || message
        })
        setFieldErrors(fieldErrors)
      } else {
        setError({
          code: 'Create Error',
          message: 'An error occurred while creating the advert. Please try again later.',
        })
      }
     
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      {error && <FormErrorPopup error={error} onClose={() => setError(null)} />}
      <div className="max-w-xl mx-auto mt-10 p-4 shadow-md bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">{t('createAdvert.title')}</h2>

        {success && (
          <p className="text-green-600 text-sm mb-3">
            {t('createAdvert.successMessage')}
          </p>
        )}
        {loading && <Loader />}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField
            label={t('createAdvert.productLabel')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
          />

          <FormField
            label={t('createAdvert.descriptionLabel')}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={fieldErrors.description}
          />

          <FormField
            label={t('createAdvert.priceLabel')}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={fieldErrors.price}
            min="0.01"
          />

          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">{t('createAdvert.typeLabel')}</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="sell">{t('createAdvert.typeSell')}</option>
              <option value="buy">{t('createAdvert.typeBuy')}</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">{t('createAdvert.tagsLabel')}</p>
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
            <label className="text-sm font-medium text-gray-700 mb-2">{t('createAdvert.imageLabel')}</label>
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
              <p className="text-sm text-gray-500 mb-1">{t('createAdvert.previewLabel')}</p>
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? t('createAdvert.creatingButton') : t('createAdvert.submitButton')}
            
          </Button>
        </form>
      </div>
    </Page>
  )
}

export default CreateAdvertPage
