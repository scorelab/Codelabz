import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./helpers/themes";


//? DomException
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </Provider>,
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
