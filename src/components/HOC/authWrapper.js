import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import {openModal} from '../../store/actions/index'

export const UserIsAuthenticated=connectedReduxRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack:true,
    redirectPath:'/events',
    authenticatedSelector: state => state.firebase.auth.isLoaded&& !state.firebase.auth.isEmpty,
    redirectAction: newLoc=>(dispatch)=>{
        dispatch(openModal('unAuthModal'))
    }
})