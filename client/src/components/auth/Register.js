import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authentication'
import { Form, Button, Container, Header, Grid } from 'semantic-ui-react'

const Register = ({
  registerUser,
  auth,
  errors,
  history,
  setRegisterModal
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const { name, email, password, password_confirm } = formData
  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      name,
      email,
      password,
      password_confirm
    }
    registerUser(user, history)
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    })
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/')
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      })
    }
  }, [auth, history])

  //reset errors when switching to another page
  useEffect(() => {
    if (
      errors.email ||
      errors.password ||
      errors.password_confirm ||
      errors.name
    ) {
      errors.email = null
      errors.password = null
      errors.password_confirm = null
      errors.name = null
    }
  }, [errors])

  return (
    <Container>
      <Header as='h1'>Register</Header>
      <Form widths='equal'>
        <Form.Group>
          <Form.Input
            type='text'
            placeholder='Name'
            name='name'
            onChange={handleInputChange}
            value={name}
            error={errors.name}
          />
        </Form.Group>
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
        <Form.Group>
          <Form.Input
            type='password'
            placeholder='Confirm Password'
            name='password_confirm'
            onChange={handleInputChange}
            value={password_confirm}
            error={errors.password_confirm}
          />
        </Form.Group>
      </Form>
      <Button
        color='green'
        className='registerbutton'
        content='Register'
        onClick={handleSubmit}
      />
      <Grid className='mobile tablet only'>
        <Grid.Column>
          <Button
            className='registerbutton'
            style={{ marginTop: '1rem' }}
            basic
            color='green'
            content='Or Login'
            onClick={setRegisterModal}
          />
        </Grid.Column>
      </Grid>
    </Container>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
