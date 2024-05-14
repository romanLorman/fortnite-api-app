import { Navigation, Pagination, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { CardProduct } from '../card-product/CardProduct'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectShop } from 'store/shop/shop-selectors'
import { sortProductsByType } from 'store/shop/shop-actions'

export const SliderCards = ({
  parentBlock,
  sliderCardsRef,
  itemProductRef,
}) => {
  const dispatch = useDispatch()
  const { dailyShop, typeListProducts, sortedProductsByType, currentProduct } =
    useSelector(selectShop)
  const [swiperRef, setSwiperRef] = useState(null)
  const firstBulletRef = useRef()
  const lastBulletRef = useRef()
  const paginationRef = useRef()
  const prependNumber = useRef(1)
  const { sort, page } = useParams()
  const navigate = useNavigate()
  const [slides, setSlides] = useState(
    Array.from({ length: sortedProductsByType.length }).map(
      (_, index) => `Slide ${index + 1}`
    )
  )

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(page.split('page')[1] - 1)
      handleFirstLastBullets()
      if (sort === 'all') {
        dispatch(sortProductsByType(dailyShop))
      } else if (
        typeListProducts &&
        !typeListProducts.find((product) => product.mainType === sort)
      ) {
        let products = dailyShop.filter((product) =>
          product.displayName
            .replace(/\s/g, '')
            .toLowerCase()
            .match(new RegExp(sort.replace(/\s/g, '').toLowerCase()))
        )
        dispatch(sortProductsByType(products))
      } else if (dailyShop[0]) {
        const resortedProductsByType = dailyShop.filter(
          (product) => product.mainType === sort
        )
        let checking
        if (resortedProductsByType.length === sortedProductsByType.length) {
          checking = resortedProductsByType.filter(
            (p, i) => p.offerId === sortedProductsByType[i].offerId
          )
          checking.length != sortedProductsByType.length &&
            dispatch(sortProductsByType(resortedProductsByType))
        } else {
          dispatch(sortProductsByType(resortedProductsByType))
        }
      }
    }
  }, [
    sort,
    sortedProductsByType.length,
    currentProduct,
    typeListProducts,
    page,
  ])

  const handleFirstLastBullets = () => {
    if (sortedProductsByType.length <= 36) {
      paginationRef.current.style.padding = '0 20px 0 35px'
      paginationRef.current.style.width = '210px'
      lastBulletRef.current.style.display = 'none'
      firstBulletRef.current.style.display = 'none'
      return
    }
    paginationRef.current.style.width = '170px'
    paginationRef.current.style.padding = '0'
    if (swiperRef.activeIndex > 4) {
      firstBulletRef.current.style.display = 'flex'
    } else {
      firstBulletRef.current.style.display = 'none'
    }
    if (
      swiperRef.activeIndex <
      Math.ceil(sortedProductsByType.length / 6) - 5
    ) {
      lastBulletRef.current.style.display = 'flex'
    } else {
      lastBulletRef.current.style.display = 'none'
    }
  }

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 3}`,
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ])
    prependNumber.current = prependNumber.current - 3
    swiperRef.slideTo(swiperRef.activeIndex + 3, 0)
  }
  const append = () => {
    setSlides([
      `Slide ${prependNumber.current - 3}`,
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ])
    prependNumber.current = prependNumber.current + 3
    swiperRef.slideTo(swiperRef.activeIndex - 3, 0)
  }

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0)
  }

  const handleSlidePacker = (singleArray, subArraySize) => {
    const nestedArray = singleArray.reduce(
      (accumulator, currentItem, index) => {
        const subArrayIndex = Math.floor(index / subArraySize)

        if (!accumulator[subArrayIndex]) {
          accumulator[subArrayIndex] = []
        }
        accumulator[subArrayIndex].push(
          <div
            key={currentItem ? currentItem.offerId : index}
            className="slider-cards__card-wrap"
          >
            <div className="slider-cards__card-body">
              {
                <CardProduct
                  parentBlock={'slider-cards'}
                  data={currentItem}
                  sliderCardsRef={sliderCardsRef}
                  itemProductRef={itemProductRef}
                />
              }
            </div>
          </div>
        )

        return accumulator
      },
      []
    )
    return nestedArray.map((slide, index) => (
      <SwiperSlide key={'slide-cards' + ' ' + index}>
        <div className="slider-cards__cards-group">{slide}</div>
      </SwiperSlide>
    ))
  }
  return (
    <div
      className={`${parentBlock}__slider-cards slider-cards`}
      ref={sliderCardsRef}
    >
      <div className="slider-cards__header">
        <div className="slider-cards__title_large">
          Daily shop <span>- /{sort}/</span>
        </div>

        <div className="slider-cards__controller">
          <button className="slider-cards__button-arrow slider-cards__button-arrow_prev swiper-button-prev"></button>
          <p className="append-buttons" ref={firstBulletRef}>
            <span
              className="custom-swiper-bullet-btn"
              onClick={() => slideTo(1)}
            >
              1
            </span>
            <span onClick={() => append()} className="custom-swiper-bullet-btn">
              ...
            </span>
          </p>

          <span ref={paginationRef} className="slider-cards__pagination"></span>
          <p className="append-buttons" ref={lastBulletRef}>
            <span
              onClick={() => prepend()}
              className="custom-swiper-bullet-btn"
            >
              ...
            </span>
            <span
              className="custom-swiper-bullet-btn"
              onClick={() =>
                slideTo(Math.ceil(sortedProductsByType.length / 6))
              }
            >
              {Math.ceil(sortedProductsByType.length / 6)}
            </span>
          </p>

          <button className="slider-cards__button-arrow slider-cards__button-arrow_next swiper-button-next"></button>
        </div>
      </div>
      <div className="slider-cards__slider-list">
        <Swiper
          onSwiper={setSwiperRef}
          grabCursor={true}
          modules={[Virtual, Navigation, Pagination]}
          onSlideChange={() =>
            navigate(
              `/fortnite-api-app/shop/products/${sort}/page${
                swiperRef.activeIndex + 1
              }`
            )
          }
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            el: '.slider-cards__pagination',
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}">${index + 1}</span>`,
            dynamicBullets: true,
            dynamicMainBullets: sortedProductsByType.length <= 36 ? 6 : 3,
          }}
          virtual
          navigation={{
            prevEl: '.slider-cards__button-arrow_prev',
            nextEl: '.slider-cards__button-arrow_next',
            clickable: true,
          }}
        >
          {handleSlidePacker(sortedProductsByType, 6)}
        </Swiper>
      </div>
    </div>
  )
}
