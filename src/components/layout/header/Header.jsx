import { Navigation } from 'components/shared/navigation/Navigation'
import { Cart } from 'components/shared/cart/Cart'
import logo from 'assets/images/logo.svg'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const headerMenuActiveRef = useRef()
  const cartRef = useRef()
  const location = useLocation()

  return (
    <header className="header" ref={headerMenuActiveRef}>
      <div className="header__container">
        <Link to='/fortnite-api-app' className="header__logo">
          <img src={logo} alt="logo" />
        </Link>

        <Navigation headerMenuActiveRef={headerMenuActiveRef}/>

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
