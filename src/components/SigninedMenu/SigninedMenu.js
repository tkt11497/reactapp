import React from 'react'
import {Menu,Image,Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
 const SigninedMenu = (props) => {
    return (
            <Menu.Item position="right">
              <Image avatar spaced="right" src={props.profile.photoURL||'/assets/user.png'} />
              <Dropdown pointing="top left" text={props.profile.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item text="Create Event" icon="plus" as={Link} to={'/createEvent'} />
                  <Dropdown.Item text="My Events" icon="calendar" as={Link} to={`/profile/${props.auth.uid}`} />
                  <Dropdown.Item text="My Network" icon="users" as={Link} to={'/peopledashboard'}/>
                  <Dropdown.Item text="My Profile" icon="user" as={Link} to={`/profile/${props.auth.uid}`}/>
                  <Dropdown.Item text="Settings" icon="settings" as={Link} to="/settingdashboard"/>
                  <Dropdown.Item text="Sign Out" icon="power" onClick={props.signOut} />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
    )
}
export default SigninedMenu
