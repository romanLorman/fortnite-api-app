import { useContext} from 'react'
import { GlobalContext } from 'context/context'

export const Counter = ({ parentBlock, productId }) => {
  const { dailyShop,sortProducts} = useContext(GlobalContext)

  const handleToggleCount = (simbol) => {
    const productById = dailyShop.find(
      (product) => product.offerId === productId
    )
    switch (simbol) {
      case 'plus':
        ++productById.count
        break
      case 'minus':
        productById.count > 0 && --productById.count
        break
      default:
        productById.count = simbol
        break
    }

    if (!productById.count) {
      productById.cartStatus = false
      productById.cartStatusNew = false
    }
    sortProducts(dailyShop)
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
            onChange={(e) => handleToggleCount(e.target.value >= 0 ? e.target.value : 0)}
            value={dailyShop.find((product) => product.offerId === productId).count}
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
