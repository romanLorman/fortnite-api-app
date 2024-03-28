import { createContext, useReducer } from 'react'
import { reducer } from './reducer'
import {
  getShopProducts,
  getNews,
  getTournaments,
  getMaps,
  getCrewItems,
} from 'middleware/api'
export const GlobalContext = createContext()

const initialState = {
  dailyShop: [null, null, null, null, null, null],
  sortedList: null,
  sortedProducts: [null, null, null, null, null, null],
  selectedList: [],
  currentProduct: null,
  cartProducts: null,
  newsItems: null,
  tournaments: null,
  maps: null,
  crew: null,
}

export const ContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState)

  value.selectCurrentProduct = (product) =>
    dispatch({ type: 'SELECT_CURRENT_PRODUCT', payload: product })

  value.selectProducts = (selectedProducts) =>
    dispatch({ type: 'SELECT_PRODUCTS', payload: selectedProducts })

  value.sortProducts = (products) =>
    dispatch({
      type: 'SORT_PRODUCTS',
      payload: products,
    })

  value.createNews = () =>
    getNews().then((data) => {
      if (data) {
        dispatch({
          type: 'GET_NEWS',
          payload: data.news.slice(0, 10),
        })
      }
    })
  value.createMaps = () =>
    getMaps().then((data) => {
      if (data) {
        dispatch({
          type: 'GET_MAPS',
          payload: data.maps.reverse().slice(0, 14),
        })
      }
    })

  value.createCrewItems = () =>
    getCrewItems().then((data) => {
      if (data) {
        dispatch({
          type: 'GET_CREW',
          payload: data.history.filter((crew) => crew.video),
        })
      }
    })

  value.createTournaments = () =>
    getTournaments().then((data) => {
      const currentTime = new Date().getTime()
      if (data) {
        dispatch({
          type: 'GET_TOURNAMENTS',
          payload: data.events
            .filter(
              (tournament) => Date.parse(tournament.beginTime) > currentTime
            )
            .slice(0, 14),
        })
      }
    })

  value.dailyShopLoading = () =>
    getShopProducts().then((data) => {
      if (data) {
        const products = data.shop
          .filter(
            (p) =>
              p.granted.length &&
              p.granted.length > 0 &&
              p.granted[0].images.icon
          )
          .reverse()
          .map((product) => ({
            ...product,
            mainType: product.mainType.match(/sparks_/)
              ? 'sparks'
              : product.mainType,
            offerId: product.offerId.substr(4),
            displayName: product.displayName,
            cartStatus: false,
            cartStatusNew: false,
            count: 0,
          }))
        dispatch({
          type: 'LOAD_SHOP_PRODUCTS',
          payload: products,
        })
        value.sortProducts(products)
      }
    })

  value.createSortedList = (shopTypes) =>
    dispatch({
      type: 'SORT_LIST',
      payload: shopTypes,
    })

  value.handleToggleToCart = (currentProduct) => {
    const productById = value.dailyShop.find(
      (product) => product.offerId === currentProduct.offerId
    )
    if (currentProduct.count && !currentProduct.cartStatus) {
      productById.cartStatus = true
      productById.cartStatusNew = true
    } else {
      productById.cartStatus = false
      productById.cartStatusNew = false
      productById.count = 0
    }
    value.sortProducts(value.dailyShop)
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
