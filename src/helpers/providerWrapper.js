import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { rrfProps } from '../store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03AAFA',
    },
  },
});

const ProviderWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {children}
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default ProviderWrapper;
