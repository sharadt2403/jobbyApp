import {Link} from 'react-router-dom'

const Header = () => (
  <div>
    <h1>Header</h1>
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/jobs">
        <li>Jobs</li>
      </Link>
    </ul>
  </div>
)

export default Header
