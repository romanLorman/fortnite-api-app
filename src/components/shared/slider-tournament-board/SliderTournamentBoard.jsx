import { EffectCards, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ItemTournament } from '../item-tournament/ItemTournament'
import { useSelector } from 'react-redux'
import { selectTournaments } from 'store/tournaments/tournaments-selectors'

export const SliderTournamentBoard = ({ parentBlock }) => {
  const tournaments = useSelector(selectTournaments)
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
          {tournaments.map((t, i) => (
                <SwiperSlide key={t ? t.id : 'tournament' + i}>
                  <ItemTournament parentBlock={'slider-tournaments'} data={t} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  )
}

