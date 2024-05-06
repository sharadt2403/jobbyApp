import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Header.css'

const Header = props => {
  const {history} = props

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
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
  )
}

export default withRouter(Header)
