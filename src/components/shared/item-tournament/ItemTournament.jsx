import ContentLoader from 'react-content-loader'

export const ItemTournament = ({ parentBlock, data }) => {
  return (
    <div className={`${parentBlock}__item item-tournament`}>
      <div className="item-tournament__background">
        <ContentLoader
          speed={1}
          width="100%"
          height="100%"
          viewBox="0 0 390 561"
          backgroundColor="#27272f"
          foregroundColor="#6D05DD"
        >
          <rect x="0" y="0" rx="0" ry="0" width="390" height="561" />
        </ContentLoader>

        <div className="item-tournament__content">
          <div className="item-tournament__background-img">
            <img
              src={data.posterBack}
              alt="tournament-background"
              loading="lazy"
            />
          </div>
          <div className="item-tournament__content-box">
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
                  type:
                  <div
                    className="item-tournament__type"
                    style={{ color: `#${data.renderData.primary_color}` }}
                  >
                    {data.name_line2}
                  </div>
                </span>

                <span>
                  schedule:
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
      </div>
    </div>
  )
}
