import { EffectCards, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ItemTournament } from '../item-tournament/ItemTournament'
import ContentLoader from 'react-content-loader'
import { useSelector } from 'react-redux'
import { selectTournaments } from 'store/tournaments/tournaments-selectors'

export const SliderTournamentBoard = ({ parentBlock }) => {
  const tournaments = useSelector(selectTournaments)
  const tournamentsLoaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  return (
    <div className={`${parentBlock}__slider slider-tournament-board`}>
      <div className="slider-tournament-board__body">
        <Swiper
          modules={[EffectCards, Navigation, Pagination]}
          speed={500}
          effect={'cards'}
          grabCursor={true}
          centeredSlides={true}
          cardsEffect={{
            perSlideOffset: 7,
            perSlideRotate: 1,
            slideShadows: false,
          }}
          loop={true}
          slidesPerView={1.1}
          pagination={true}
          navigation={true}
          breakpoints={{
            1191.98: {
              slidesPerView: 3.5,
              cardsEffect: {
                perSlideOffset: 16,
                perSlideRotate: 10,
              },
            },
            991.98: {
              slidesPerView: 3,
              cardsEffect: {
                perSlideOffset: 16,
                perSlideRotate: 10,
              },
            },
            767.98: {
              slidesPerView: 1.8,
              cardsEffect: {
                perSlideOffset: 12,
                perSlideRotate: 6,
              },
            },
            579.98: {
              slidesPerView: 1.3,
              cardsEffect: {
                perSlideOffset: 9,
                perSlideRotate: 2.5,
              },
            },
            479.98: {
              slidesPerView: 1.2,
              cardsEffect: {
                perSlideOffset: 8,
                perSlideRotate: 2,
              },
            },
          }}
        >
          {tournaments
            ? tournaments.map((t, i) => (
                <SwiperSlide key={t.id + i}>
                  <ItemTournament parentBlock={'slider-tournaments'} data={t} />
                </SwiperSlide>
              ))
            : tournamentsLoaders.map((t, i) => (
                <SwiperSlide key={t + i}>
                  <div className="slider-tournament-board__loader">
                    <ContentLoader
                      speed={1}
                      width="100%"
                      height="100%"
                      viewBox="0 0 390 561"
                      backgroundColor="#27272f"
                      foregroundColor="#6D05DD"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="0"
                        ry="0"
                        width="390"
                        height="561"
                      />
                    </ContentLoader>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  )
}
