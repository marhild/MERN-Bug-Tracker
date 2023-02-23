import axios from 'axios'
import {
  GET_ERRORS,
  GET_LOGIN_ERRORS,
  SET_CURRENT_USER,
  CONFIRM_REGISTRATION,
  GET_REGISTRATION_ERRORS,
  CONFIRM_PASSWORD_RESET,
  CONFIRM_PASSWORD_RESET_ERRORS,
  SET_SIDEBAR_OPEN,
  SET_SIDEBAR_CLOSED
} from './types'
import setAuthToken from '../setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/user/register', user)
    .then(res => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: {}
      })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = (user, history) => dispatch => {
  axios
    .post('/api/user/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      dispatch({
        type: GET_LOGIN_ERRORS,
        payload: {}
      })
      dispatch({
        type: SET_SIDEBAR_OPEN,
        payload: {}
      })
      
    })
    .catch(err => {
      dispatch({
        type: GET_LOGIN_ERRORS,
        payload: err.response.data
      })
    })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  try {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    dispatch({
      type: SET_SIDEBAR_CLOSED,
      payload: {}
    })
    if (history) {
      history.push('/')
    }
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    })
  }
}

export const confirmRegistration = token => async dispatch => {
  //console.log('/api/users/confirmation/' + token)
  await axios
    .put('/api/user/confirmation/' + token)
    .then(res => {
      dispatch({
        type: CONFIRM_REGISTRATION,
        payload: res.data
      })
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_REGISTRATION_ERRORS,
        payload: err.response.data
      })
    })
}

export const resetPassword = (user, token, history) => async dispatch => {
  console.log('/api/user/resetPassword/' + token)
  await axios
    .post('/api/user/resetPassword/' + token, user)
    .then(res => {
      dispatch({
        type: CONFIRM_PASSWORD_RESET,
        payload: res.data
      })

      dispatch({
        type: CONFIRM_PASSWORD_RESET_ERRORS,
        payload: {}
      })

      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: CONFIRM_PASSWORD_RESET_ERRORS,
        payload: err.response.data
      })
    })
}

export const requestPasswordReset = (email, history) => async dispatch => {
  await axios
    .post('/api/user/requestPasswordReset', email)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })

      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
