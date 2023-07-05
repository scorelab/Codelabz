import * as actions from "./actionTypes";
export const getTutorialData =
  tutorialID => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_POST_DATA_START });
      const data = await firestore
        .collection("cl_tutorials")
        .doc(tutorialID)
        .get();
      const tutorial = data.data();
      console.log("post", tutorial);
      dispatch({ type: actions.GET_POST_DATA_SUCCESS, payload: tutorial });
    } catch (e) {
      console.log(e);
    }
  };
