import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './../assets/css/style.css'
import SectionB from './homepage/SectionB'
import SectionA from './homepage/SectionA'
import SectionD from './homepage/SectionD'
import SectionE from './homepage/SectionE'
import Footer from './homepage/Footer'
import RegisterLoginDesktop from './homepage/RegisterLoginDesktop'
import RegisterLoginMobile from './homepage/RegisterLoginMobile'
import NavbarHomepage from './homepage/NavbarHomepage'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = ({auth}) => {

  if(auth.isAuthenticated){
    return <Redirect to="/projects" />
  }

  return (
    <React.Fragment>
      <NavbarHomepage />

      <div style={{ backgroundColor: 'white', marginTop: '-15px' }}>
        <RegisterLoginDesktop />

        <RegisterLoginMobile />

        <SectionA />

        <SectionB />

        <SectionD />

        <SectionE />

        <Footer />
      </div>
    </React.Fragment>
  )
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { })(withRouter(Home))
