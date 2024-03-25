import { Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import cart from './icons/cart-icon.svg'
import { RowProduct } from '../row-product/RowProduct'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { GlobalContext } from 'context/context'

export const Cart = ({ cartRef, headerMenuActiveRef }) => {
  const { dailyShop, sortProducts } = useContext(GlobalContext)
  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      cartRef.current.classList.add('cart_active')
      headerMenuActiveRef.current.classList.remove('_active')
    } else {
      dailyShop[0] &&
        dailyShop.find((p) => p.cartStatusNew) &&
        sortProducts(dailyShop.map((p) => (p.cartStatusNew = false)))
      cartRef.current.classList.remove('cart_active')
    }
  }, [location.search])

  return (
    <div className="header__cart cart" ref={cartRef}>
      <div className="cart__controller">
        <Link to={'/fortnite-api-app/' + location.pathname + '?cart'}>
          <button className="cart__icon">
            <img src={cart} alt="cart" />
            {dailyShop[0] &&
            dailyShop.filter((product) => product.cartStatusNew).length ? (
              <span>
                {dailyShop.filter((product) => product.cartStatusNew).length}
              </span>
            ) : (
              ''
            )}
          </button>
        </Link>
        <Link to={'/fortnite-api-app/' + location.pathname + location.hash}>
          <button className="cart__cross-icon-btn">
            <span></span>
            <span></span>
          </button>
        </Link>
      </div>

      <div className="cart__body">
        <div className="cart__container">
          <div className="cart__content">
            <Swiper
              spaceBetween={0}
              style={{
                width: '100%',
                height:
                  dailyShop[0] &&
                  dailyShop.filter((product) => product.cartStatus).length <= 7
                    ? `${
                        80 *
                        dailyShop.filter((product) => product.cartStatus).length
                      }px`
                    : '560px',
              }}
              direction="vertical"
              pagination={{ type: 'fraction', el: '.cart__pagination' }}
              slidesPerView={
                dailyShop[0] &&
                dailyShop.filter((product) => product.cartStatus).length <= 7
                  ? dailyShop.filter((product) => product.cartStatus).length
                  : 7
              }
              mousewheel={true}
              navigation={{
                prevEl: '.cart__button-arrow_prev',
                nextEl: '.cart__button-arrow_next',
                clickable: true,
              }}
              modules={[Mousewheel, Navigation, Pagination]}
            >
              {dailyShop[0] &&
                dailyShop
                  .filter((product) => product.cartStatus)
                  .map((item) => (
                    <SwiperSlide key={'cartProduct:' + item.offerId}>
                      <RowProduct
                        parentBlock={'cart'}
                        data={item}
                        contentExtra={true}
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
            <div className="cart__bottom">
              <div className="cart__total-price">
                Total :
                <span>
                  {dailyShop[0] &&
                    dailyShop.reduce((accumulator, currentItem, index) => {
                      return (
                        accumulator +
                        currentItem.price.finalPrice * currentItem.count
                      )
                    }, 0)}
                </span>
              </div>
              <div className="cart__pagination-controller">
                <button className="cart__button-arrow cart__button-arrow_prev swiper-button-prev"></button>
                <span className="cart__pagination"></span>
                <button className="cart__button-arrow cart__button-arrow_next swiper-button-next"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
