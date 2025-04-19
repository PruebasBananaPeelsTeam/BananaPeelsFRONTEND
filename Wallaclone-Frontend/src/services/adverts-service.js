import { client } from '../api/client'
/*
Servicio de comunicación con la API: funciones que interactúan con los endpoints del back
*/

//URL del endpoint
const advertsUrl = '/api/adverts'

export const getAdvertList = async (page = 1, limit = 10) => {
  const response = await client.get(advertsUrl, {
    params: {
      page,
      limit,
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
  return response.data.result
}

export const getMyAdverts = async () => {
  const response = await client.get('/api/myAdverts');
  return response.data.results
}

