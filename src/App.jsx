import React, { useEffect } from "react";
import Routes from "./routes";
import "./App.less";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, subscribeOrg, unSubscribeOrg } from "./store/actions";

const App = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    getProfileData(organizations)(firebase, dispatch);
  }, [organizations, firebase, dispatch]);
  return (
    <>
      <button
        onClick={async () => {
        //   await firestore
        //     .collection("cl_org_general")
        //     .get()
        //     .then(snap => {
        //       const ids = [];
        //       snap.forEach(async docu => {
        //         console.log(docu.data());
        //         ids.push(docu.id);

        //         await firestore
        //           .collection("cl_org_general")
        //           .doc(docu.id)
        //           .set({
        //             ...docu.data(),
        //             followerCount: 0,
        //             contributorsCount: 0,
        //             feedCount: 0,
        //             org_published: docu.data()?.org_published || false,
        //           });
        //       });
        //     });
			await unSubscribeOrg("codelabzorg")(firebase, firestore, dispatch);
        }}
      >
        click
      </button>
      <Routes />;
    </>
  );
};

export default App;
