import { useRef } from 'react'
import { _slideToggle, handleMod } from 'assets/js/animation'
import iconUnknown from 'assets/icons/unknown-icon.svg'
import { Link, useNavigate } from 'react-router-dom'

export const ItemSidebar = ({ data, mod }) => {
  const hoverRef = useRef()
  const activeItemRef = useRef()
  const navigate = useNavigate()
  return (
    <li
      className="menu-sidebar__item"
      ref={hoverRef}
      onMouseEnter={() => hoverRef.current.classList.add('_hover')}
      onMouseLeave={() => hoverRef.current.classList.remove('_hover')}
      onClick={() => {
        if (window.innerWidth < 991.98) {
          hoverRef.current.classList.toggle('_activeItem')
          _slideToggle(activeItemRef.current)
        }
      }}
    >
      <span
        // to={`/shop/products/${data.mainType}/page1`}
        className={handleMod('menu-sidebar__link', mod)}
        onClick={() =>
          data.mainType === 'all' && navigate('/shop/products/all/page1')
        }
      >
        {data.mainType}
      </span>
      <div
        className={
          handleMod('menu-sidebar__sub-item', mod) + ' ' + 'sub-item-sidebar'
        }
        onMouseLeave={() => hoverRef.current.classList.remove('_hover')}
        ref={activeItemRef}
      >
        <Link to={`/shop/products/${data.mainType}/page1`}>
          <div className="sub-item-sidebar__body">
            <span className="sub-item-sidebar__title">{data.displayName}</span>

            {data.mainType === 'bundle' ? (
              <div className="sub-item-sidebar__icons">
                {data.granted.map((product, i) => (
                  <div key={'data.displayName' + i}>
                    <img
                      src={product.images.icon}
                      alt="bundle-icon"
                      key={'bundle' + i}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="sub-item-sidebar__icon">
                <img
                  src={
                    data.granted && data.granted[0].images.icon
                      ? data.granted[0].images.icon
                      : iconUnknown
                  }
                  alt="product-icon"
                />
              </div>
            )}
            <p className="sub-item-sidebar__text">
              {data.displayDescription ? data.displayDescription : '...'}
            </p>
          </div>
        </Link>
      </div>
    </li>
  )
}
