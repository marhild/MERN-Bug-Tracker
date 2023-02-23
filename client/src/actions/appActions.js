import {
  SET_SIDEBAR_OPEN,
  SET_SIDEBAR_CLOSED,
  SET_MODAL_OPEN,
  SET_MODAL_CLOSED
} from '../actions/types'

export const openSideBar = () => async dispatch => {
  dispatch({
    type: SET_SIDEBAR_OPEN,
    payload: {}
  })
}

export const closeSideBar = () => async dispatch => {
  dispatch({
    type: SET_SIDEBAR_CLOSED,
    payload: {}
  })
}

export const openModal = () => async dispatch => {
  dispatch({
    type: SET_MODAL_OPEN,
    payload: {}
  })
}

export const closeModal = () => async dispatch => {
  dispatch({
    type: SET_MODAL_CLOSED,
    payload: {}
  })
}