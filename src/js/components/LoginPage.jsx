import React from 'react'
import { withRouter } from 'react-router'

import Requests from 'helpers/Requests'

const LoginPage = (props) => {

  function onFormSubmit(event) {
    event.preventDefault()
    let formBody = {username: document.login.username.value, password: document.login.password.value}
  
    Requests.post('/login', formBody).then(response => {
      props.history.push('/')
    }).catch(() => {
      console.log('Login attempt failed')
    })
  }
  
  return (
    <div className="LoginPage">
      <h2>Login</h2>
      <form onSubmit={onFormSubmit} name="login" action="/">
        <div className="row">
          <div className="four columns">
            <input name="username" type="text" placeholder="Username" className="u-full-width" />
          </div>
          <div className="four columns">
            <input name="password" type="password" placeholder="Password" className="u-full-width" />
          </div>
          <div className="four columns">
            <input type="submit" className="button-primary" value="Login" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(LoginPage)
