import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBhrlgKF4eRCn2v_pyiYvOWDX7LYS4xMCo",
    authDomain: "mk11-ind-project.firebaseapp.com",
    projectId: "mk11-ind-project",
    storageBucket: "mk11-ind-project.appspot.com",
    messagingSenderId: "574002518376",
    appId: "1:574002518376:web:5ad280b557cf7d662c9edd"

})


export const auth = app.auth()
export const firestore = app.firestore()

export default app