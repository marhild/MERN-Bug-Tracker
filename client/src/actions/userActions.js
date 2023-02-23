import axios from 'axios'

import { GET_USER_ERRORS, GET_USERS_ERRORS, GET_USER_CONTACTS, GET_ALL_USERS } from './types'

//'/api/users'
import { USERS_PATH, USER_PATH } from '../Constants'

export const getPrivateUserProfile = () => {}

export const getUserInfo = () => {}

export const updateUserInfo = (user, formData, history) => async dispatch => {
  await axios
    .put(`${USER_PATH}/${user._id}`, formData)
    .then(() => {
      dispatch({
        type: GET_USER_ERRORS,
        payload: {}
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USER_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const deleteUser = () => {}


export const getContactsInfo = userId => async dispatch => {
  await axios
    .get(`${USER_PATH}/${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER_CONTACTS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USERS_ERRORS,
        payload: error.response.data
      })
    })
}

export const getAllUsers = () => async dispatch => {
  await axios
    .get(USERS_PATH)
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USERS_ERRORS,
        payload: error
      })
    })
}
