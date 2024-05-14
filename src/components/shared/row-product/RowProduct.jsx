import { handleMod } from 'assets/js/animation'
import { Counter } from 'components/shared/counter/Counter'
import unknownIcon from 'assets/icons/unknown-icon.svg'
import { handleToggleToCart } from 'store/utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectDailyShop } from 'store/shop/shop-selectors'
import { addDailyShopProducts } from 'store/shop/shop-actions'

export const RowProduct = ({ parentBlock, data, contentExtra = false,}) => {
  const dailyShop = useSelector(selectDailyShop)
  const dispatch = useDispatch()
  return (
    <div
      className={`${parentBlock}__row-product ${
        contentExtra ? handleMod('row-product', '_extra') : 'row-product'
      }`}
    >
      <div className="row-product__content">
        <div className="row-product__icon">
          <img
            src={data.granted[0].images.icon || unknownIcon}
            alt="product-icon"
          />
        </div>
        <div className="row-product__description">
          <div className="row-product__title">
            {data.displayName}
            <span>{'-' + ' ' + '/' + data.mainType + '/'}</span>
          </div>
          <p className="row-product__text">{`" ${
            data.displayDescription || '...'
          } "`}</p>
        </div>
      </div>

      <div className="row-product__extra-content">
        <Counter parentBlock={'row-product'} productId={data.offerId} />
        <span className="row-product__price">
          {data.price.finalPrice * data.count}
        </span>
        <button
          className="row-product__cross-icon-btn"
          onClick={() => dispatch(addDailyShopProducts(handleToggleToCart(dailyShop, data)))}
        >
          <span></span>
          <span></span>
        </button>
        {data.cartStatusNew ? (
          <span className="row-product__marker">new</span>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

// ;<div className="form-search__row-product row-product">
//   <div className="row-product__icon">
//     <img src={icon} alt="product-icon" />
//   </div>
//   <div className="row-product__description">
//     <span>{name + ' ' + '-' + ' ' + '/' + type + '/'}</span>
//     <p>{description}</p>
//   </div>
//   <div className="row-product__extra-content">
//     <Counter />
//     <button className="row-product__btn_outline">cancel</button>
//   </div>
// </div>
