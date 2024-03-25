import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  componentDidMount = async () => {
    const loginURL = 'https://apis.ccbp.in/login'
    const loginCredentials = {
      username: 'rahul',
      password: 'rahul@2021',
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    }
    const response = await fetch(loginURL, options)
    const statusCode = await response.status
    const data = await response.json()
    if (statusCode === 200) {
      Cookies.set('jwtToken', data.jwt_token)
    }
    console.log(Cookies.get('jwtToken'))
  }

  render() {
    return <div>Login</div>
  }
}

export default Login
