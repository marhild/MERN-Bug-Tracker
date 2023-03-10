import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProject } from './../../../actions/projectActions'
import {
  OPEN,
  CATEGORIES_PATH,
  PROJECTS_HOME,
  STATUS_OPTIONS
} from '../../../Constants'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import { GET_CONTACTS_INFO_PATH } from './../../../Constants'
import NewCategory from '../NewCategory'

const Create = ({ createProject, errors, history, auth: { user } }) => {
  const [userOptions, setUserOptions] = useState([
    {
      text: '',
      value: ''
    }
  ])
  const [categories, setCategories] = useState([])
  const [newCategoryOpen, setNewCategoryOpen] = useState(false)
  const [project, setProject] = useState({
    name: '',
    status: OPEN,
    description: '',
    categories: [],
    dueDate: '',
    author: user.id,
    assignedTo: user.id,
    permittedUsers: [user.id]
  })

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    createProject(project, history)
  }

  const loadCategories = async () => {
    await axios
      .get(CATEGORIES_PATH)
      .then(response => {
        setCategories(
          response.data.map(category => ({
            text: `${category.name}`,
            value: category._id
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  //only contacts allowed
  const loadUsersOptions = async userId => {
    var usersForAssignement = []
    if (user) {
      await axios.get(GET_CONTACTS_INFO_PATH + userId).then(res => {
        usersForAssignement = res.data.map(contact => ({
          text: `${contact.name}`,
          value: contact._id
        }))
      })

      usersForAssignement.unshift({ text: `${user.name}`, value: userId })

      setUserOptions(usersForAssignement)
    }
  }

  useEffect(() => {
    loadCategories()
    loadUsersOptions(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, user, newCategoryOpen])

  return (
    <div>
      <NewCategory
        newCategoryOpen={newCategoryOpen}
        setNewCategoryOpen={setNewCategoryOpen}
      />
      <Card fluid>
        <Card.Content header='New Project' />
        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Author'
                name='author'
                value={project.author ? user.name : ''}
                error={errors.author}
                disabled
              />
              <Form.Select
                label='Assign To:'
                name='assignedTo'
                options={userOptions}
                value={project.assignedTo ? project.assignedTo : ''}
                error={errors.assignedTo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Name'
                name='name'
                value={project.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <SemanticDatepicker
                clearOnSameDateClick
                datePickerOnly
                clearable
                name='dueDate'
                label='Due Date'
                onChange={handleInputChange}
                value={project.dueDate}
                format='MMMM Do YYYY'
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                label='Status'
                name='status'
                options={STATUS_OPTIONS}
                value={project.status}
                onChange={handleInputChange}
                error={errors.status}
              />
              <Form.Select
                label='Categories'
                name='categories'
                fluid
                multiple
                selection
                search
                options={categories}
                value={project.categories}
                onChange={handleInputChange}
                error={errors.categories}
              />
              <Icon
                style={{
                  marginTop: '30px',
                  paddingRight: '5px',
                  paddingLeft: '0px',
                  cursor: 'pointer'
                }}
                onClick={setNewCategoryOpen}
                color='green'
                size='big'
                name='plus square outline'
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={project.description}
                onChange={handleInputChange}
                rows='12'
                error={errors.description}
              />
            </Form.Group>
          </Form>
        </Card.Content>
        <Card.Content extra>
          <Button
            floated='right'
            color='black'
            content='Cancel'
            onClick={() => history.push(PROJECTS_HOME)}
          />
          <Button
            floated='right'
            color='green'
            content='Save'
            onClick={handleFormSubmission}
          />
        </Card.Content>
      </Card>
    </div>
  )
}

Create.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { createProject })(Create)
