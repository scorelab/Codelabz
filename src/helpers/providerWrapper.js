import React from "react";
import { Provider } from "react-redux";
import store, { rrfProps } from "../store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default ProviderWrapper;
