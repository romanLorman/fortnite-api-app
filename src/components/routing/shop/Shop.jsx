import { SliderCards } from 'components/shared/slider-cards/SliderCards'
import { FormSearch } from 'components/shared/form-search/FormSearch'
import { Sidebar } from 'components/shared/sidebar/Sidebar'
import { SliderBlock } from 'components/shared/slider-block/SliderBlock'
import { ItemProduct } from 'components/shared/item-product/ItemProduct'
import { useEffect, useRef } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadDailyShop} from 'store/shop/shop-actions'
import { loadMaps } from 'store/maps/maps-actions'
import { loadCrew } from 'store/crew/crew-actions'
import { loadTournaments } from 'store/tournaments/tournaments-actions'
import { loadNews } from 'store/news/news-actons'

export const Shop = ({ parentBlock }) => {
  const dispatch = useDispatch()
  const sliderCardsRef = useRef()
  const itemProductRef = useRef()

  useEffect(() => {
    dispatch(loadDailyShop())
    dispatch(loadNews())
    dispatch(loadMaps())
    dispatch(loadCrew())
    dispatch(loadTournaments())
  }, [])

  return (
    <section id="shop" className={`${parentBlock}__shop shop`}>
      <div className="shop__container">
        <aside className="shop__sidebar">
          <Sidebar parentBlock={'shop'} />
          <SliderBlock parentBlock={'shop'} />
        </aside>
        <div className="shop__content">
          <FormSearch parentBlock={'shop'} mod="_select" />
          <Routes>
            <Route
              path="/fortnite-api-app/*"
              element={
                <Navigate to="/fortnite-api-app/shop/products/all/page1" />
              }
            />
            <Route
              path="/fortnite-api-app/shop/*"
              element={
                <Routes>
                  <Route
                    path="/products/:sort/:page"
                    element={
                      <SliderCards
                        parentBlock={'shop'}
                        sliderCardsRef={sliderCardsRef}
                        itemProductRef={itemProductRef}
                      />
                    }
                  />
                  <Route
                    path="/product/:productId"
                    element={
                      <ItemProduct
                        sliderCardsRef={sliderCardsRef}
                        itemProductRef={itemProductRef}
                        parentBlock={'shop'}
                      />
                    }
                  />
                </Routes>
              }
            />
          </Routes>
        </div>
      </div>
    </section>
  )
}
