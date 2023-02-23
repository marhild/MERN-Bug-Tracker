import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useIsMounted from 'ismounted'
import { updateUserInfo } from '../../../actions/userActions'
import { withRouter } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

const ProfileContacts = ({ auth: { user, loading }, history }) => {
  return (
    <div>
      <Container fluid>
        <Header as='h2'>Dogs Roles with Humans</Header>
        <p>
          Domestic dogs inherited complex behaviors, such as bite inhibition,
          from their wolf ancestors, which would have been pack hunters with
          complex body language. These sophisticated forms of social cognition
          and communication may account for their trainability, playfulness, and
          ability to fit into human households and social situations, and these
          attributes have given dogs a relationship with humans that has enabled
          them to become one of the most successful species on the planet today.
        </p>
        <p>
          The dogs' value to early human hunter-gatherers led to them quickly
          becoming ubiquitous across world cultures. Dogs perform many roles for
          people, such as hunting, herding, pulling loads, protection, assisting
          police and military, companionship, and, more recently, aiding
          handicapped individuals. This impact on human society has given them
          the nickname "man's best friend" in the Western world. In some
          cultures, however, dogs are also a source of meat.
        </p>
      </Container>
    </div>
  )
}

ProfileContacts.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, {})(ProfileContacts))
