import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authentication'
import { NavLink, withRouter } from 'react-router-dom'
import {
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Menu,
} from 'semantic-ui-react'

export const Navbar = ({ logoutUser, history, auth }) => {
  const [dropdownMenuStyle, setDropdownMenuStyle] = useState({
    display: 'none'
  })

  const onLogout = e => {
    e.preventDefault()
    logoutUser(history)
  }

  const handleToggleDropdownMenu = () => {
    if (dropdownMenuStyle.display === 'none') {
      setDropdownMenuStyle({ display: 'flex' })
    } else {
      setDropdownMenuStyle({ display: 'none' })
    }
  }

  const authLinks = (
    <Menu as='nav' fluid inverted secondary>
      <Menu.Item header as='a'>
        React Bug Tracker
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item as={NavLink} to='/messages' name='Messages'>
          <Icon name='envelope' size='large' />
          Messages
        </Menu.Item>
        <Menu.Item as={NavLink} to='/profile' name='Profile'>
          <Icon name='user' size='large' />
          Profile
        </Menu.Item>
        <Menu.Item as={NavLink} to='/settings' name='Settings'>
          <Icon name='cog' size='large' />
          Settings
        </Menu.Item>
        <Menu.Item name='logout' onClick={onLogout} />
      </Menu.Menu>
    </Menu>
  )

  const authLinksMobile = (
    <div>
      <Menu.Item as='a' to='/projects'>
        Projects
      </Menu.Item>
      <Menu.Item as='a' to='/tasks'>
        Tasks
      </Menu.Item>
      <Menu.Item as='a' to='/users'>
        Users
      </Menu.Item>
      <Menu.Item as='a' to='/messages'>
        Messages
      </Menu.Item>
      <Menu.Item as='a' to='/profile'>
        Profile
      </Menu.Item>
      <Menu.Item as='a' name='logout' onClick={onLogout} />
    </div>
  )

  const { isAuthenticated } = auth

  return (
    <div>
      {isAuthenticated && (authLinks || authLinksMobile) && (
        <div>
          <Grid fluid padded className='tablet computer only'>
            <Menu className='menu-navbar-green' inverted fluid fixed='top'>
              {authLinks}
            </Menu>
          </Grid>
          <Grid padded className='mobile only'>
            <Menu
              className='menu-navbar-green'
              borderless
              inverted
              fluid
              fixed='top'
            >
              <Menu.Item header as='a'>
                Project Name
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button
                    basic
                    inverted
                    icon
                    toggle
                    onClick={handleToggleDropdownMenu}
                  >
                    <Icon name='content' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
              <Menu
                className='menu-navbar-green'
                borderless
                fluid
                inverted
                vertical
                style={dropdownMenuStyle}
              >
                {authLinksMobile}
                <Divider fitted />
                <Menu.Item>
                  <Input placeholder='Search...' size='small' />
                </Menu.Item>
              </Menu>
            </Menu>
          </Grid>
        </div>
      )}
    </div>
  )
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))
