import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api'
import messages from '../../messages'
import apiUrl from '../../../apiConfig'

import './SignIn.scss'

class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signIn = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { flash, history, setUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }

  render() {
    const { email, password } = this.state

    return (
      <div className="sign-in-container">
        <div className="sign-in-header">
          <h4></h4>
        </div>
        <form className='auth-form-sign-in' onSubmit={this.signIn}>
          <h4></h4>
          <label htmlFor="email"></label>
          <input
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <label htmlFor="password"></label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      
    )
  }
}

export default withRouter(SignIn)
