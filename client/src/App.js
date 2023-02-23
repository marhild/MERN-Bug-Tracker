import React, { useEffect, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/navbar/Navbar'
import LeftSideBar from './components/navbar/LeftSideBar/LeftSideBar'
import NoMatch from './components/NoMatch'
import Projects from './components/projects/pages'
import Profile from './components/profile/pages'
import Messages from './components/messages/pages'
import Users from './components/users/pages'
import Tasks from './components/tasks/pages'
import Categories from './components/categories/index'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authentication'
import history from './history'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import Confirmation from './components/auth/Confirmation'
import ResetPassword from './components/auth/ResetPassword'
import Dashboard from './components/dashboard/'
import PrivateRoute from './privateRoutes'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = 'http://localhost:3000'
  }
}

function App () {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize () {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderNavBar = () => {
    if (windowDimensions.width > 768) {
      return <LeftSideBar />
    } else {
      return <div></div>
    }
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        {renderNavBar()}
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route path='/confirmation/:token' component={Confirmation} />
          <Route path='/resetPassword/:token' component={ResetPassword} />
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/projects' component={Projects} />
          <PrivateRoute path='/tasks' component={Tasks} />
          <PrivateRoute path='/categories' component={Categories} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/users' component={Users} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/messages' component={Messages} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
