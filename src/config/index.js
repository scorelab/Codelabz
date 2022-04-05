import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"; // <- needed if using firebase rtdb
import "firebase/firestore"; // <- needed if using firestore
import "firebase/storage";
import "firebase/functions";
import "firebase/analytics";
import "firebase/performance";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL, // even you can paste direct URL itself
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

export const functions = firebase.functions();

// Retrieve Firebase Messaging object.
let firebase_messaging;
if (firebase.messaging.isSupported()) {
  firebase_messaging = firebase.messaging();
  firebase_messaging.usePublicVapidKey(
    process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY
  );
}

export const messaging = firebase_messaging;

export default firebase;
