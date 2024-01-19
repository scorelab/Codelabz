import * as actions from "./actionTypes";
import Elasticlunr from "../../helpers/elasticlunr";
import { checkOrgHandleExists, checkUserHandleExists } from "./authActions";
import _ from "lodash";

const tutorials_index = new Elasticlunr(
  "tutorial_id",
  "owner",
  "tutorial_id",
  "title",
  "summary"
);

export const searchFromTutorialsIndex = query => {
  return tutorials_index.searchFromIndex(query);
};

// Gets all the tutorials with this user having edit access
export const getUserTutorialsBasicData =
  user_handle => async (firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_USER_TUTORIALS_BASIC_START });
      let index = [];
      const userTutorialsQuerySnapshot = await firestore
        .collection("tutorials")
        .where("editors", "array-contains", user_handle)
        .get();

      if (userTutorialsQuerySnapshot.empty) {
        index = [];
      } else {
        index = userTutorialsQuerySnapshot.docs.map(doc => {
          const new_doc = {
            owner: user_handle,
            tutorial_id: doc.id,
            title: doc.get("title") || "",
            summary: doc.get("summary") || "",
            featured_image: doc.get("featured_image") || "",
            icon: doc.get("icon") || "",
            isPublished: doc.get("isPublished") || false
          };

          tutorials_index.addDocToIndex(new_doc);
          return new_doc;
        });
      }

      dispatch({
        type: actions.GET_USER_TUTORIALS_BASIC_SUCCESS,
        payload: { owner: user_handle, tutorials: index }
      });
    } catch (e) {
      dispatch({
        type: actions.GET_USER_TUTORIALS_BASIC_FAIL,
        payload: e.message
      });
    }
  };

// Gets the basic data of all the tutorials of the organizations that the user is a part of
export const getOrgTutorialsBasicData =
  organizations => async (firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_ORG_TUTORIALS_BASIC_START });
      let index = [];

      const getFinalData = async handle => {
        let temp_array;
        const orgTutorialsQuerySnapshot = await firestore
          .collection("tutorials")
          .where("owner", "==", handle)
          .get();

        if (orgTutorialsQuerySnapshot.empty) {
          temp_array = [];
        } else {
          temp_array = orgTutorialsQuerySnapshot.docs.map(doc => {
            const new_doc = {
              owner: handle,
              tutorial_id: doc.id,
              title: doc.get("title") || "",
              summary: doc.get("summary") || "",
              featured_image: doc.get("featured_image") || "",
              icon: doc.get("icon") || ""
            };
            tutorials_index.addDocToIndex(new_doc);
            return new_doc;
          });
        }

        return temp_array;
      };

      if (organizations.length > 0) {
        const promises = organizations.map(async org_handle => {
          const tutorials = await getFinalData(org_handle);
          return {
            owner: org_handle,
            tutorials
          };
        });

        index = await Promise.all(promises);
      }

      dispatch({
        type: actions.GET_ORG_TUTORIALS_BASIC_SUCCESS,
        payload: index.flat()
      });
    } catch (e) {
      dispatch({
        type: actions.GET_ORG_TUTORIALS_BASIC_FAIL,
        payload: e.message
      });
    }
  };

export const clearTutorialsBasicData = () => dispatch =>
  dispatch({ type: actions.CLEAR_TUTORIALS_BASIC_STATE });

export const createTutorial =
  tutorialData => async (firebase, firestore, dispatch, history) => {
    try {
      dispatch({ type: actions.CREATE_TUTORIAL_START });
      const { title, summary, owner, created_by, is_org } = tutorialData;

      const setData = async () => {
        const document = firestore.collection("tutorials").doc();

        const documentID = document.id;
        const step_id = `${documentID}_${new Date().getTime()}`;

        await document.set({
          created_by,
          editors: [created_by],
          isPublished: false,
          owner,
          summary,
          title,
          tutorial_id: documentID,
          featured_image: "",
          icon: "",
          url: "",
          background_color: "#ffffff",
          text_color: "#000000",
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp()
        });

        // Adds first step when a tutorial is created
        await addNewTutorialStep({
          owner,
          tutorial_id: documentID,
          title: "Step One",
          time: 5,
          id: step_id
        })(firebase, firestore, dispatch);

        return documentID;
      };

      if (is_org) {
        const documentID = await setData("organization");
        history.push(`/tutorials/${owner}/${documentID}`);
      } else {
        const documentID = await setData("user");
        history.push(`/tutorials/${owner}/${documentID}`);
      }
      dispatch({ type: actions.CREATE_TUTORIAL_SUCCESS });
    } catch (e) {
      console.error("CREATE_TUTORIAL_FAIL", e);
      dispatch({ type: actions.CREATE_TUTORIAL_FAIL, payload: e.message });
    }
  };

const checkUserOrOrgHandle = handle => async firestore => {
  const userHandleExists = await checkUserHandleExists(handle)(firestore);
  const orgHandleExists = await checkOrgHandleExists(handle)(firestore);

  if (userHandleExists && !orgHandleExists) {
    return "user";
  } else if (!userHandleExists && orgHandleExists) {
    return "organization";
  } else {
    throw Error("Internal server error");
  }
};

export const getCurrentTutorialData =
  (owner, tutorial_id) => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_CURRENT_TUTORIAL_START });

      const tutorialDoc = await firestore
        .collection("tutorials")
        .doc(tutorial_id)
        .get();

      const stepsRef = firestore
        .collection("tutorials")
        .doc(tutorial_id)
        .collection("steps");

      const stepsQuerySnapshot = await stepsRef.get();
      const steps_obj = {};
      stepsQuerySnapshot.forEach(step => {
        steps_obj[step.id] = step.data();
        // console.log(step.id, step.data())
      });

      const steps = _.orderBy(
        Object.keys(steps_obj).map(step => steps_obj[step]),
        ["id"],
        ["asc"]
      );
      dispatch({
        type: actions.GET_CURRENT_TUTORIAL_SUCCESS,
        payload: {
          ...tutorialDoc.data(),
          steps: steps.filter(x => !x.deleted),
          tutorial_id
        }
      });
    } catch (e) {
      console.log("GET_CURRENT_TUTORIAL_FAIL", e);
      window.location.href = "/";
      dispatch({ type: actions.GET_CURRENT_TUTORIAL_FAIL, payload: e.message });
    }
  };

export const addNewTutorialStep =
  ({ owner, tutorial_id, title, time, id }) =>
    async (firebase, firestore, dispatch) => {
      try {
        dispatch({ type: actions.CREATE_TUTORIAL_STEP_START });

        await firestore
          .collection("tutorials")
          .doc(tutorial_id)
          .collection("steps")
          .doc(id)
          .set({
            content: `Switch to editor mode to begin <b>${title}</b> step`,
            id,
            time,
            title,
            visibility: true,
            deleted: false
          });

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );

        dispatch({ type: actions.CREATE_TUTORIAL_STEP_SUCCESS });
      } catch (e) {
        console.log("CREATE_TUTORIAL_STEP_FAIL", e.message);
        dispatch({ type: actions.CREATE_TUTORIAL_STEP_FAIL, payload: e.message });
      }
    };

export const clearCreateTutorials = () => dispatch =>
  dispatch({ type: actions.CLEAR_CREATE_TUTORIALS_STATE });

export const getCurrentStepContentFromFirestore =
  (tutorial_id, step_id) => async (firestore, dispatch) => {
    try {
      const stepContent = await firestore
        .collection("tutorials")
        .doc(tutorial_id)
        .collection("steps")
        .doc(step_id)
        .get();

      dispatch({
        type: actions.SET_EDITOR_DATA,
        payload: stepContent.data().content
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const setCurrentStepContent =
  (tutorial_id, step_id, content, setAllSavedCallback) => async (firestore, dispatch) => {
    try {
      const stepDoc = firestore
        .collection("tutorials")
        .doc(tutorial_id)
        .collection("steps")
        .doc(step_id);

      await stepDoc.update({
        ["content"]: content,
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

      dispatch({ type: actions.SET_EDITOR_DATA, payload: content });
      if (setAllSavedCallback && typeof setAllSavedCallback === 'function') {
        setAllSavedCallback(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

export const hideUnHideStep =
  (owner, tutorial_id, step_id, visibility) =>
    async (firebase, firestore, dispatch) => {
      try {
        /* not being used */
        // const type = await checkUserOrOrgHandle(owner)(firebase);
        await firestore
          .collection("tutorials")
          .doc(tutorial_id)
          .collection("steps")
          .doc(step_id)
          .update({
            [`visibility`]: !visibility,
            updatedAt: firestore.FieldValue.serverTimestamp()
          });

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );
      } catch (e) {
        console.log(e.message);
      }
    };

export const publishUnpublishTutorial =
  (owner, tutorial_id, isPublished) =>
    async (firebase, firestore, dispatch) => {
      try {
        await firestore
          .collection("tutorials")
          .doc(tutorial_id)
          .update({
            ["isPublished"]: !isPublished
          });

        getCurrentTutorialData(owner, tutorial_id)(firebase, firestore, dispatch);
      } catch (e) {
        console.log(e.message);
      }
    };

export const removeStep =
  (owner, tutorial_id, step_id, current_step_no) =>
    async (firebase, firestore, dispatch) => {
      try {
        await firestore
          .collection("tutorials")
          .doc(tutorial_id)
          .collection("steps")
          .doc(step_id)
          .delete()

        // const data = await firestore
        //   .collection("tutorials")
        //   .doc(tutorial_id)
        //   .collection("steps")
        //   .doc(step_id)
        //   .get();

        await setCurrentStepNo(
          current_step_no > 0 ? current_step_no - 1 : current_step_no
        )(dispatch);

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );
      } catch (e) {
        console.log(e.message);
      }
    };

export const setCurrentStep = data => async dispatch =>
  dispatch({ type: actions.SET_EDITOR_DATA, payload: data });

export const setCurrentStepNo = data => async dispatch =>
  dispatch({ type: actions.SET_CURRENT_STEP_NO, payload: data });

export const uploadTutorialImages =
  (owner, tutorial_id, files) => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.TUTORIAL_IMAGE_UPLOAD_START });
      const type = await checkUserOrOrgHandle(owner)(firestore);

      const storagePath = `tutorials/${type}/${owner}/${tutorial_id}`;
      const dbPath = `tutorials`;
      await firebase.uploadFiles(storagePath, files, dbPath, {
        metadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
          return {
            imageURLs: firebase.firestore.FieldValue.arrayUnion({
              name: metadata.name,
              url: downloadURL
            })
          };
        },
        documentId: tutorial_id
      });

      await getCurrentTutorialData(owner, tutorial_id)(
        firebase,
        firestore,
        dispatch
      );

      dispatch({
        type: actions.TUTORIAL_IMAGE_UPLOAD_SUCCESS
      });
    } catch (e) {
      dispatch({
        type: actions.TUTORIAL_IMAGE_UPLOAD_FAIL,
        payload: e.message
      });
    }
  };

export const clearTutorialImagesReducer = () => dispatch =>
  dispatch({ type: actions.CLEAR_TUTORIAL_IMAGES_STATE });

export const remoteTutorialImages =
  (owner, tutorial_id, name, url) => async (firebase, firestore, dispatch) => {
    try {
      dispatch({
        type: actions.TUTORIAL_IMAGE_DELETE_START
      });
      const type = await checkUserOrOrgHandle(owner)(firestore);

      const storagePath = `tutorials/${type}/${owner}/${tutorial_id}/${name}`;
      const dbPath = `tutorials`;
      await firebase.deleteFile(storagePath);

      await firestore
        .collection(dbPath)
        .doc(tutorial_id)
        .update({
          imageURLs: firebase.firestore.FieldValue.arrayRemove({
            name,
            url
          })
        });

      await getCurrentTutorialData(owner, tutorial_id)(
        firebase,
        firestore,
        dispatch
      );

      dispatch({
        type: actions.TUTORIAL_IMAGE_DELETE_SUCCESS
      });
    } catch (e) {
      dispatch({
        type: actions.TUTORIAL_IMAGE_DELETE_FAIL,
        payload: e.message
      });
    }
  };

export const updateStepTitle =
  (owner, tutorial_id, step_id, step_title) =>
    async (firebase, firestore, dispatch) => {
      try {
        const dbPath = `tutorials/${tutorial_id}/steps`;
        await firestore
          .collection(dbPath)
          .doc(step_id)
          .update({
            [`title`]: step_title,
            updatedAt: firestore.FieldValue.serverTimestamp()
          });

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );
      } catch (e) {
        console.log(e);
      }
    };

export const updateStepTime =
  (owner, tutorial_id, step_id, step_time) =>
    async (firebase, firestore, dispatch) => {
      try {
        const dbPath = `tutorials/${tutorial_id}/steps`;

        await firestore
          .collection(dbPath)
          .doc(step_id)
          .update({
            [`time`]: step_time,
            updatedAt: firestore.FieldValue.serverTimestamp()
          });

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );
      } catch (e) {
        console.log(e.message);
      }
    };

export const setTutorialTheme =
  ({ tutorial_id, owner, bgColor, textColor }) =>
    async (firebase, firestore, dispatch) => {
      try {
        const dbPath = `tutorials`;

        await firestore.collection(dbPath).doc(tutorial_id).update({
          text_color: textColor,
          background_color: bgColor,
          updatedAt: firestore.FieldValue.serverTimestamp()
        });

        await getCurrentTutorialData(owner, tutorial_id)(
          firebase,
          firestore,
          dispatch
        );
      } catch (e) {
        console.log(e.message);
      }
    };
