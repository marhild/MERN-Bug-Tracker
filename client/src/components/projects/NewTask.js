import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTask } from './../../actions/taskActions'
import {
  PROJECTS_DETAILS,
  TYPE_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  OPEN,
  FEATURE,
  LOW,
} from './../../Constants'
import { withRouter } from 'react-router'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

const NewTask = ({
  createTask,
  errors,
  setShowNewTask,
  showNewTask,
  match,
  history,
  auth: { user },
  project: {project}
}) => {
  const [userOptions, setUserOptions] = useState([])
  const [task, setTask] = useState({
    title: '',
    description: '',
    project: match.params._id,
    status: OPEN,
    priority: LOW,
    type: FEATURE,
    author: user.id,
    dueDate: '',
    assignedTo: user.id
  })

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const cancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setTask({
      title: '',
      project: match.params._id,
      description: '',
      status: OPEN,
      priority: LOW,
      type: FEATURE,
      author: user._id,
      dueDate: '',
      assignedTo: user._id
    })
    setShowNewTask(false)
  }

  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    createTask(task)
    setSubmitting(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
      history.push(PROJECTS_DETAILS + '/' + match.params._id)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  const loadPermittedUsersOptions = () => {
    if (project.permittedUsers) {
      setUserOptions(
        project.permittedUsers.map(user => ({
          text: `${user.name}`,
          value: user._id
        }))
      )
    }
  }

  useEffect(() => {
    loadPermittedUsersOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNewTask])

  return (
    <div>
      <Modal open={showNewTask} centered>
        <Modal.Header>New Task </Modal.Header>
        <Modal.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Author'
                name='author'
                value={task.author ? user.name : ''}
                error={errors.author}
                disabled
              />
              <Form.Select
                label='Assign To:'
                name='assignedTo'
                options={userOptions}
                value={task.assignedTo}
                error={errors.assignedTo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Title'
                name='title'
                value={task.title}
                onChange={handleInputChange}
                error={errors.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                label='Priority'
                name='priority'
                options={PRIORITY_OPTIONS}
                value={task.priority}
                onChange={handleInputChange}
                error={errors.priority}
              />
              <Form.Select
                label='Status'
                name='status'
                options={STATUS_OPTIONS}
                onChange={handleInputChange}
                value={task.status}
                error={errors.status}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                label='Type'
                name='type'
                options={TYPE_OPTIONS}
                value={task.type}
                onChange={handleInputChange}
                error={errors.type}
              />
              <SemanticDatepicker
                clearOnSameDateClick
                datePickerOnly
                clearable
                name='dueDate'
                label='Due Date'
                onChange={handleInputChange}
                value={task.dueDate}
                format='MMMM Do YYYY'
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={task.description}
                onChange={handleInputChange}
                rows='8'
                error={errors.description}
              />
            </Form.Group>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color='black' onClick={() => cancel()}>
            Cancel
          </Button>
          <Button color='green' content='Save' onClick={handleFormSubmission} />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

NewTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  project: state.project
})

export default withRouter(connect(mapStateToProps, { createTask })(NewTask))
