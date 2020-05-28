import React,{Component,Fragment} from 'react';
import EventDashboard from '../pages/EventDashboard/EventDashboard'
import Home from '../pages/Home/Home'

import EventDetail from '../pages/EventDetail/EventDetail'
import PublicLayout from '../layout/PublicLayout/PublicLayout'
import PeopleDashBoard from '../pages/PeopleDashBoard/PeopleDashBoard'
import {Route, Switch,withRouter} from 'react-router-dom'
import SettingDashboard from '../pages/Settings/SettingDashboard/SettingDashboard';
import EventForm from '../components/Event/EventForm/EventForm'
import Test from '../pages/test/test'
import UserDetail from '../pages/UserDetail/UserDetail'
import ModalManager from '../components/ModalManager'
import {UserIsAuthenticated} from '../components/HOC/authWrapper'
import NotFound from '../components/notFound/NotFound'

class App extends Component {




  render(){

    return (
      <Fragment>
        <ModalManager/>
        <Route path="/"  exact component={Home}/>
        <Route path="/(.+)" render={()=>(
             <Fragment>
         
         <PublicLayout>
             <Switch>
               
               
             <Route path="/eventdashboard" component={EventDashboard}/>
             <Route path="/eventdetail/:id" component={EventDetail}/>
             <Route key={this.props.location.key} path={['/createEvent','/manageEvent/:id']} component={UserIsAuthenticated(EventForm)}/>
             <Route path="/peopledashboard" component={UserIsAuthenticated(PeopleDashBoard)}/>
             <Route path="/settingdashboard"  component={UserIsAuthenticated(SettingDashboard)}/>
             <Route path='/profile/:id' component={UserIsAuthenticated(UserDetail)}/>
             <Route path="/test" component={Test}/>
            
             
             <Route  component={NotFound}/>
             </Switch>
             </PublicLayout>
           </Fragment>
        )}/>
      </Fragment>
    
      
      
    );

  }
  
}

export default withRouter(App);
