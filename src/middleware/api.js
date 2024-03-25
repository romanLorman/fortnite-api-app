import {
  API_CREW_URL,
  API_KEY,
  API_MAPS_URL,
  API_SHOP_URL,
  API_TOURNAMENTS_URL,
  API_NEWS_URL,
} from 'configs/config'

async function sendRequestWithRetry(url, obj, maxRetries = 5, delay = 5000) {
  let retries = 0
  while (retries < maxRetries) {
    try {
      const responsePromise = fetch(url, obj)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout exceeded')), 5000)
      )
      const response = await Promise.race([responsePromise, timeoutPromise])
      return await response.json()
    } catch (error) {
      retries++
      if (retries < maxRetries) {
        console.log('Retrying the request...')
        await new Promise((resolve) => setTimeout(resolve, delay))
      } 
    }
  }
}

const getShopProducts = async () => {
  return sendRequestWithRetry(API_SHOP_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
}
const getNews = async () => {
  return sendRequestWithRetry(API_NEWS_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
}
const getTournaments = async () => {
  return sendRequestWithRetry(API_TOURNAMENTS_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
}
const getMaps = async () => {
  return sendRequestWithRetry(API_MAPS_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
}
const getCrewItems = async () => {
  return sendRequestWithRetry(API_CREW_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
}

export { getShopProducts, getTournaments, getMaps, getCrewItems, getNews }
