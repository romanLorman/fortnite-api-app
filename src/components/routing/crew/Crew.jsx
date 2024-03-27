import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { _slideToggle } from 'assets/js/animation'
import { useRef, useState, useContext, useEffect } from 'react'
import { GlobalContext } from 'context/context'
import ContentLoader from 'react-content-loader'

export const Crew = ({ parentBlock }) => {
  const { crew } = useContext(GlobalContext)
  const [currentPerson, setCurrentPerson] = useState(null)
  const videoWrapRef = useRef()
  const videoRef = useRef()

  useEffect(() => {
    crew && setCurrentPerson(crew[5])
  }, [crew])

  return (
    <section id="crew" className={`${parentBlock}__crew slider-crew`}>
      <div className="slider-crew__container">
        <div className="slider-crew__title_large">your crew</div>
        {crew ? (
          <Swiper
            speed={1000}
            spaceBetween={0}
            slidesPerView={5}
            onSlideChange={(swiper) => {
              setCurrentPerson(null)
              setTimeout(()=> setCurrentPerson(crew[swiper.activeIndex]), 100)
              
            }}
            grabCursor={true}
            navigation={{
              clickable: true,
            }}
            watchSlidesProgress={true}
            centeredSlides={true}
            pagination={{
              el: '.slider-crew__pagination',
              clickable: true,
            }}
            breakpoints={{
              991.98: {
                slidesPerView: 9,
              },
              767.98: {
                slidesPerView: 7,
              },
            }}
            modules={[Pagination, Navigation]}
            initialSlide={5}
            slideToClickedSlide={true}
          >
            <div className="slider-crew__target"></div>
            {crew.map((person, index) => (
              <SwiperSlide key={'crew' + person.rewards[0].item.id + index}>
                <div className="slider-crew__pagination-bullet">
                  <div className="slider-crew__skeleton">
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
                    <div className="slider-crew__img">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={person.rewards[0].item.images.full_background}
                        alt="person-icon"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ContentLoader
            speed={1}
            width="100%"
            height="100%"
            viewBox="0 0 100 13"
            backgroundColor="#27272f"
            foregroundColor="#6D05DD"
          >
            <rect x="0" y="0" rx="0" ry="0" width="100" height="13" />
          </ContentLoader>
        )}

        <div className="slider-crew__content">
          <div className="slider-crew__pagination"></div>
            <div className="slider-crew__item">
              <ContentLoader
                speed={1}
                width="100%"
                height="100%"
                viewBox="0 0 100 55"
                backgroundColor="#27272f"
                foregroundColor="#6D05DD"
              >
                <rect x="0" y="0" rx="0" ry="0" width="100" height="55" />
              </ContentLoader>
              {currentPerson ? (
                <>
                  <div className="slider-crew__poster">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={currentPerson.images.apiRender}
                      alt="poster"
                    />
                  </div>
                  <div
                    className="slider-crew__info"
                    style={{
                      backgroundColor: `#${currentPerson.colors.B}60`,
                    }}
                  >
                    <div className="slider-crew__title">
                      {currentPerson && currentPerson.rewards[0].item.name}
                    </div>
                    <p className="slider-crew__text">
                      {currentPerson
                        ? '"' + currentPerson.rewards[0].item.description + '"'
                        : ''}
                    </p>
                  </div>{' '}
                  <button
                    className="slider-crew__btn_outline"
                    onClick={() => _slideToggle(videoWrapRef.current)}
                  ></button>
                  <div className="slider-crew__video" ref={videoWrapRef}>
                    <div
                      className="slider-crew__cross-icon-btn"
                      onClick={() => {
                        videoRef.current.pause()
                        _slideToggle(videoWrapRef.current)
                      }}
                    >
                      <span></span>
                      <span></span>
                    </div>

                    <video
                      controls
                      muted
                      src={currentPerson && currentPerson.video}
                      ref={videoRef}
                    />
                  </div>
                </>
              ) : (
              ''
              )}
            </div>
        </div>
      </div>
    </section>
  )
}
