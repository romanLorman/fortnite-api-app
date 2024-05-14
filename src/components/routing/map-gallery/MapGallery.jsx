import { Zoom, EffectCreative, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/zoom'
import 'swiper/css/effect-creative'
import { useRef, useState } from 'react'
import { MapItem } from './MapItem'
import ContentLoader from 'react-content-loader'
import { useSelector } from 'react-redux'
import { selectMaps } from 'store/maps/maps-selectors'

export const MapGallery = ({ parentBlock }) => {
  const maps = useSelector(selectMaps)
  const selectRef = useRef()
  const selectActive = useRef()
  const [swiperRef, setSwiperRef] = useState(true)
  return (
    <section id="maps" className={`${parentBlock}__map-gallery map-gallery`}>
      <div className="map-gallery__container">
        <div className="map-gallery__title_large">discover maps</div>
        <div className="map-gallery__box" ref={selectActive}>
          <div className="map-gallery__select" ref={selectRef}>
            <ul className="swiper-pagination_select"></ul>
          </div>
          {maps ? (
            <Swiper
              loop={true}
              speed={1000}
              modules={[Zoom, EffectCreative, Navigation, Pagination]}
              zoom={true}
              effect={'creative'}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ['100%', 0, 0],
                },
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
