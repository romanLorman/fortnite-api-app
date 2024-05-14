export const addDailyShopProducts = (products) => ({
  type: 'ADD_SHOP_PRODUCTS',
  products,
})

export const addTypeList = (shopTypes) => ({ type: 'ADD_TYPE_LIST', shopTypes })

export const sortProductsByType = (products) => ({
  type: 'SORT_PRODUCTS_BY_TYPE',
  products,
})

export const sortProductsBySearch = (products) => ({
  type: 'SORT_PRODUCTS_BY_SEARCH',
  products,
})

export const addCurrentProduct = (product) => ({
  type: 'ADD_CURRENT_PRODUCT',
  product,
})

export const loadDailyShop =
  () =>
  (dispatch, _, { client, api }) => {
    client.get(api.ALL_PRODUCTS).then((data) => {
      const products = data.shop
        .filter(
          (p) =>
            p.granted.length && p.granted.length > 0 && p.granted[0].images.icon
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
      dispatch(addDailyShopProducts(products))
      dispatch(sortProductsByType(products))
    })
  }
