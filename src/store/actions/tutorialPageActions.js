import * as actions from "./actionTypes";

// Gets all the tutorials with this user having edit access
export const getTutorialstatus = (tutorialid, userid) => async (firebase, firestore, dispatch) => {

  
  const useref = await firestore
    .collection("tutorial_likes")
  const tutorialstatus = await useref
    .where("tutorial_id", "==", tutorialid)
    .where("user_id", "==", userid)
    .get();
  if (tutorialstatus.empty) {
    const newdoc = await firestore
      .collection("tutorial_likes").doc(tutorialid + "_" + userid)
      .add({
        tutorial_id: tutorialid,
        user_id: userid,
        like_status: 0,
      })

    return newdoc;
  }
  else {
    try {
      const tutorialLikes = [];
      tutorialstatus.forEach((doc) => {
        tutorialLikes.push(doc.data());
      });

      return tutorialLikes;
    } catch (e) {
      console.log("error in firebase");
    }

  }

};

export const updateupvotes = (tutid, ls) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    const tutorialRef = firestore.collection("tutorials").doc(tutid);
    const tutorial = await tutorialRef.get();
    let tut;
    if(tutorial.empty){
      console.log("tutorial not found");
    }
    else{
      console.log("tutorial found");
      tut=tutorial.data();
    }
    
    try{
      await tutorialRef.update({ upvotes: tut.upvotes + ls});

    }
    catch{
      await tutorialRef.set({
        ...tut,
        upvotes:tut.upvotes+ls,
      });
    }

    console.log("upvotes:", tut.upvotes+ls);
  } catch (error) {
    console.log("error in updating upvotes", error);
  }
};
export const updatedownvotes = (tutid, ls) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    const tutorialRef = firestore.collection("tutorials").doc(tutid);
    const tutorial = await tutorialRef.get();
    let tut;
    if(tutorial.empty){
      console.log("tutorial not found");
    }
    else{
      console.log("tutorial found");
      tut=tutorial.data();
    }
    
    try{
      await tutorialRef.update({ downvotes: downvotes + ls});
    }
    catch{
      await tutorialRef.set({
        ...tut,
        downvotes:tut.downvotes+ls,
      });
    }

    console.log("downvotes:", tut.downvotes+ls);
  } catch (error) {
    console.log("error in updating upvotes", error);
  }
};

export const updatelikestatus = (tutid, userid, ls) => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    let documentReference = await firestore
      .collection("tutorial_likes")
      .doc(tutid + "_" + userid);

    if (documentReference.exists) {
      await documentReference.update({ like_status: ls });
    } else {
      await documentReference.set({
        tutorial_id: tutid,
        user_id: userid,
        like_status: ls,
      });
    }
  } catch (error) {
    console.log("error in updating like status", error);
  }
};



export const getTutorialFeedIdArray =
  uid => async (firebase, firestore, dispatch) => {
    try {
      let followings = [];
      if (uid) {
        followings = await firestore
          .collection("user_followers")
          .where("followerId", "==", uid)
          .where("isPublished", "==", true)
          .get()
          .then(async docs => {
            const result = [];
            for (const doc of docs.docs) {
              const handle = await firestore
                .collection("cl_user")
                .doc(doc.data().followingId)
                .get()
                .then(doc => doc.data().handle);

              result.push(handle);
            }
            return result;
          });
      }
      let followingUsersTutorials = [];
      if (followings.length > 0) {
        followingUsersTutorials = await firestore
          .collection("tutorials")
          .where("created_by", "in", followings)
          .where("isPublished", "==", true)
          .limit(50)
          .get()
          .then(docs => {
            const tutorialsArray = [];
            docs.docs.map(doc => {
              const tutorialId = doc.id;
              tutorialsArray.push(tutorialId);
            });
            return tutorialsArray;
          });
      }
      let newTutorials = [];
      if (followings.length > 0) {
        newTutorials = await firestore
          .collection("tutorials")
          .where("created_by", "not-in", followings)
          .where("isPublished", "==", true)
          .limit(50)
          .get()
          .then(docs => {
            const tutorialsArray = [];
            docs.docs.map(doc => {
              const tutorialId = doc.id;
              tutorialsArray.push(tutorialId);
            });
            return tutorialsArray;
          });
      } else {
        newTutorials = await firestore
          .collection("tutorials")
          .where("isPublished", "==", true)
          .limit(50)
          .get()
          .then(docs => {
            const tutorialsArray = [];
            docs.docs.map(doc => {
              const tutorialId = doc.id;
              tutorialsArray.push(tutorialId);
            });
            return tutorialsArray;
          });
      }

      const tutorials = followingUsersTutorials.concat(newTutorials);

      return tutorials;
    } catch (e) {
      console.log(e);
    }
  };

export const getTutorialFeedData =
  tutorialIdArray => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_TUTORIAL_FEED_START });
      const tutorials = await firestore
        .collection("tutorials")
        .where("tutorial_id", "in", tutorialIdArray)
        .get();
      if (tutorials.empty) {
        dispatch({ type: actions.GET_TUTORIAL_FEED_SUCCESS, payload: [] });
      } else {
        const feed = tutorials.docs.map(doc => {
          const tutorial = doc.data();
          const tutorialData = {
            tutorial_id: tutorial?.tutorial_id,
            title: tutorial?.title,
            summary: tutorial?.summary,
            owner: tutorial?.owner,
            created_by: tutorial?.created_by,
            createdAt: tutorial?.createdAt,
            featured_image: tutorial?.featured_image,
            upvotes: tutorial?.upvotes,
            downvotes: tutorial?.downvotes,
          };
          return tutorialData;
        });
        dispatch({ type: actions.GET_TUTORIAL_FEED_SUCCESS, payload: feed });
      }
    } catch (e) {
      dispatch({ type: actions.GET_TUTORIAL_FEED_FAILED, payload: e });
    }
  };

export const getTutorialData =
  tutorialID => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_POST_DATA_START });
      const data = await firestore
        .collection("tutorials")
        .doc(tutorialID)
        .get();
      const tutorial = data.data();
      dispatch({ type: actions.GET_POST_DATA_SUCCESS, payload: tutorial });
    } catch (e) {
      dispatch({ type: actions.GET_POST_DATA_FAIL });
      console.log(e);
    }
  };

export const getTutorialSteps =
  tutorialID => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_STEPS_DATA_START });
      const data = await firestore
        .collection("tutorials")
        .doc(tutorialID)
        .collection("steps")
        .get()
        .then(querySnapshot => {
          let steps = [];
          querySnapshot.forEach(doc => {
            steps.push(doc.data());
          });
          return steps;
        });
      dispatch({ type: actions.GET_STEPS_DATA_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.GET_STEPS_DATA_FAIL, payload: e });
      console.log(e);
    }
  };

export const getCommentData =
  commentId => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_COMMENT_DATA_START });
      const data = await firestore
        .collection("cl_comments")
        .doc(commentId)
        .get();
      const comment = data.data();
      dispatch({ type: actions.GET_COMMENT_DATA_SUCCESS, payload: comment });
    } catch (e) {
      dispatch({ type: actions.GET_COMMENT_DATA_FAIL });
      console.log(e);
    }
  };

export const getCommentReply =
  commentId => async (firebase, firestore, dispatch) => {
    try {
      console.log("commentId", commentId);
      dispatch({ type: actions.GET_REPLIES_START });
      console.log("Get replies");
      const replies = await firestore
        .collection("cl_comments")
        .where("replyTo", "==", commentId)
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push(doc.data().comment_id);
          });
          return data;
        });
      dispatch({
        type: actions.GET_REPLIES_SUCCESS,
        payload: { replies, comment_id: commentId }
      });
    } catch (e) {
      console.log(e);
    }
  };

export const addComment = comment => async (firebase, firestore, dispatch) => {
  try {
    dispatch({ type: actions.ADD_COMMENT_START });
    await firestore
      .collection("cl_comments")
      .add(comment)
      .then(docref => {
        firestore.collection("cl_comments").doc(docref.id).update({
          comment_id: docref.id
        });
        if (comment.replyTo == comment.tutorial_id) {
          firestore
            .collection("tutorials")
            .doc(comment.tutorial_id)
            .update({
              comments: firebase.firestore.FieldValue.arrayUnion(docref.id)
            });
        }
      })
      .then(() => {
        dispatch({ type: actions.ADD_COMMENT_SUCCESS });
      });
  } catch (e) {
    dispatch({ type: actions.ADD_COMMENT_FAILED, payload: e.message });
  }
};
