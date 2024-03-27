import ContentLoader from 'react-content-loader'
import { _slideDown, _slideUp } from 'assets/js/animation'
export const MapItem = ({ selectRef, selectActive, data }) => {
  return (
    <>
      <div className="map-gallery__label">
        <span>
          <label>Release:</label> 
          <label>Date release:</label> 
          <div className="map-gallery__data">
            {data.releaseDate}
            <span
              className="select-arrow"
              onClick={() => {
                if (selectActive.current.classList.contains('_select-active')) {
                  _slideUp(selectRef.current)
                  selectActive.current.classList.remove('_select-active')
                } else {
                  _slideDown(selectRef.current)
                  selectActive.current.classList.add('_select-active')
                }
              }}
            >
              {'>'}
            </span>
          </div>
        </span>
        <span>
          <label>Patch:</label>
          <label>Patch version:</label>
          <div className="map-gallery__data">{data.patchVersion}</div>
        </span>
      </div>
      <div className="map-gallery__case">
        <div className="map-gallery__skeleton">
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            backgroundColor="#27272f"
            foregroundColor="#6D05DD"
          >
            <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
          </ContentLoader>
        </div>
        <div
          className="swiper-zoom-container"
          onClick={() => {
            if (selectActive.current.classList.contains('_select-active')) {
              _slideUp(selectRef.current)
              selectActive.current.classList.remove('_select-active')
            }
          }}
        >
          <img
            decoding="async"
            src={data.urlPOI}
            alt="map-img"
          />
        </div>
      </div>
    </>
  )
}
