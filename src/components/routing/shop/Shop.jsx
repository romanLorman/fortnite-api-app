import { SliderCards } from 'components/shared/slider-cards/SliderCards'
import { FormSearch } from 'components/shared/form-search/FormSearch'
import { Sidebar } from 'components/shared/sidebar/Sidebar'
import { SliderBlock } from 'components/shared/slider-block/SliderBlock'
import { ItemProduct } from 'components/shared/item-product/ItemProduct'
import { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from 'context/context'
import { Route, Routes, Navigate } from 'react-router-dom'

export const Shop = ({ parentBlock }) => {
  const sliderCardsRef = useRef()
  const itemProductRef = useRef()
  const {
    dailyShopLoading,
    createNews,
    createTournaments,
    createMaps,
    createCrewItems,
  } = useContext(GlobalContext)
  useEffect(() => {
    dailyShopLoading()
    createTournaments()
    createNews()
    createMaps()
    createCrewItems()
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
              path="/fortnite-api-app"
              element={<Navigate to="/fortnite-api-app/shop/products/all/page1" />}
            />
            <Route
              path="/fortnite-api-app/shop/*"
              element={
                <Routes>
                  <Route
                    // index
                    path="/fortnite-api-app/products/:sort/:page"
                    element={
                      <SliderCards
                        parentBlock={'shop'}
                        sliderCardsRef={sliderCardsRef}
                        itemProductRef={itemProductRef}
                      />
                    }
                  />
                  <Route
                    path="/fortnite-api-app/product/:productId"
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
{/* "homepage": "https://romanLorman.github.io/fortnite-api-app", */}
