import { Zoom, EffectCube, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cube'
import 'swiper/css/zoom'
import { useRef, useState, useContext } from 'react'
import { GlobalContext } from 'context/context'
import { MapItem } from './MapItem'
import ContentLoader from 'react-content-loader'

export const MapGallery = ({ parentBlock }) => {
  const { maps } = useContext(GlobalContext)
  const selectRef = useRef()
  const selectActive = useRef()
  const [swiperRef, setSwiperRef] = useState(true)
  return (
    <section id="maps" className={`${parentBlock}__map-gallery map-gallery`}>
      <div className="map-gallery__container">
        <div className="map-gallery__title_large">discover maps</div>
        <div className="map-gallery__box" ref={selectActive}>
          <div className="map-gallery__select" ref={selectRef}>
            <ul className="swiper-pagination_select">
            </ul>
          </div>
          {maps ? (
            <Swiper
              loop={true}
              effect={'cube'}
              speed={1500}
              modules={[Zoom, EffectCube, Navigation, Pagination]}
              zoom={true}
              // onSlideChangeTransitionEnd={() => setSwiperRef(true)}
              // onSlideChangeTransitionStart={() => setSwiperRef(false)}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              style={{
                '--swiper-navigation-color': '#e4e7ec',
              }}
              pagination={{
                el: '.swiper-pagination_select',
                renderBullet: function (index, className) {
                  return (
                    '<li  class="' +
                    className +
                    '">' +
                    maps[index].releaseDate +
                    '</li>'
                  )
                },
                hideOnClick: true,
                clickable: true,
                type: 'bullets',
              }}
              navigation={{
                clickable: true,
              }}
            >
              {maps.map((m, i) => (
                <SwiperSlide key={m.patchVersion + i}>
                  <MapItem
                    selectRef={selectRef}
                    selectActive={selectActive}
                    data={m}
                    swiperRef={swiperRef}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
              <ContentLoader
                speed={1}
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                backgroundColor="#27272f"
                foregroundColor="#6D05DD"
              >
                <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
              </ContentLoader>
          )}
        </div>
      </div>
    </section>
  )
}
