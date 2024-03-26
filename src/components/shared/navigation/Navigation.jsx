import { useLocation, useNavigate } from 'react-router-dom'
import * as Scroll from 'react-scroll'

export const Navigation = ({ headerMenuActiveRef }) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="header__menu menu">
      <ul className="menu__list">
        <li className="menu__item">
          <Scroll.Link
            onClick={() => {
              navigate('/' + location.pathname + location.hash)
              headerMenuActiveRef.current.classList.remove('_active')
            }}
            className="menu__link"
            to="shop"
            activeClass="menu__link_active"
            spy={true}
            duration={500}
            saveHashHistory={false}
            smooth={true}
          >
            Shop
          </Scroll.Link>
        </li>
        <li className="menu__item">
          <Scroll.Link
            onClick={() => {
              navigate('/' + location.pathname + location.hash)
              headerMenuActiveRef.current.classList.remove('_active')
            }}
            className="menu__link"
            to="tournaments"
            activeClass="menu__link_active"
            spy={true}
            hashSpy={true}
            duration={500}
            saveHashHistory={false}
            smooth={true}
          >
            Tournaments
          </Scroll.Link>
        </li>
        <li className="menu__item">
          <Scroll.Link
            onClick={() => {
              navigate('/' + location.pathname + location.hash)
              headerMenuActiveRef.current.classList.remove('_active')
            }}
            className="menu__link"
            to="maps"
            activeClass="menu__link_active"
            spy={true}
            hashSpy={true}
            duration={500}
            saveHashHistory={false}
            smooth={true}
          >
            Maps
          </Scroll.Link>
        </li>
        <li className="menu__item">
          <Scroll.Link
            onClick={() => {
              navigate('/' + location.pathname + location.hash)
              headerMenuActiveRef.current.classList.remove('_active')
            }}
            className="menu__link"
            to="crew"
            activeClass="menu__link_active"
            spy={true}
            hashSpy={true}
            duration={500}
            saveHashHistory={false}
            smooth={true}
          >
            Crew
          </Scroll.Link>
        </li>
      </ul>
    </nav>
  )
}
