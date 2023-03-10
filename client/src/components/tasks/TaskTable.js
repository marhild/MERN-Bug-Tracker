import React, { Fragment} from 'react'
import { Button, Table,Grid } from 'semantic-ui-react'
import { TypeIcon, PriorityCellColor } from './TaskIcons'
import StatusColor from '../status/StatusColor'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import { TASKS_DETAILS, TASKS_HOME } from '../../Constants'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteTask } from '../../actions/taskActions'
import { getProject } from '../../actions/projectActions'

const TaskTable = ({ sortedTasks, project: {project},
  deleteTask,
  getProject,
  history
}) => {


  const removeTask = id => {
    deleteTask(id)
    getProject(project._id, history)
  }

  return (
    <Grid >
    <Grid.Row>

      <Table unstackable selectable  >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedTasks.map(task => {
            const { _id, title, type, status, priority } = task
            const shortTitle = title.substring(0, 40)

            return (
              <Table.Row key={_id}>
                <Table.Cell>{shortTitle}</Table.Cell>
                <Table.Cell>
                  <StatusColor key={uuid.v4()} status={status} />
                </Table.Cell>
                <Table.Cell>
                  <TypeIcon key={uuid.v4()} type={type} />
                </Table.Cell>
                <PriorityCellColor key={uuid.v4()} priority={priority} />
                <Table.Cell textAlign='center' className='button-actions'>
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
                    onClick={() => removeTask(_id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      </Grid.Row>
    </Grid>
  )
}

TaskTable.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, { deleteTask, getProject })(TaskTable)
