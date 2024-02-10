import React from "react";
import { Provider } from "react-redux";
import store, { rrfProps } from "../store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./themes";

const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </ThemeProvider>
  </Provider>
);

export default ProviderWrapper;
