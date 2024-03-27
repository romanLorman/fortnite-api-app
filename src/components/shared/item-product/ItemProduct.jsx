import {
  Mousewheel,
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from 'context/context'
import { Counter } from '../counter/Counter'
import { Link, useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

export const ItemProduct = ({ parentBlock, itemProductRef }) => {
  const {
    currentProduct,
    selectCurrentProduct,
    dailyShop,
    handleToggleToCart,
  } = useContext(GlobalContext)
  const [thumbs, setThumbs] = useState(null)
  const { productId } = useParams()

  useEffect(() => {
    if (productId && dailyShop[0]) {
      selectCurrentProduct(
        dailyShop.find((product) => product.offerId == productId)
      )
    }
    return () => selectCurrentProduct(null)
  }, [dailyShop, productId])

  return (
    <div
      className={`${parentBlock}__item-product item-product`}
      ref={itemProductRef}
    >
      {currentProduct ? (
        <>
          <div className="item-product__breacrumb-nav breacrumb-nav">
            <ul className="breacrumb-nav__list">
              <li>
                <Link to="/fortnite-api-app">
                  <div className="breacrumb-nav__link">shop</div>
                </Link>
              </li>
              <li>
                <Link>product</Link>
              </li>
            </ul>
          </div>
          <div className="item-product__top">
            <h1 className="item-product__title_large _lines-overflow_2">
              {currentProduct.displayName}
            </h1>
            <div>/{currentProduct.displayType}/</div>
            {currentProduct.displayDescription ? (
              <div>
                <span className="_lines-overflow">
                  "{currentProduct.displayDescription}
                </span>
                <span>"</span>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="item-product__body">
            <div className="item-product__sliders">
              <div
                className="item-product__sliders-box"
                style={{
                  background: `url(${currentProduct.displayAssets[0].background_texture}) center no-repeat`,
                }}
              >
                <div className="item-product__main-slider">
                  <div className="item-product__skeleton">
                    <ContentLoader
                      speed={1}
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      backgroundColor="#27272f"
                      foregroundColor="#6D05DD"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="0"
                        ry="0"
                        width="100"
                        height="100"
                      />
                    </ContentLoader>
                  </div>
                  <Swiper
                    speed={1000}
                    onSwiper={setThumbs}
                    grabCursor={true}
                    navigation={true}
                    thumbs={{
                      swiper: thumbs && !thumbs.destroyed ? thumbs : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                  >
                    {currentProduct.displayAssets.map((p, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="item-product__poster"
                          style={{
                            backgroundColor: currentProduct.displayAssets[0]
                              .background_texture
                              ? 'inherit'
                              : '#0e72d0',
                          }}
                        >
                          <img src={p.url} alt="product-poster" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div
                  className="item-product__thumbs-slider"
                  style={
                    currentProduct.displayAssets.length > 1
                      ? {
                          borderBottom: '1px solid $lightColor',
                          borderTop: '1px solid $lightColor',
                        }
                      : { border: 0 }
                  }
                >
                  <Swiper
                    speed={1000}
                    spaceBetween={0}
                    onSwiper={setThumbs}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                  >
                    {currentProduct.displayAssets.map((p, i) => (
                      <SwiperSlide key={i}>
                        {currentProduct.displayAssets.length > 1 ? (
                          <div
                            className="item-product__img"
                            style={{
                              backgroundColor: currentProduct.displayAssets[0]
                                .background_texture
                                ? 'inherit'
                                : '#0e72d0',
                            }}
                          >
                            <img src={p.url} alt="product-img" />
                          </div>
                        ) : (
                          ''
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="item-product__content">
              <div className="item-product__cost">
                <div className="item-product__counter-wrap">
                  <Counter
                    parentBlock={'item-product'}
                    productId={currentProduct.offerId}
                  />
                </div>
                <div className="item-product__price">
                  {currentProduct.price.finalPrice * currentProduct.count}
                </div>
                {currentProduct.cartStatus ? (
                  <button
                    style={{ backgroundColor: '#EC5863' }}
                    className="item-product__btn"
                    onClick={() => handleToggleToCart(currentProduct)}
                  >
                    <span>remove from </span> 🛒
                  </button>
                ) : (
                  <button
                    className="item-product__btn"
                    onClick={() => handleToggleToCart(currentProduct)}
                  >
                    <span>add to</span> 🛒
                  </button>
                )}
              </div>

              <h3 className="item-product__title_large">
                granted list:
                <span>
                  {currentProduct.granted[0].images.background ? '' : 'N/A'}
                </span>
              </h3>
              <div className="item-product__granted-list">
                {currentProduct.granted[0].images.background ? (
                  <Swiper
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Mousewheel, Navigation, Thumbs, Pagination]}
                    mousewheel={true}
                    pagination={true}
                    grabCursor={true}
                  >
                    {currentProduct.granted.map((p, i) => (
                      <SwiperSlide key={i + p.id}>
                        <div className="item-product__granted granted">
                          <img src={p.images.background} alt="granted-icon" />
                          <div className="granted__info">
                            <div className="granted__title _lines-overflow_2">
                              {p.name}
                            </div>
                            {p.description ? (
                              <div className="granted__description _lines-overflow">
                                "{p.description}"
                              </div>
                            ) : (
                              <div>N/A</div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  ''
                )}
              </div>

              <div className="item-product__label">
                <span>full set price:</span>
                <div className="item-product__price_large">
                  {currentProduct.price.finalPrice}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="item-product__spiner">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}
