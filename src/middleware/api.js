import { API_KEY } from 'configs/config'

export const client = async (
  endPoint,
  { body, ...customConfig },
  maxRetries = 5,
  delay = 5000
) => {
  const headers = {
    headers: {
      Authorization: API_KEY,
    },
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let retries = 0
  while (retries < maxRetries) {
    try {
      const responsePromise = fetch(endPoint, headers)
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

client.get = function (endPoint, customConfig = {}) {
  return client(endPoint, customConfig)
}
client.post = function (endPoint, body, customConfig = {}) {
  return client(endPoint, { ...customConfig, body })
}
client.delete = function (endPoint, customConfig = {}) {
  return client(endPoint, { ...customConfig, method: 'DELETE' })
}
client.patch = function (endPoint, body, customConfig = {}) {
  return client(endPoint, { ...customConfig, body, method: 'PATCH' })
}
