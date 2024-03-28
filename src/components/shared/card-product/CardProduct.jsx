import ContentLoader from 'react-content-loader'
import { Link, useNavigate } from 'react-router-dom'
import * as Scroll from 'react-scroll'
export const CardProduct = ({ parentBlock, data }) => {
  const scroller = Scroll.scroller
  const navigate = useNavigate()

  const scrollToAnchor = () => {
    scroller.scrollTo('shop', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    })
  }
  return (
    <div className={`${parentBlock}__product card-product`}>
      <div className="card-product__skeleton">
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
      </div>
      {data ? (
        <div
          className="card-product__content"
          style={{ display: !data.offerId && 'none' }}
        >
          <div className="card-product__img">
            <div
              className="card-product__btn"
              onClick={() => {
                scrollToAnchor()
                navigate(`/fortnite-api-app/shop/product/${data.offerId}`)
              }}
            >
              more ...
            </div>

            <img
              src={
                data.granted.length === 1
                  ? data.granted[0].images.full_background
                  : data.displayAssets[0].full_background
              }
              alt="card-product"
              loading="lazy"
            />
          </div>
          <div className="card-product__hover">
            <div className="card-product__label">
              <span>
                Product name:
                <div className="card-product__title">{data.displayName}</div>
              </span>
              <span>
                Type:
                <div className="card-product__type">
                  {data.mainType}
                  {data.subType ? (
                    <span>{'( ' + data.subType + ' )'}</span>
                  ) : (
                    ''
                  )}
                  {data.mainType === 'bundle' ? (
                    <div>
                      {data.granted.map(
                        (item, index) =>
                          index < 6 &&
                          (item.images.icon ? (
                            <img
                              key={'bundle-icon' + data.offerId + index}
                              src={item.images.icon}
                              alt="bundle-icon"
                            />
                          ) : (
                            ''
                          ))
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </span>
              <span>
                Description:
                <p className="card-product__text">
                  {`" ${data.displayDescription || '...'} "`}
                </p>
              </span>
              <span>
                Price:
                <div className="card-product__price">
                  {data.price.finalPrice}
                </div>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
