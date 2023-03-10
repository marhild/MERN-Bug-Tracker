import {
  GET_CATEGORY_ERRORS,
  GET_PROJECT_ERRORS,
  GET_TASK_ERRORS,
  GET_FILE_ERRORS,
  GET_ERRORS,
  GET_ACTIVITY_ERRORS,
  GET_LOGIN_ERRORS,
  GET_REGISTRATION_ERRORS,
  CONFIRM_PASSWORD_RESET_ERRORS,
  GET_WORKING_TIME_ERRORS,
  GET_USER_ERRORS,
} from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_ERRORS:
      return action.payload
    case GET_USER_ERRORS:
      return action.payload
    case GET_PROJECT_ERRORS:
      return action.payload
    case GET_TASK_ERRORS:
      return action.payload
    case GET_FILE_ERRORS:
      return action.payload
    case GET_ACTIVITY_ERRORS:
      return action.payload
    //auth-errors
    case GET_ERRORS:
      return action.payload
    case GET_LOGIN_ERRORS:
      return action.payload
    case GET_REGISTRATION_ERRORS:
      return action.payload
    case CONFIRM_PASSWORD_RESET_ERRORS:
      return action.payload
    case GET_WORKING_TIME_ERRORS:
      return action.payload

    default:
      return state
  }
}
