import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"; // <- needed if using firebase rtdb
import "firebase/compat/firestore"; // <- needed if using firestore
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/compat/messaging";
import { initializeApp } from "firebase/app";
import { onMessage } from "firebase/messaging";

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

export const onlineFirebaseApp = initializeApp(firebaseConfig, "secondary");

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

    experimentalForceLongPolling: false,

    merge: true
  });
}

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

let firebase_messaging;
export const functions = firebase.functions();
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      if (firebase.messaging.isSupported()) {
        firebase_messaging = firebase.messaging();
        firebase_messaging
          .getToken({
            vapidKey: import.meta.env.VITE_APP_FIREBASE_FCM_VAPID_KEY
          })
          .then(curToken => {
            if (curToken) {
              console.log("curToken", curToken);
            } else {
              console.log("Error in getting token");
            }
          })
          .catch(err => console.log(err));
      } else {
        console.log("messaging not supported");
      }
    }
  });
}
requestPermission();
// Retrieve Firebase Messaging object.

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(firebase_messaging, payload => {
      resolve(payload);
    });
  });

export const messaging = firebase_messaging;

export default firebase;

