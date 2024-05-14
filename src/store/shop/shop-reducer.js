const initialState = {
  dailyShop: [null, null, null, null, null, null],
  sortedProductsBySearch: null,
  sortedProductsByType: [null, null, null, null, null, null],
  typeListProducts: [],
  currentProduct: null,
  cartProducts: null,
}

export const shopReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'ADD_SHOP_PRODUCTS':
      return {
        ...state,
        dailyShop: action.products,
      }
    case 'ADD_TYPE_LIST':
      return {
        ...state,
        typeListProducts: action.shopTypes,
      }
    case 'ADD_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.product,
      }
    case 'SORT_PRODUCTS_BY_SEARCH':
      return {
        ...state,
        sortedProductsBySearch: action.products,
      }
    case 'SORT_PRODUCTS_BY_TYPE':
      return {
        ...state,
        sortedProductsByType: action.products,
      }
    default:
      return state
  }
}
