import {
  GET_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT,
  CLOSE_UPLOAD_MODAL,
  OPEN_UPLOAD_MODAL,
  SET_FILE_UPLOADED_TRUE,
  SET_FILE_UPLOADED_FALSE,
  GET_ASSIGNED_PROJECTS
} from '../actions/types'

const initialState = {
  projects: [],
  project: {},
  assignedProjects: [],
  modalOpen: false,
  fileUploaded: false,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      }
    case GET_ASSIGNED_PROJECTS:
      return {
        ...state,
        project:{},
        projects:[],
        assignedProjects: action.payload,
        loading: false
      }
    case CLOSE_UPLOAD_MODAL:
      return {
        ...state,
        modalOpen: false
      }
    case OPEN_UPLOAD_MODAL:
      return {
        ...state,
        modalOpen: true
      }
    case SET_FILE_UPLOADED_TRUE:
      return {
        ...state,
        fileUploaded: true,
        loading: false
      }
    case SET_FILE_UPLOADED_FALSE:
      return {
        ...state,
        fileUploaded: false,
        loading: false
      }
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      }
    case DELETE_PROJECT:
      return {
        ...state,
        //remvove from state without page reload
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      }
    default:
      return state
  }
}
