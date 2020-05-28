import React,{Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {Menu,Header,Grid} from 'semantic-ui-react'

const SettingNav = (props) => {
    console.log(props,'FROM SETTING NAV')
    return (
            <Fragment>
              <Menu vertical>
                <Header icon="user" attached inverted color="grey" content="Profile" />
                <Menu.Item as={NavLink} to={'/settingdashboard/basic'} >Basics</Menu.Item>
                <Menu.Item as={NavLink} to={'/settingdashboard/aboutme'}>About Me</Menu.Item>
                <Menu.Item as={NavLink} to={'/settingdashboard/myphoto'}>My Photos</Menu.Item>
              </Menu>
              <Grid.Row />
              <Menu vertical>
                <Header
                  icon="settings"
                  attached
                  inverted
                  color="grey"
                  content="Account"
                />
                <Menu.Item as={NavLink} to={'/settingdashboard/account'}>My Account</Menu.Item>
              </Menu>
              </Fragment>
            
    )
}
 
export default React.memo(SettingNav)