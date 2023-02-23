import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import MessagesPage from './MessagesPage'
//import ProfileContacts from './ProfileContacts'
import NoMatch from '../../NoMatch'

const Messages = ({ match }) => {
  return (
    <Container fluid>
      <Switch>
        <Route exact path={match.path} component={MessagesPage} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  )
}

export default Messages
