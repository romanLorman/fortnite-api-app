import { EffectFlip, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-flip'

export const ItemTournament = ({ parentBlock, data }) => {
  return (
    <div className={`${parentBlock}__item item-tournament`}>
      <Swiper
        speed={1000}
        effect={'flip'}
        grabCursor={true}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">${
              index === 0 ? 'front' : 'back'
            }</span>`,
        }}
        modules={[EffectFlip, Pagination, Navigation]}
      >
        <SwiperSlide
          style={{
            border: `solid 2px #${data.renderData.background_left_color}`,
          }}
        >
          <div className="item-tournament__poster">
            <img
              src={data.poster}
              alt="tournament-poster"
              loading="lazy"
              decoding="async"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            border: `solid 2px #${data.renderData.poster_fade_color}`,
          }}
        >
          <div className="item-tournament__background">
            <img src={data.posterBack} alt="tournament-background" />
            <div className="item-tournament__content">
              <div className="item-tournament__head">
                <div
                  className="item-tournament__title_large"
                  style={{ color: `#${data.renderData.title_color}` }}
                >
                  {data.name_line1}
                </div>
                <div
                  className="item-tournament__label"
                  style={{ color: `#${data.renderData.shadow_color}` }}
                >
                  <span>
                    type: {'  '}
                    <div
                      className="item-tournament__type"
                      style={{ color: `#${data.renderData.primary_color}` }}
                    >
                      {data.name_line2}
                    </div>
                  </span>

                  <span>
                    schedule: {'  '}
                    <div
                      className="item-tournament__date"
                      style={{ color: `#${data.renderData.primary_color}` }}
                    >
                      {data.schedule}
                    </div>
                  </span>
                </div>
              </div>
              <div className="item-tournament__img">
                <img src={data.tileImage} alt="poster" loading="lazy" />
              </div>
              <div className="item-tournament__body">
                <div
                  className="item-tournament__text"
                  style={{ color: `#${data.renderData.primary_color}` }}
                >
                  {
                    <span
                      style={{
                        backgroundColor: `#${data.renderData.background_text_color}`,
                      }}
                    >
                      “ {data.long_description} ”
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
