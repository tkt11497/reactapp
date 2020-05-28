import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCI191RmddUfpXN7_YPrbY3c-ui_evQS0U",
    authDomain: "nighters-f6323.firebaseapp.com",
    databaseURL: "https://nighters-f6323.firebaseio.com",
    projectId: "nighters-f6323",
    storageBucket: "nighters-f6323.appspot.com",
    messagingSenderId: "355216197359",
    appId: "1:355216197359:web:fc2e819745c657dd00fd1a",
    measurementId: "G-CGJNJ98FQX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  export default firebase