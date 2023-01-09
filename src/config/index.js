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
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

//console.log("firebaseConfig", firebaseConfig);

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // <- needed if using firestor

if (window.location.hostname === "localhost") {
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.auth().useEmulator("http://localhost:9099", {
    disableWarnings: true,
  });
  firebase.database().useEmulator("localhost", 9000);
  firebase.functions().useEmulator("localhost", 5001);
  db.settings({
    experimentalForceLongPolling: true,
    merge: true,
  });
}

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