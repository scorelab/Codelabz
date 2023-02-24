import React, { useEffect } from "react";
import Routes from "./routes";
import "./App.less";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "./store/actions";

const App = () => {
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
	return <Routes />;
};

export default App;
