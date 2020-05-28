import React, { Component, Fragment } from 'react'
import {Menu, Container,Button,Responsive} from 'semantic-ui-react'
import {NavLink, withRouter, Link} from 'react-router-dom'
import  SigninedMenu from '../../components/SigninedMenu/SigninedMenu'
import  SignoutedMenu from '../../components/SignoutedMenu/SignoutedMenu'
import {connect} from 'react-redux'
import {openModal}from '../../store/actions/index'
import {withFirebase} from 'react-redux-firebase'

class NavBar extends Component {

  handleSignIn=()=>{
    this.props.openModal('loginModal')
    // this.setState({
    //   authenticated:true
    // })
  }
  handleRegister=()=>{
    this.props.openModal('registerModal')
    // this.setState({
    //   authenticated:true
    // })
  }
  handleSignout=()=>{
    // this.setState({
    //   authenticated:false
    // })
    this.props.firebase.logout()
    this.props.history.push('/')
  }
    render() {
      const {auth}=this.props
        const authenticated= auth.isLoaded&&!auth.isEmpty
        return (
            <Responsive minWidth={668}>
            
         
                  <Menu inverted fixed="top" stackable>
                    <Container>
                      <Menu.Item header as={NavLink} exact to="/">
                        <img src="/assets/logo.png" alt="logo" />
                        Night-Prototype v.0Beta
                      </Menu.Item>
                      <Menu.Item name="Events" as={NavLink} to="/eventdashboard" />
                      {authenticated&&
                      <Fragment>
                        <Menu.Item name="People" as={NavLink} to="/peopledashboard" />
                      <Menu.Item>
                        <Button floated="right"  as={Link} to="/createEvent" positive inverted content="Create Event" />
                      </Menu.Item>
                      </Fragment>}
                      
                      {authenticated?
                      <SigninedMenu  auth={this.props.auth} profile={this.props.profile} signOut={this.handleSignout}/>:<SignoutedMenu signIn={this.handleSignIn} register={this.handleRegister}/>}
                    </Container>
                  </Menu>
            </Responsive>
        )
    }
}
const mapStateToProps=state=>{
  return {
    auth:state.firebase.auth,
    profile: state.firebase.profile
  }
}
const actions={
  openModal,
}
export default  withRouter(withFirebase(connect(mapStateToProps,actions)(NavBar))) 