import { useEffect, useRef } from 'react'
import { ItemSidebar } from './sidebar-item/ItemSidebar'
import { _slideToggle } from 'assets/js/animation'
import { useContext } from 'react'
import { GlobalContext } from 'context/context'

export const Sidebar = ({ parentBlock }) => {
  const sideMenuActiveRef = useRef()
  const menuListRef = useRef()
  const { dailyShop, createSortedList, sortedList } = useContext(GlobalContext)
  useEffect(() => {
    if (dailyShop[0]) {
      let shopTypes = [{ offerId: 'allProducts', mainType: 'all' }]
      for (let index = 0; index < dailyShop.length; index++) {
        !shopTypes.find(
          (product, i) => dailyShop[index].mainType === product.mainType
        ) && shopTypes.push(dailyShop[index])
      }
      createSortedList(shopTypes)
    }
  }, [dailyShop])

  return (
    <nav
      className={`${parentBlock}__menu menu-sidebar`}
      ref={sideMenuActiveRef}
    >
      <div className="menu-sidebar__header">
        <div className="menu-sidebar__title_large">Catalog</div>
        <div onClick={() => _slideToggle(menuListRef.current)}>
          <button
            onClick={() =>
              sideMenuActiveRef.current.classList.toggle('_active')
            }
            className="menu-sidebar__icon-menu-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <ul className="menu-sidebar__list" ref={menuListRef}>
        {sortedList &&
          sortedList.map((item, index) => (
            <ItemSidebar
              key={item.offerId}
              data={item}
              mod={index ? '_nested' : ''}
            />
          ))}
      </ul>
    </nav>
  )
}
