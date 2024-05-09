import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Header.css'
import {TiHome} from 'react-icons/ti'
import {FaSearch} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const {history} = props

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header-container">
        <Link to="/">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="list-container">
          <div className="options-container">
            <Link to="/" className="link">
              <li className="options">Home</li>
            </Link>
            <Link to="/jobs" className="link">
              <li className="options">Jobs</li>
            </Link>
          </div>
          <button className="logout-button" type="button" onClick={logout}>
            Logout
          </button>
        </ul>
      </div>

      <div className="header-container-mobile">
        <Link to="/" className="link-image-mobile">
          <img
            className="logo-image-mobile"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </Link>
        <ul className="list-container-mobile">
          <div className="options-container-mobile">
            <Link to="/" className="link-mobile">
              <li className="options-mobile">
                <TiHome className="icon-home-mobile" />
              </li>
            </Link>
            <Link to="/jobs" className="link-mobile">
              <li className="options-mobile">
                <FaSearch className="icon-search-mobile" />
              </li>
            </Link>
          </div>
          {/* eslint-disable-next-line */}
          <button
            className="logout-button-mobile"
            type="button"
            onClick={logout}
          >
            <FiLogOut />
          </button>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
