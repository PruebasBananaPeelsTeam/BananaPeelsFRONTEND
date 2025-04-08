import { client } from '../../api/client'

/*
Servicio de comunicación con la API: funciones que interactúan con los endpoints del back
*/

//URL del endpoint
const advertsUrl = '/api/adverts'

export const getAdvertList = async () => {
  const response = await client.get(advertsUrl)
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
