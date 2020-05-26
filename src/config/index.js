import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"; // <- needed if using firebase rtdb
import "firebase/firestore"; // <- needed if using firestore
import "firebase/storage";
import "firebase/functions";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

export const firebaseAuth = firebase.auth();

export default firebase;
