import { client } from '../api/client'
/*
Servicio de comunicación con la API: funciones que interactúan con los endpoints del back
*/

//URL del endpoint
const advertsUrl = '/api/adverts'

export const getAdvertList = async (page = 1, limit = 10, filters = {}) => {
  const response = await client.get(advertsUrl, {
    params: {
      page,
      limit,
      ...filters,
    },
  })
  return response.data
}

export const createAdvert = async (advert) => {
  const response = await client.post(advertsUrl, advert, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getTags = async () => {
  const response = await client.get('/api/tags')
  return response.data.results || response.data
}

export const getAdvertDetail = async (advertId, slug = '') => {
  const url = `${advertsUrl}/${advertId}/${slug}`
  const response = await client.get(url)
  return response.data.results
}

export const getMyAdverts = async (page = 1, limit = 10) => {
  const response = await client.get('/api/myAdverts', {
    params: {
      page,
      limit,
    },
  })
  return response.data
}

export const updateAdvert = async (advertId, updatedData) => {
  const url = `${advertsUrl}/${advertId}`
  const response = await client.put(url, updatedData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.results
}

export const toggleReserved = async (advertId) => {
  const response = await client.patch(
    `${advertsUrl}/${advertId}/toggle-reserved`,
  )
  return response.data
}

export const deleteAdvert = async (advertId) => {
  const url = `${advertsUrl}/${advertId}`
  const response = await client.delete(url)
  return response.data
}

export const toggleSoldAdvert = async (advertId) => {
  const { data } = await client.patch(`/api/adverts/${advertId}/toggle-sold`)
  return data
}
