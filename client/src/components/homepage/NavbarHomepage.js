import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Menu,
  Segment
} from 'semantic-ui-react'

export const NavbarHomepage = ({ history }) => {
  const [dropdownMenuStyle, setDropdownMenuStyle] = useState({
    display: 'none'
  })

  const handleToggleDropdownMenu = () => {
    if (dropdownMenuStyle.display === 'none') {
      setDropdownMenuStyle({ display: 'flex' })
    } else {
      setDropdownMenuStyle({ display: 'none' })
    }
  }

  const authLinks = (
    <Menu fluid inverted secondary pointing fixed='top'>
      <Menu.Item header as='a'>
        React Bug Tracker
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item as='a' to='/' name='Home'>
          Home
        </Menu.Item>
        <Menu.Item as='a' to='/' name='About'>
          About
        </Menu.Item>
        <Menu.Item as='a' to='/' name='Contact'>
          Contact
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )

  const linksMobile = (
    <Menu borderless fluid inverted vertical style={dropdownMenuStyle}>
      <Menu.Item as='a' to='/'>
        Home
      </Menu.Item>
      <Menu.Item as='a' to='/'>
        About
      </Menu.Item>
      <Menu.Item as='a' to='/'>
        Contact
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      {(authLinks || linksMobile) && (
        <div>
          <Grid fluid padded className='tablet computer only'>
            {authLinks}
          </Grid>
          <Grid padded className='mobile only'>
            <Menu borderless inverted fluid fixed='top'>
              <Menu.Menu position='right'>
                {linksMobile}
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
            </Menu>
          </Grid>
        </div>
      )}
    </div>
  )
}

NavbarHomepage.propTypes = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(withRouter(NavbarHomepage))
