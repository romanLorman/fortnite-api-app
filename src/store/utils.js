
export const handleToggleToCart = (dailyShop, currentProduct) => {
  const productById = dailyShop.find(
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
  return dailyShop
}
