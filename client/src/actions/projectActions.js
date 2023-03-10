import axios from 'axios'
import {
  GET_PROJECT_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT,
  OPEN_UPLOAD_MODAL,
  CLOSE_UPLOAD_MODAL,
  SET_FILE_UPLOADED_TRUE,
  SET_FILE_UPLOADED_FALSE,
  GET_ASSIGNED_PROJECTS
} from './types'
import { PROJECTS_HOME, PROJECTS_PATH, PROJECTS_DETAILS } from '../Constants'

export const createProject = (project, history) => async dispatch => {
  await axios
    .post(PROJECTS_PATH, project)
    .then(() => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: {}
      })
      history.push(PROJECTS_HOME)
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const updateProject = (project, formData, history) => async dispatch => {
  await axios
    .put(`${PROJECTS_PATH}/${project._id}`, formData)
    .then(() => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: {}
      })
      history.push(PROJECTS_DETAILS + '/' + project._id)
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const getProject = (id) => async dispatch => {
  await axios
    .get(`${PROJECTS_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}
export const getProjects = () => async dispatch => {
  await axios
    .get(PROJECTS_PATH)
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const getAssignedProjects = (projectIds) => async dispatch =>{
  var assignedProjects = []

  await projectIds.forEach(projectId =>{
    axios
    .get(`${PROJECTS_PATH}/${projectId}`)
    .then(res =>{
      assignedProjects.push(res.data)
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
  })

  dispatch({
    type: GET_ASSIGNED_PROJECTS,
    payload: assignedProjects
  })


}


export const deleteProject = id => async dispatch => {
  await axios
    .delete(`${PROJECTS_PATH}/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_ERRORS,
        payload: error.response.data
      })
      console.log(error)
    })
}

export const setUploadModalOpen = change => dispatch => {
  if (change) {
    dispatch({
      type: OPEN_UPLOAD_MODAL,
      payload: {}
    })
  } else {
    dispatch({
      type: CLOSE_UPLOAD_MODAL,
      payload: {}
    })
  }
}
export const setFileUploaded = change => dispatch => {
  console.log('setFileUploaded:change', change)
  if (change) {
    dispatch({
      type: SET_FILE_UPLOADED_TRUE,
      payload: {}
    })
  } else {
    dispatch({
      type: SET_FILE_UPLOADED_FALSE,
      payload: {}
    })
  }
}

export const sendInvitation = (invitation) => dispatch =>{

}

export const sendInvitationToContact = (contactId) => dispatch =>{

}
