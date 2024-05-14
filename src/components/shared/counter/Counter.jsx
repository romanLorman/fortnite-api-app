import { useDispatch, useSelector } from 'react-redux'
import { sortProductsByType } from 'store/shop/shop-actions'
import { selectDailyShop } from 'store/shop/shop-selectors'

export const Counter = ({ parentBlock, productId }) => {
  const dailyShop = useSelector(selectDailyShop)
  const dispatch = useDispatch()

  const handleToggleCount = (symbol) => {
    const productById = dailyShop.find(
      (product) => product.offerId === productId
    )
    switch (symbol) {
      case 'plus':
        ++productById.count
        break
      case 'minus':
        productById.count > 0 && --productById.count
        break
      default:
        productById.count = symbol
        break
    }

    if (!productById.count) {
      productById.cartStatus = false
      productById.cartStatusNew = false
    }
    dispatch(sortProductsByType(dailyShop))
  }
  return (
    <div className={`${parentBlock}__counter counter`}>
      <div className="counter__quantity">
        <span
          className="counter__button counter__button_minus"
          onClick={() => handleToggleCount('minus')}
        >
          -
        </span>
        <div className="counter__input">
          <input
            autoComplete="off"
            type="text"
            name="form[]"
            onChange={(e) =>
              handleToggleCount(e.target.value >= 0 ? e.target.value : 0)
            }
            value={
              dailyShop.find((product) => product.offerId === productId).count
            }
          />
        </div>
        <span
          className="counter__button counter__button_plus"
          onClick={() => handleToggleCount('plus')}
        >
          +
        </span>
      </div>
    </div>
  )
}

// <div className="counter">
//   <div className="counter__quantity">
//     <span className="counter__button counter__button_minus">-</span>
//     <div className="counter__input">
//       <input autocomplete="off" type="text" name="form[]" value={1} />
//     </div>
//     <span className="counter__button counter__button_plus">+</span>
//   </div>
// </div>
