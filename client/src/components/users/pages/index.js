import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import List from './List'

const Users = ({ match }) => {
  return (
    <Grid style={{ paddingTop: '4rem', paddingLeft: '2rem' }}>
      <Grid.Column>
        <Switch>
          <Route exact path={match.path} component={List} />
        </Switch>
      </Grid.Column>
    </Grid>
  )
}

export default Users
