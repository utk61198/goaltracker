import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBflrD8mwCqTFrYNtm3CRRKgSNfjX9nc44",
    authDomain: "goaltracker-e68d4.firebaseapp.com",
    databaseURL: "https://goaltracker-e68d4.firebaseio.com",
    projectId: "goaltracker-e68d4",
    storageBucket: "goaltracker-e68d4.appspot.com",
    messagingSenderId: "707982455944",
    appId: "1:707982455944:web:77b717222ea121cc2fdb3d",
    measurementId: "G-GGJ6JZHZ97"
  };
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;