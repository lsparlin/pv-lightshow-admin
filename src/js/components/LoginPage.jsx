import React from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

let sequenceApi = ENV.sequenceApi || 'http://localhost:3000'

const LoginPage = (props) => {

  function onFormSubmit(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    let formBody = {}
  
    for (var key of formData.keys()) {
      console.log(key, formData.get(key))
      formBody = Object.assign(formBody, {[key]: formData.get(key)})
    }
    axios.post(sequenceApi + '/login', formBody, {withCredentials: true}).then(response => {
      console.log(response)
      props.history.push('/')
    }).catch(() => {
      console.log('Login attempt failed')
    })
  }
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onFormSubmit}>
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
