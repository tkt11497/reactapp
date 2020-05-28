import { combineReducers}from 'redux'
import eventReducer from '../reducer/eventReducer'
import modalReducer from '../reducer/modalReducer'
import authReducer from '../reducer/authReducer'
import asyncReducer from '../reducer/AsyncReducer'
import {reducer as toastrReducer } from 'react-redux-toastr'
import {reducer as FormReducer} from 'redux-form'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
const rootReducer = combineReducers({
    form: FormReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    toastr: toastrReducer,
    events: eventReducer,
    modal:modalReducer,
    auth:authReducer,
    async:asyncReducer,

});
export default rootReducer