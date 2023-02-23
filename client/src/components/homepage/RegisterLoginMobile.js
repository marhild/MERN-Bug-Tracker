import React, { useState } from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import '../../assets/css/style.css'

import Login from '../auth/Login'
import Register from '../auth/Register'

const RegisterLoginMobile = () => {
  const [registerModal, setRegisterModal] = useState(false)

  const showRegisterModal = () => {
    setRegisterModal(!registerModal)
    console.log("setRegisterModal", registerModal)
  }

  return (
    <Grid  centered  className='mobile tablet only'>
      <section id='about' className='section-up'>
        <div className='overlay'>
          <div className='section-b-inner py-5'>
            <div className=' animate__animated animate__fadeIn'>
                  <div className='loginbox-mobile'>
                    {registerModal && <Login showRegisterModal = {showRegisterModal}/>}
                    {!registerModal && <Register setRegisterModal = {setRegisterModal}/>}
                  </div>
            </div>
          </div>
        </div>
      </section>
    </Grid>
  )
}

export default RegisterLoginMobile
