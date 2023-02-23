import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Create from './Create'
import List from './List'
import Update from './Update'
import Details from './Details'
import Kanban from './Kanban'
import Logs from './Logs'
import NoMatch from '../../NoMatch'

const Projects = ({ match }) => {
  return (
    <Grid padded centered>
      <Grid.Column tablet={14} computer={14} mobile={16}>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route exact path={`${match.path}/create`} component={Create} />
          <Route exact path={`${match.path}/kanban/:_id`} component={Kanban} />
          <Route exact path={`${match.path}/logs/:_id`} component={Logs} />
          <Route
            exact
            path={`${match.path}/details/:_id`}
            component={Details}
          />
          <Route exact path={`${match.path}/:_id`} component={Update} />
          <Route component={NoMatch} />
        </Switch>
      </Grid.Column>
    </Grid>
  )
}

export default Projects
