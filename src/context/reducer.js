export function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOAD_SHOP_PRODUCTS':
      return {
        ...state,
        dailyShop: payload,
      }
    case 'SELECT_PRODUCTS':
      return {
        ...state,
        selectedList: payload,
      }
    case 'SELECT_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: payload,
      }
    case 'SORT_LIST':
      return {
        ...state,
        sortedList: payload,
      }
    case 'SORT_PRODUCTS':
      return {
        ...state,
        sortedProducts: payload,
      }
    case 'GET_NEWS':
      return {
        ...state,
        newsItems: payload,
      }
    case 'GET_TOURNAMENTS':
      return {
        ...state,
        tournaments: payload,
      }
    case 'GET_MAPS':
      return {
        ...state,
        maps: payload,
      }
    case 'GET_CREW':
      return {
        ...state,
        crew: payload,
      }
    default:
      return state
  }
}
