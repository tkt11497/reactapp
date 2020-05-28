import {createStore,compose,applyMiddleware} from 'redux'
import rootReducer from './reducer/index';
import thunk from 'redux-thunk'
import {getFirebase} from 'react-redux-firebase'
import {reduxFirestore,getFirestore} from 'redux-firestore'
import firebase from '../config/firebase'
const rrfconfig={
    userProfile:'users',
    attachAuthIsReady:true,
    useFirestoreForProfile:true

}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configurestore=()=>{
    const store=createStore(rootReducer,composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
        reduxFirestore(firebase)
    ))
    return store
}
export default configurestore