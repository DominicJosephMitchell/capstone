import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../../api'
import messages from '../../messages'
import apiUrl from '../../../apiConfig'
import './SignUp.scss'

class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signUp = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation } = this.state
    const { flash, history, setUser } = this.props

    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render() {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="sign-up-container">
        <div className="sign-up-header">
          <h4></h4>
        </div>

        <form className='auth-form-sign-up' onSubmit={this.signUp}>
          <h4></h4>
          <label htmlFor="email"></label>
          <input
            required
            name="email"
            value={email}
            type="email"
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
          <label htmlFor="passwordConfirmation"></label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp)
