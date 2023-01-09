import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { theme } from "./helpers/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ReactReduxFirebaseProvider {...rrfProps}>
					<App />
				</ReactReduxFirebaseProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
serviceWorker.unregister();
