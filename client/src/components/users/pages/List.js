import React, { useEffect } from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import ListLoader from '../../loader/ListLoader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllUsers } from '../../../actions/userActions'

const List = ({ users: { users }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  if (users == null || users.lenght === 0) {
    return <ListLoader />
  }

  return (
    <Card.Group centered>
      {users.map(user => {
        const { _id, name, bio, date, contacts, avatar } = user
        return (
            <Card className="projectCard" key={_id}>
              <Image
                src={avatar}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                  <span className='date'>{date}</span>
                </Card.Meta>
                <Card.Description>
                  {bio.substring(0, 50) + '...'}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {contacts.length} Friends
                </a>
              </Card.Content>
            </Card>
        )
      })}
    </Card.Group>
  )
}

List.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, { getAllUsers })(List)
