const BASE_URL = 'https://fortniteapi.io'
export const API_KEY = process.env.REACT_APP_API_KEY
export const ALL_NEWS = BASE_URL + '/v1/news?lang=en&type=br'
export const ALL_PRODUCTS = BASE_URL + '/v2/shop?lang=en'
export const ALL_TOURNAMENTS = BASE_URL + '/v1/events/list?lang=en&region=EU'
export const ALL_MAPS = BASE_URL + '/v1/maps/list'
export const ALL_CREW = BASE_URL + '/v2/crew/history?lang=en'
