import { client } from '../api/client.js'

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
