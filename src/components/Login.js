import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', showErrorMsge: false, message: ''}

  usernameChange = e => {
    this.setState({username: e.target.value})
  }

  passwordChange = e => {
    this.setState({password: e.target.value})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state

    const loginURL = 'https://apis.ccbp.in/login'
    const loginCredentials = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    }
    const response = await fetch(loginURL, options)
    const statusCode = await response.status
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
      console.log(data.error_msg)
    }
  }

  onSuccess = data => {
    const {history} = this.props
    this.setState({username: '', password: ''})
    Cookies.set('jwt_token', data, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = err => {
    this.setState({showErrorMsge: true, message: err})
    console.log(err)
  }

  render() {
    const {username, password, showErrorMsge, message} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <img
            style={{width: '100px', height: '100px'}}
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            onChange={this.usernameChange}
            id="username"
            type="text"
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            onChange={this.passwordChange}
            id="password"
            type="password"
            value={password}
          />
          {showErrorMsge && <p>{message}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
