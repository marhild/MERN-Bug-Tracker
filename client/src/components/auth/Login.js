import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../actions/authentication'
import { Form, Button, Container, Header, Grid } from 'semantic-ui-react'
import {MOD_EMAIL, ADMIN_EMAIL, ADMIN_PW, MOD_PW, PROJECTS_HOME} from '../../Constants'


const Login = ({ loginUser, errors, history, auth, showRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const { email, password } = formData
  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    loginUser(user)
  }

  const handleAdminLogin = e => {
    e.preventDefault()
    const admin = {
      email: ADMIN_EMAIL,
      password: ADMIN_PW
    }
    loginUser(admin)
  }

  const handleModLogin = e => {
    e.preventDefault()
    const moderator = {
      email: MOD_EMAIL,
      password: MOD_PW
    }
    loginUser(moderator)
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push(PROJECTS_HOME)
    }
  }, [auth, history])

  //reset errors when switching to another page
  useEffect(() => {
    if (errors.email || errors.password) {
      errors.email = null
      errors.password = null
    }
  }, [errors])

  return (
    <Container>
      <Header as='h1'>Login</Header>
      <Form widths='equal'>
        <Form.Group>
          <Form.Input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
            value={email}
            error={errors.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={password}
            error={errors.password}
          />
        </Form.Group>
      </Form>
      
        <Button
          className='loginbutton'
          color='green'
          content='Login'
          onClick={handleSubmit}
        />
        <Grid className='mobile tablet only'>
        <Grid.Column>
          <Button
            className='loginbutton'
            style={{ marginTop: '1rem' }}
            basic
            color='green'
            content='Or Register'
            onClick={showRegisterModal}
          />
        </Grid.Column>
      </Grid>
        <Container className="sppecbuttncontainer">
        <Button
          color='blue'
          content='Login as Admin'
          onClick={handleAdminLogin}
          className='specbutton'
        />
        <Button
          color='blue'
          content='Login as Moderator'
          onClick={handleModLogin}
          className='specbutton'
        />
        
      </Container>
      <div className="forgotPassword">
      <a href='/forgotpassword'>Forgot Password</a>
    </div>
      
    </Container>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login))
