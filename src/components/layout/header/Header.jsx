import { Navigation } from 'components/shared/navigation/Navigation'
import { Cart } from 'components/shared/cart/Cart'
import logo from 'assets/images/logo.svg'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Scroll from 'react-scroll'

export const Header = () => {
  const scroller = Scroll.scroller
  const headerMenuActiveRef = useRef()
  const cartRef = useRef()
  const location = useLocation()

  const scrollToAnchor = () => {
    scroller.scrollTo('shop', {
      duration: 300,
      delay: 100,
      smooth: true,
    })
  }

  return (
    <header className="header" ref={headerMenuActiveRef}>
      <div className="header__container">
        <Link
          to="/fortnite-api-app/shop/products/all/page1"
          onClick={() => scrollToAnchor()}
          className="header__logo"
        >
          <img src={logo} alt="logo" />
        </Link>

        <Navigation headerMenuActiveRef={headerMenuActiveRef} />

        <div className="header__actions">
          <Cart cartRef={cartRef} headerMenuActiveRef={headerMenuActiveRef} />
          <Link to={location.pathname}>
            <button
              className="header__icon-menu-btn"
              onClick={() =>
                headerMenuActiveRef.current.classList.toggle('_active')
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
