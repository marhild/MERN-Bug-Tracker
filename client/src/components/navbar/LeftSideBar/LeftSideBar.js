import React from 'react'
import { Menu, Icon, Sidebar } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const LeftSideBar = ({ appReducer: { sideBarOpen } }) => {
  return (
    <div>
      <Sidebar
        color={'green'}
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={sideBarOpen}
        width='thin'
        className='sidebar'
      >
        <Menu.Item>
        </Menu.Item>
        <Menu.Item as={NavLink} to='/dashboard'>
          <Icon name='home' />
          Dashboard
        </Menu.Item>
        <Menu.Item as={NavLink} to='/projects'>
          <Icon name='table' />
          Projects
        </Menu.Item>
        <Menu.Item as={NavLink} to='/tasks'>
          <Icon name='tasks' />
          Tasks
        </Menu.Item>
        <Menu.Item as={NavLink} to='/categories'>
          <Icon name='folder' />
          Categories
        </Menu.Item>
        <Menu.Item as={NavLink} to='/contacts'>
          <Icon name='address book outline' />
          Contacts
        </Menu.Item>
        <Menu.Item as={NavLink} to='/users'>
          <Icon name='users' />
          Users
        </Menu.Item>
      </Sidebar>
    </div>
  )
}

LeftSideBar.propTypes = {
  auth: PropTypes.object.isRequired,
  appReducer:PropTypes.object.isRequired, 
}

const mapStateToProps = state => ({
  auth: state.auth,
  appReducer: state.appReducer
})

export default withRouter(connect(mapStateToProps, {})(LeftSideBar))
