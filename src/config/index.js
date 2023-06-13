import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"; // <- needed if using firebase rtdb
import "firebase/compat/firestore"; // <- needed if using firestore
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: `https://${
    import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
  }.firebaseio.com`,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID
};

//console.log("firebaseConfig", firebaseConfig);

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // <- needed if using firestor

if (import.meta.env.VITE_APP_USE_EMULATOR) {
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.auth().useEmulator("http://localhost:9099", {
    disableWarnings: true
  });
  firebase.database().useEmulator("localhost", 9000);
  firebase.functions().useEmulator("localhost", 5001);
  db.settings({
    // experimentalForceLongPolling: true,
    merge: true
  });
}

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

export const functions = firebase.functions();

// Retrieve Firebase Messaging object.
let firebase_messaging;
if (firebase.messaging.isSupported()) {
  firebase_messaging = firebase.messaging();
  firebase_messaging
    .getToken({
      vapidKey: import.meta.env.VITE_APP_FIREBASE_FCM_VAPID_KEY
    })
    .then(curToken => console.log("curToken", curToken))
    .catch(err => console.log(err));
}

export const messaging = firebase_messaging;

export default firebase;
