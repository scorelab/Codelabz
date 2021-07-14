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

export const searchFromTutorialsIndex = (query) => {
  return tutorials_index.searchFromIndex(query);
};

export const getUserTutorialsBasicData = (user_handle) => async (
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.GET_USER_TUTORIALS_BASIC_START });
    let index;
    const querySnapshot = await firestore
      .collection("cl_codelabz")
      .doc("user")
      .collection(user_handle)
      .get();

    if (querySnapshot.empty) {
      index = [];
    } else {
      index = querySnapshot.docs.map((doc) => {
        const new_doc = {
          owner: user_handle,
          tutorial_id: doc.id,
          title: doc.get("title") || "",
          summary: doc.get("summary") || "",
          featured_image: doc.get("featured_image") || "",
          icon: doc.get("icon") || "",
        };

        tutorials_index.addDocToIndex(new_doc);
        return new_doc;
      });
    }
    dispatch({
      type: actions.GET_USER_TUTORIALS_BASIC_SUCCESS,
      payload: index,
    });
  } catch (e) {
    dispatch({
      type: actions.GET_USER_TUTORIALS_BASIC_FAIL,
      payload: e.message,
    });
  }
};

export const getOrgTutorialsBasicData = (organizations) => async (
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.GET_ORG_TUTORIALS_BASIC_START });
    let index = [];

    const getFinalData = async (handle) => {
      let temp_array;
      const querySnapshot = await firestore
        .collection("cl_codelabz")
        .doc("organization")
        .collection(handle)
        .get();

      if (querySnapshot.empty) {
        temp_array = [];
      } else {
        temp_array = querySnapshot.docs.map((doc) => {
          const new_doc = {
            owner: handle,
            tutorial_id: doc.id,
            title: doc.get("title") || "",
            summary: doc.get("summary") || "",
            featured_image: doc.get("featured_image") || "",
            icon: doc.get("icon") || "",
          };
          tutorials_index.addDocToIndex(new_doc);
          return new_doc;
        });
      }

      return temp_array;
    };

    if (organizations.length > 0) {
      const promises = organizations.map(
        async (org_handle) => await getFinalData(org_handle)
      );

      index = await Promise.all(promises);
    }

    dispatch({
      type: actions.GET_ORG_TUTORIALS_BASIC_SUCCESS,
      payload: index.flat(),
    });
  } catch (e) {
    dispatch({
      type: actions.GET_ORG_TUTORIALS_BASIC_FAIL,
      payload: e.message,
    });
  }
};

export const clearTutorialsBasicData = () => (dispatch) =>
  dispatch({ type: actions.CLEAR_TUTORIALS_BASIC_STATE });

export const createTutorial = (tutorialData) => async (
  firebase,
  firestore,
  dispatch,
  history
) => {
  try {
    dispatch({ type: actions.CREATE_TUTORIAL_START });
    const { title, summary, owner, created_by, is_org } = tutorialData;

    const setData = async (type) => {
      const document = firestore
        .collection("cl_codelabz")
        .doc(type)
        .collection(owner)
        .doc();

      const documentID = document.id;
      const step_id = `${documentID}_${new Date().getTime()}`;

      await document.set({
        created_by,
        owner,
        summary,
        title,
        featured_image: "",
        icon: "",
        url: "",
        steps: {
          [step_id]: {
            id: step_id,
            title: "Step One Title",
            time: 1,
            content: "Sample tutorial step one",
            visibility: true,
            deleted: false,
          },
        },
        background_color: "#ffffff",
        text_color: "#000000",
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      await firebase.ref("notes/" + documentID).set({
        [step_id]: {
          text: "Sample tutorial step one",
          deleted: false,
        },
      });
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
    dispatch({ type: actions.CREATE_TUTORIAL_FAIL, payload: e.message });
  }
};

const checkUserOrOrgHandle = (handle) => async (firebase) => {
  const userHandleExists = await checkUserHandleExists(handle)(firebase);
  const orgHandleExists = await checkOrgHandleExists(handle)(firebase);

  if (userHandleExists && !orgHandleExists) {
    return "user";
  } else if (!userHandleExists && orgHandleExists) {
    return "organization";
  } else {
    throw Error("Internal server error");
  }
};

export const getCurrentTutorialData = (owner, tutorial_id) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.GET_CURRENT_TUTORIAL_START });
    const type = await checkUserOrOrgHandle(owner)(firebase);
    const doc = await firestore
      .collection("cl_codelabz")
      .doc(type)
      .collection(owner)
      .doc(tutorial_id)
      .get();

    const tutorial_data = await firebase
      .ref(`/notes/${tutorial_id}`)
      .once("value");
    const tutorial_steps_from_rtdb = [];
    tutorial_data.forEach((step) => {
      tutorial_steps_from_rtdb.push({
        id: step.key,
        content: step.child("text").val(),
        deleted: step.child("deleted").val(),
      });
    });

    const steps_obj = doc.get("steps");
    const steps = _.orderBy(
      Object.keys(steps_obj).map((step) => steps_obj[step]),
      ["id"],
      ["asc"]
    );
    dispatch({
      type: actions.GET_CURRENT_TUTORIAL_SUCCESS,
      payload: {
        ...doc.data(),
        steps: _.merge(steps, tutorial_steps_from_rtdb).filter(
          (x) => !x.deleted
        ),
        tutorial_id,
      },
    });
  } catch (e) {
    window.location.href = "/";
    dispatch({ type: actions.GET_CURRENT_TUTORIAL_FAIL, payload: e.message });
  }
};

export const addNewTutorialStep = ({
  owner,
  tutorial_id,
  title,
  time,
  id,
}) => async (firebase, firestore, dispatch) => {
  try {
    dispatch({ type: actions.CREATE_TUTORIAL_STEP_START });
    const type = await checkUserOrOrgHandle(owner)(firebase);
    await firestore
      .collection("cl_codelabz")
      .doc(type)
      .collection(owner)
      .doc(tutorial_id)
      .update({
        [`steps.${id}`]: {
          content: "",
          id,
          time,
          title,
          visibility: true,
          deleted: false,
        },
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    await firebase.ref().child("notes").child(tutorial_id).child(id).set({
      text: "",
      deleted: false,
    });

    await getCurrentTutorialData(owner, tutorial_id)(
      firebase,
      firestore,
      dispatch
    );

    dispatch({ type: actions.CREATE_TUTORIAL_STEP_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.CREATE_TUTORIAL_STEP_FAIL, payload: e.message });
  }
};

export const clearCreateTutorials = () => (dispatch) =>
  dispatch({ type: actions.CLEAR_CREATE_TUTORIALS_STATE });

export const getCurrentStepContentFromRTDB = (tutorial_id, step_id) => async (
  firebase,
  dispatch
) => {
  try {
    const data = await firebase
      .ref(`/notes/${tutorial_id}/${step_id}/text`)
      .once("value");

    dispatch({ type: actions.SET_EDITOR_DATA, payload: data.val() });
  } catch (e) {
    console.log(e.message);
  }
};

export const hideUnHideStep = (
  owner,
  tutorial_id,
  step_id,
  visibility
) => async (firebase, firestore, dispatch) => {
  try {
    const type = await checkUserOrOrgHandle(owner)(firebase);
    await firestore
      .collection("cl_codelabz")
      .doc(type)
      .collection(owner)
      .doc(tutorial_id)
      .update({
        [`steps.${step_id}.visibility`]: !visibility,
        updatedAt: firestore.FieldValue.serverTimestamp(),
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

export const removeStep = (
  owner,
  tutorial_id,
  step_id,
  current_step_no
) => async (firebase, firestore, dispatch) => {
  try {
    const type = await checkUserOrOrgHandle(owner)(firebase);
    await firestore
      .collection("cl_codelabz")
      .doc(type)
      .collection(owner)
      .doc(tutorial_id)
      .update({
        [`steps.${step_id}.deleted`]: true,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    await firebase
      .ref()
      .child("notes")
      .child(tutorial_id)
      .child(step_id)
      .child("deleted")
      .set(true);

    const delete_step_key = firebase.ref().child("delete_steps").push().key;

    await firebase.ref().child("delete_steps").child(delete_step_key).set({
      type,
      owner,
      tutorial_id,
      step_id,
    });

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

export const setCurrentStep = (data) => async (dispatch) =>
  dispatch({ type: actions.SET_EDITOR_DATA, payload: data });

export const setCurrentStepNo = (data) => async (dispatch) =>
  dispatch({ type: actions.SET_CURRENT_STEP_NO, payload: data });

export const uploadTutorialImages = (owner, tutorial_id, files) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.TUTORIAL_IMAGE_UPLOAD_START });
    const type = await checkUserOrOrgHandle(owner)(firebase);

    const storagePath = `tutorials/${type}/${owner}/${tutorial_id}`;
    const dbPath = `cl_codelabz/${type}/${owner}`;
    await firebase.uploadFiles(storagePath, files, dbPath, {
      metadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
        return {
          imageURLs: firebase.firestore.FieldValue.arrayUnion({
            name: metadata.name,
            url: downloadURL,
          }),
        };
      },
      documentId: tutorial_id,
    });

    await getCurrentTutorialData(owner, tutorial_id)(
      firebase,
      firestore,
      dispatch
    );

    dispatch({
      type: actions.TUTORIAL_IMAGE_UPLOAD_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: actions.TUTORIAL_IMAGE_UPLOAD_FAIL, payload: e.message });
  }
};

export const clearTutorialImagesReducer = () => (dispatch) =>
  dispatch({ type: actions.CLEAR_TUTORIAL_IMAGES_STATE });

export const remoteTutorialImages = (owner, tutorial_id, name, url) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    dispatch({
      type: actions.TUTORIAL_IMAGE_DELETE_START,
    });
    const type = await checkUserOrOrgHandle(owner)(firebase);

    const storagePath = `tutorials/${type}/${owner}/${tutorial_id}/${name}`;
    const dbPath = `cl_codelabz/${type}/${owner}`;
    await firebase.deleteFile(storagePath);

    await firestore
      .collection(dbPath)
      .doc(tutorial_id)
      .update({
        imageURLs: firebase.firestore.FieldValue.arrayRemove({
          name,
          url,
        }),
      });

    await getCurrentTutorialData(owner, tutorial_id)(
      firebase,
      firestore,
      dispatch
    );

    dispatch({
      type: actions.TUTORIAL_IMAGE_DELETE_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: actions.TUTORIAL_IMAGE_DELETE_FAIL, payload: e.message });
  }
};

export const updateStepTitle = (
  owner,
  tutorial_id,
  step_id,
  step_title
) => async (firebase, firestore, dispatch) => {
  try {
    const type = await checkUserOrOrgHandle(owner)(firebase);

    const dbPath = `cl_codelabz/${type}/${owner}`;

    await firestore
      .collection(dbPath)
      .doc(tutorial_id)
      .update({
        [`steps.${step_id}.title`]: step_title,
        updatedAt: firestore.FieldValue.serverTimestamp(),
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

export const updateStepTime = (
  owner,
  tutorial_id,
  step_id,
  step_time
) => async (firebase, firestore, dispatch) => {
  try {
    const type = await checkUserOrOrgHandle(owner)(firebase);

    const dbPath = `cl_codelabz/${type}/${owner}`;

    await firestore
      .collection(dbPath)
      .doc(tutorial_id)
      .update({
        [`steps.${step_id}.time`]: step_time,
        updatedAt: firestore.FieldValue.serverTimestamp(),
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

export const setTutorialTheme = ({
  tutorial_id,
  owner,
  bgColor,
  textColor,
}) => async (firebase, firestore, dispatch) => {
  try {
    const type = await checkUserOrOrgHandle(owner)(firebase);

    const dbPath = `cl_codelabz/${type}/${owner}`;

    await firestore.collection(dbPath).doc(tutorial_id).update({
      text_color: textColor,
      background_color: bgColor,
      updatedAt: firestore.FieldValue.serverTimestamp(),
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
