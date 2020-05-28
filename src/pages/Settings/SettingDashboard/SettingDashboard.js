import React from 'react'
import {Grid} from 'semantic-ui-react'
import SettingNav from '../../../components/setting/SettingNav'
import Account from '../AccountPage/AccountPage'
import Basic from '../basic/BasicSetting'
import Aboutme from '../aboutme/abouteme'
import MyPhoto from '../myphoto/MyPhoto'
import { Route,Redirect, Switch } from 'react-router-dom'
import {connect}from 'react-redux'
import {updatepassword,updateprofile} from '../../../store/actions/index'
const SettingDashboard = (props) => {
    return (
        <Grid>
            <Grid.Column  computer={12}>
               <Switch>
               <Redirect exact from='/settingdashboard' to={`/settingdashboard/basic`}/>      
                
            {/* <Route path={'/settingdashboard/'}  render={()=><Basic initialValues={props.user} updateprofile={props.updateprofile}/>}/> */}
                 <Route path={`${props.match.url}/basic`}  render={()=><Basic initialValues={props.user} updateprofile={props.updateprofile}/>}/>
                <Route path={'/settingdashboard/account'} render={()=><Account updatepassword={props.updatepassword}
                 provider={props.provider}/>} />
                
                <Route path={'/settingdashboard/aboutme'} render={()=><Aboutme initialValues={props.user} updateprofile={props.updateprofile}/>}/>
                <Route path={'/settingdashboard/myphoto'} component={MyPhoto}/>
                </Switch>
            </Grid.Column>
            <Grid.Column  computer={4}>
                <SettingNav url={props.match.url}/>
            </Grid.Column>
        </Grid>
    )
}
const mapDispatchToProps={
    updatepassword,
    updateprofile
}
const mapStateToProps=(state)=>{
    return {
        provider:state.firebase.auth.isLoaded&&state.firebase.auth.providerData[0].providerId,
        user:state.firebase.profile
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SettingDashboard)
