import { useContext,useRef } from 'react'
import { GlobalContext } from 'context/context'
import { _slideToggle} from 'assets/js/animation'
import { SlideNews } from 'components/shared/slide-news/SlideNews'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export const SliderBlock = ({ parentBlock }) => {
  const {
    newsItems
  } = useContext(GlobalContext)
  const swiperRef = useRef()
  const eventListRef = useRef()
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

  return (
    <div className={`${parentBlock}__slider-block slider-block`}>
      <div className="slider-block__body">
        <div className="slider-block__header">
          <div className="slider-block__title_large">
            news
          </div>
          <span
            onClick={(e) => {
              _slideToggle(eventListRef.current)
              e.target.classList.toggle('_active')
              e.target.classList.contains('_active')
                ? swiperRef.current.autoplay.stop()
                : swiperRef.current.autoplay.start()
            }}
          ></span>
        </div>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        <ul className="slider-block__event-list" ref={eventListRef}>
          <div className="slider-block__pagination"></div>
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            speed={1000}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
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
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
          >
            {newsItems && newsItems.map((news) => (
              <SwiperSlide key={news.id}>
                <SlideNews parentBlock={'slider-block'} data={news} />
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
