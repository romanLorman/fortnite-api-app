import { useContext, useEffect, useRef } from 'react'
import { _slideDown, _slideUp, handleMod } from 'assets/js/animation'
import { RowProduct } from '../row-product/RowProduct'
import { GlobalContext } from 'context/context'
import { Link, useNavigate } from 'react-router-dom'

export const FormSearch = ({ parentBlock, mod }) => {
  const { dailyShop, selectedList, selectProducts } = useContext(GlobalContext)
  const selectListRef = useRef()
  const itemRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    selectedList.length && _slideDown(selectListRef.current)
  }, [selectedList])

  let startSearch = () => {
    selectedList &&
      itemRef.current.value &&
      navigate(`/shop/products/${itemRef.current.value}/page1`)
  }
  const handleUpSelectList = (e) =>
    setTimeout(() => {
      _slideUp(selectListRef.current)
      e.target.value = ''
    }, 200)

  return (
    <div
      className={`${parentBlock}__form-search ${handleMod('form-search', mod)}`}
    >
      <div className="form-search__input">
        <input
          autoComplete="off"
          type="text"
          ref={itemRef}
          onBlur={(e) => handleUpSelectList(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpSelectList(e)
              startSearch()
            }
          }}
          onInput={(e) => {
            let selectedProducts = dailyShop.filter((product) =>
              product.displayName
                .replace(/\s/g, '')
                .toLowerCase()
                .match(
                  new RegExp(e.target.value.replace(/\s/g, '').toLowerCase())
                )
            )
            selectProducts(selectedProducts)
          }}
        />
      </div>
      <button className="form-search__btn" onClick={() => startSearch()}>
        search
      </button>
      <ul className="form-search__select-list" ref={selectListRef}>
        {selectedList.map((product) => (
          <li key={product.offerId + 'selected'} className="form-search__item">
            <Link to={`/shop/product/${product.offerId}`}>
              <RowProduct parentBlock={'form-search'} data={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// <form action="#" className="page__form-search form-search form-search_select">
//   <ul className="form-search__select-list">
//     <li className="form-search__item">1</li>
//     <li className="form-search__item">2</li>
//     <li className="form-search__item">3</li>
//     <li className="form-search__item">4</li>
//     <li className="form-search__item">5</li>
//   </ul>
//   <div className="form-search__input">
//     <input
//       autoComplete="off"
//       type="text"
//       name="form[]"
//       data-error="Error"
//       data-value=""
//       className="input"
//     />
//   </div>
//   <button className="form-search__btn">search</button>
// </form>
