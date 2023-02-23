import React, { useEffect } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { TypeIcon, PriorityCellColor } from '../tasks/TaskIcons'
import StatusColor from '../status/StatusColor'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import {
  TASKS_DETAILS,
  TASKS_HOME,
  TASKS_CREATE
} from '../../Constants'
import { connect } from 'react-redux'
import {deleteTask } from './../../actions/taskActions'
import PropTypes from 'prop-types'

const PaginatedTable = ({tasks , deleteTask, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Table unstackable selectable>
    <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Title</Table.HeaderCell>
      <Table.HeaderCell>Project</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Priority</Table.HeaderCell>
      <Table.HeaderCell>Type</Table.HeaderCell>
      <Table.HeaderCell>
        <Button floated='right' color='black' as={Link} to={TASKS_CREATE}>
          <i className='fas fa-plus' />
          New Task
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {tasks.map(task => {
      const { _id, title, project, status, priority, type } = task
      const shortTitle = title.substring(0, 25)
      const { name } = project
      return (
        <Table.Row key={_id}>
          <Table.Cell>{shortTitle}</Table.Cell>
          <Table.Cell>{`${name}`}</Table.Cell>
          <Table.Cell>
            <StatusColor key={uuid.v4()} status={status} />
          </Table.Cell>
          <PriorityCellColor key={uuid.v4()} priority={priority} />
          <Table.Cell>
            <TypeIcon key={uuid.v4()} type={type} />
          </Table.Cell>
          <Table.Cell textAlign='right' className='button-actions'>
            <Button
              circular
              compact
              size='mini'
              color='black'
              as={Link}
              to={`${TASKS_DETAILS}/${_id}`}
            >
              <i className='fas fa-eye' />
            </Button>
            <Button
              circular
              compact
              size='mini'
              color='black'
              as={Link}
              to={`${TASKS_HOME}/${_id}`}
            >
              <i className='fas fa-pen' />
            </Button>
            <Button
              circular
              compact
              size='mini'
              color='red'
              onClick={() => deleteTask(_id)}
            >
              <i className='fas fa-trash' />
            </Button>
          </Table.Cell>
        </Table.Row>
      )
    })}
  </Table.Body>
    </Table>
  )
}

PaginatedTable.propTypes = {
  deleteTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { deleteTask })(PaginatedTable)