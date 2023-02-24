import React from "react";
import UserProfile from "../User/UserProfile/UserProfile";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const db = firebase.firestore();
  const profileData = useSelector(({ firebase: { profile } }) => profile);

  return (
    <React.Fragment>
      <UserProfile profileData={profileData} />
    </React.Fragment>
  );
};

export default Profile;
