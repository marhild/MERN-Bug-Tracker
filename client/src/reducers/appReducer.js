import {
  SET_SIDEBAR_OPEN,
  SET_SIDEBAR_CLOSED,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED
} from '../actions/types'

const initialState = {
  sideBarOpen: false,
  modalOpen: false,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPEN:
      return {
        ...state,
        sideBarOpen: true,
        loading: false
      }
    case SET_SIDEBAR_CLOSED:
      return {
        ...state,
        sideBarOpen:false,
        loading: false
      }
    case SET_MODAL_OPEN:
      return {
        ...state,
        modalOpen: true,
        loading: false
      }
    case SET_MODAL_CLOSED:
      return {
        ...state,
        modalOpen: false,
        loading: false
      }
    default:
      return state
  }
}
