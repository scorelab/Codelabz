import firebase from 'firebase/compat/app';
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";// <- needed if using firebase rtdb
import { getFirestore, connectFirestoreEmulator , serverTimestamp } from "firebase/firestore"; // <- needed if using firestore
import "firebase/storage";
import { getApp, initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import "firebase/analytics";
import "firebase/performance";
import { getMessaging, isSupported, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: `https://${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID,
};

//console.log("firebaseConfig", firebaseConfig);

// Initialize firebase instance
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp) // <- needed if using firestor

if (import.meta.env.VITE_APP_USE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  const auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:9099", {
    disableWarnings: true
  });
  const dbs = getDatabase();
  connectDatabaseEmulator(dbs, "localhost", 9000);
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// Initialize other services on firebase instance
getFirestore(); // <- needed if using firestore

export const functions = getFunctions(firebaseApp);

// Retrieve Firebase Messaging object.
let firebase_messaging;
if (isSupported()) {
  firebase_messaging = getMessaging(firebaseApp);
  // firebase_messaging.usePublicVapidKey(
  //   import.meta.env.VITE_APP_FIREBASE_FCM_VAPID_KEY
  // );
  const messaging = getMessaging();
  const apiKey = import.meta.env.VITE_APP_FIREBASE_FCM_VAPID_KEY;
  Notification.requestPermission()
    .then((Permission) => {
      if (Permission === "granted") {
        getToken(messaging, {
          vapidKey: apiKey
        });
      }
    });
}

export const messaging = firebase_messaging;

export  default firebase;












