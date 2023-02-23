import { GET_ALL_USERS, GET_USERS_ERRORS } from '../actions/types'

const initialState = {
  users: [],
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case GET_USERS_ERRORS:
      return action.payload
    default:
      return state
  }
}
