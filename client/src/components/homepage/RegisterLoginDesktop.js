import React, { useState } from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import '../../assets/css/style.css'

import Login from '../auth/Login'
import Register from '../auth/Register'

const RegisterLoginDesktop = () => {
  const [registerModal, setRegisterModal] = useState(false)

  const showRegisterModal = () => {
    setRegisterModal(!registerModal)
  }

  return (
    <Grid fluid padded className='computer only'>
      <section id='about' className='section-up'>
        <div className='overlay'>
          <div className='section-b-inner py-5'>
            <div className='loginbox animate__animated animate__fadeIn'>
              <Grid divided='vertically' style={{ marginBottom: '-2rem' }}>
                <Grid.Row columns={2}>
                  <Grid.Column style={{ marginRight: '-1rem' }}>
                    <div className='loginbox-left'>
                      {registerModal && (
                        <React.Fragment>
                          <Header as='h1' className='loginbox-left-header'>
                            Or Register Here!
                          </Header>
                          <p className='loginbox-left-p'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eveniet, numquam.
                          </p>
                          <Button
                            className='loginbox-left-button'
                            onClick={showRegisterModal}
                          >
                            Register
                          </Button>
                        </React.Fragment>
                      )}
                      {!registerModal && (
                        <React.Fragment>
                          <Header as='h1' className='loginbox-left-header'>
                            Welcome Back!
                          </Header>
                          <p className='loginbox-left-p'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eveniet, numquam.
                          </p>
                          <Button
                            className='loginbox-left-button'
                            onClick={showRegisterModal}
                          >
                            Login
                          </Button>
                        </React.Fragment>
                      )}
                    </div>
                  </Grid.Column>
                  <Grid.Column style={{ padding: '0rem' }}>
                    <div className='loginbox-right'>
                      {registerModal && <Login />}
                      {!registerModal && <Register />}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </Grid>
  )
}

export default RegisterLoginDesktop
