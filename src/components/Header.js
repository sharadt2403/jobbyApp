import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <h1>Header</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/jobs">
          <li>Jobs</li>
        </Link>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)
