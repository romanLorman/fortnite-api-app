import { useRef } from 'react'
import { _slideToggle } from 'assets/js/animation'
import { SlideNews } from 'components/shared/slide-news/SlideNews'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useSelector } from 'react-redux'
import { selectNews } from 'store/news/news-selectors'

export const SliderBlock = ({ parentBlock }) => {
  const news = useSelector(selectNews)
  const swiperRef = useRef()
  const eventListRef = useRef()

  return (
    <div className={`${parentBlock}__slider-block slider-block`}>
      <div className="slider-block__body">
        <div className="slider-block__header">
          <div className="slider-block__title_large">news</div>
          <span
            onClick={(e) => {
              _slideToggle(eventListRef.current)
              e.target.classList.toggle('_active')
            }}
          ></span>
        </div>
        <ul className="slider-block__event-list" ref={eventListRef}>
          <div className="slider-block__pagination"></div>
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            speed={1000}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            pagination={{
              el: '.slider-block__pagination',
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 1,
            }}
            navigation={{
              clickable: true,
              top: '10px',
            }}
          >
            {news &&
              news.map((item) => (
                <SwiperSlide key={item.id}>
                  <SlideNews parentBlock={'slider-block'} data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </ul>
      </div>
    </div>
  )
}

/*<div className='page__news-block news-block'>
    <div className="news-block__header">
      <a className="news-block__title">news</a>
    </div>
    <ul className="news-block__event-list">
        
    </ul>
  </div> */
