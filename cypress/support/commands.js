// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


const projectId = Cypress.env("PROJECT_ID")
const apiKey = Cypress.env("FIREBASE_API_KEY");
const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: Cypress.env("FIREBASE_MESSAGING_SENDER_ID"),
}
firebase.initializeApp(fbConfig)

// if (import.meta.env.VITE_APP_USE_EMULATOR) {
const db = firebase.firestore(); // <- needed if using firestor

firebase.firestore().useEmulator("localhost", 8080);
firebase.auth().useEmulator("http://localhost:9099", {
  disableWarnings: true,
});
firebase.database().useEmulator("localhost", 9000);
// firebase.functions().useEmulator("localhost", 5001);
db.settings({
  experimentalForceLongPolling: true,
  merge: true,
});
// }

// UID of the user to be used for testing
const uid = "jJMfWeCJqC3rImG4Y7KZSIRRMUZb"
const attachCustomCommands = (
  Cypress,
  { auth, firestore },
) => {
  let currentUser = null
  auth().onAuthStateChanged(user => {
    currentUser = user
  })

  Cypress.Commands.add('login', () => {
    auth().signInWithCustomToken(JSON.stringify({ uid }));
  })

  Cypress.Commands.add('logout', () => {
    const userInfo = currentUser ? currentUser.email : 'Not login yet - Skipped'
    Cypress.log({
      displayName: 'logout',
      consoleProps: () => {
        return { currentUser: userInfo }
      },
    })
    return auth().signOut()
  })

  Cypress.Commands.add('firestore', () => {
    return firestore()
  })
}

attachCustomCommands(Cypress, firebase)