import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import ProfilePage from './ProfilePage'
//import ProfileContacts from './ProfileContacts'
import NoMatch from '../../NoMatch'

const Profile = ({ match }) => {
  return (
    <Container fluid>
      <Switch>
        <Route exact path={match.path} component={ProfilePage} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  )
}

export default Profile
