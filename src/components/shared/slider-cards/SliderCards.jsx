import { Navigation, Pagination, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { CardProduct } from '../card-product/CardProduct'
import { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from 'context/context'
import { useNavigate, useParams } from 'react-router-dom'

export const SliderCards = ({
  parentBlock,
  sliderCardsRef,
  itemProductRef,
}) => {
  const {
    dailyShop,
    sortedList,
    currentProduct,
    sortedProducts,
    sortProducts,
  } = useContext(GlobalContext)

  const [swiperRef, setSwiperRef] = useState(null)
  const firstBulletRef = useRef()
  const lastBulletRef = useRef()
  const paginationRef = useRef()
  const prependNumber = useRef(1)
  const { sort, page } = useParams()
  const navigate = useNavigate()
  const [slides, setSlides] = useState(
    Array.from({ length: sortedProducts.length }).map(
      (_, index) => `Slide ${index + 1}`
    )
  )

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(page.split('page')[1] - 1)
      if (sortedProducts.length < 36) {
        paginationRef.current.style.padding = '0 20px 0 35px'
        lastBulletRef.current.style.display = 'none'
      } else {
        paginationRef.current.style.padding = '0'
      }
      if (
        sortedList &&
        !sortedList.find((product) => product.mainType === sort)
      ) {
        let products = dailyShop.filter((product) =>
          product.displayName
            .replace(/\s/g, '')
            .toLowerCase()
            .match(new RegExp(sort.replace(/\s/g, '').toLowerCase()))
        )
        sortProducts(products)
      } else if (sort === 'all') {
        sortProducts(dailyShop)
      } else if (dailyShop[0]) {
        const resortedProducts = dailyShop.filter(
          (product) => product.mainType === sort
        )
        let checking;
        if (resortedProducts.length===sortedProducts.length) {
          checking =resortedProducts.filter(
          (p, i) => p.offerId === sortedProducts[i].offerId
        )
        checking.length != sortedProducts.length &&
          sortProducts(resortedProducts)
        } else {
          sortProducts(resortedProducts)
        }
        
        
      }
    }
  }, [sort, sortedProducts, currentProduct])

  const handleFirstLastBullets = () => {
    if (swiperRef.previousIndex < swiperRef.activeIndex) {
      if (swiperRef.activeIndex >= 0 && swiperRef.activeIndex < 5) {
        firstBulletRef.current.style.display = 'none'
        return (
          sortedProducts.length > 36 &&
          (lastBulletRef.current.style.display = 'flex')
        )
      }
      if (
        swiperRef.activeIndex > Math.ceil(sortedProducts.length / 6) - 4 &&
        swiperRef.activeIndex <= Math.ceil(sortedProducts.length / 6) - 1
      ) {
        if (sortedProducts.length > 36) {
          firstBulletRef.current.style.display = 'flex'
        }

        return (lastBulletRef.current.style.display = 'none')
      }
    }
    if (swiperRef.previousIndex > swiperRef.activeIndex) {
      if (swiperRef.activeIndex >= 0 && swiperRef.activeIndex < 3) {
        firstBulletRef.current.style.display = 'none'
        return (
          sortedProducts.length > 36 &&
          (lastBulletRef.current.style.display = 'flex')
        )
      }
      if (
        swiperRef.activeIndex > Math.ceil(sortedProducts.length / 6) - 6 &&
        swiperRef.activeIndex <= Math.ceil(sortedProducts.length / 6) - 2
      ) {
        if (sortedProducts.length > 36) {
          firstBulletRef.current.style.display = 'flex'
        }

        return (lastBulletRef.current.style.display = 'none')
      }
    }

    firstBulletRef.current.style.display = 'flex'
    lastBulletRef.current.style.display = 'flex'
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
          <p
            className="append-buttons"
            ref={firstBulletRef}
            style={{ display: 'none' }}
          >
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
          <p
            className="append-buttons"
            ref={lastBulletRef}
            style={{
              display: sortedProducts.length < 30 ? 'none' : 'flex',
            }}
          >
            <span
              onClick={() => prepend()}
              className="custom-swiper-bullet-btn"
            >
              ...
            </span>
            <span
              className="custom-swiper-bullet-btn"
              onClick={() => slideTo(Math.ceil(sortedProducts.length / 6))}
            >
              {Math.ceil(sortedProducts.length / 6)}
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
          onSlideChange={() => {
            navigate(`/fortnite-api-app/shop/products/${sort}/page${swiperRef.activeIndex + 1}`)
            lastBulletRef.current &&
              firstBulletRef.current &&
              handleFirstLastBullets()
          }}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            el: '.slider-cards__pagination',
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}">${index + 1}</span>`,
            dynamicBullets: true,
            dynamicMainBullets: sortedProducts.length <= 30 ? 5 : 3,
          }}
          virtual
          navigation={{
            prevEl: '.slider-cards__button-arrow_prev',
            nextEl: '.slider-cards__button-arrow_next',
            clickable: true,
          }}
        >
          {handleSlidePacker(sortedProducts, 6)}
        </Swiper>
      </div>
    </div>
  )
}
