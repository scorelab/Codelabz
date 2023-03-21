import React, { useEffect } from "react";
import Routes from "./routes";
import "./App.less";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "./store/actions";
import Darkmode from 'darkmode-js'


const App = () => {

  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#D3D3D3', // default: '#fff'
    backgroundColor: '#F5F5F5',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  const firebase = useFirebase();
  const dispatch = useDispatch();
  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations },
      },
    }) => organizations
  );

  useEffect(() => {
    getProfileData(organizations)(firebase, dispatch);
  }, [organizations, firebase, dispatch]);

  return(
    <Routes />
  )

};

export default App;
