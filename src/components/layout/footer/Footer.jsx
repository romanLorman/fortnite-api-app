import addressIcon from 'assets/icons/address-icon.svg'
import mailIcon from 'assets/icons/mail-icon.svg'
import phoneIcon from 'assets/icons/phone-icon.svg'
import apiIcon from 'assets/icons/api-icon.svg'

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <ul className="footer__social social">
        <li className="social__item">
          <div className="social__icon">
            <img src={addressIcon} alt="address-icon" />
          </div>
          <div className="social__info">Haifa, Israel</div>
        </li>
        <li className="social__item">
          <div className="social__icon">
            <img src={mailIcon} alt="mail-icon" />
          </div>
          <div className="social__info">
            lorman.roman<span>@</span>gmail.com
          </div>
        </li>
        <li className="social__item">
          <div className="social__icon">
            <img src={phoneIcon} alt="phone-icon" />
          </div>
          <div className="social__info">+972 54-229-1801</div>
        </li>
        <li className="social__item">
          <div className="social__icon">
            <img src={apiIcon} alt="api-icon" />
          </div>
          <div className="social__info">
            <a href="https://fortniteapi.io/">FortniteApi.io</a>
          </div>
        </li>
      </ul>
      <div className="footer__copy">
        <span>© 2022 - Roman Lorman.</span> <span>Design by Roman Lorman</span>
      </div>
    </div>
  </footer>
)
