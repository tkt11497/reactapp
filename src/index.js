import React from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/App';
import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore'
import rootreducer from './store/reducer/index'
import {Provider} from 'react-redux'
import Scrolltotop from './components/utils/ScrollToTop'
import ReduxToastr from 'react-redux-toastr'
import firebase from './config/firebase'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {createFirestoreInstance} from 'redux-firestore'
const store= configureStore(rootreducer)
const rrfConfig={
    userProfile:'users',
    attachAuthIsReady:true,
    useFirestoreForProfile:true,
    updateProfileOnLogin:false

}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }


ReactDOM.render(
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                <BrowserRouter>
                    <Scrolltotop>
                    <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut'/>
                        <Routes />
                    </Scrolltotop>
                </BrowserRouter>
                </ReactReduxFirebaseProvider>
            </Provider>, 
        document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
