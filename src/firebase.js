import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDp49Emi3_vpkn3yNBd0ajCI6hbAVVERfc",
    authDomain: "chatter-76627.firebaseapp.com",
    projectId: "chatter-76627",
    storageBucket: "chatter-76627.appspot.com",
    messagingSenderId: "556644794663",
    appId: "1:556644794663:web:760a44958a5312ed046902",
    measurementId: "G-TQL8DPL0F7"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;