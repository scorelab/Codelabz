export const updateTotalTime = async (firestore, tutorial_id, time) => {
  try {
    const tutorialDoc = await firestore
      .collection("tutorials")
      .doc(tutorial_id)
      .get();
    const currentTotalTime = tutorialDoc.get("total_time") || 0;
    const newTotalTime = parseInt(currentTotalTime) + parseInt(time);

    await firestore.collection("tutorials").doc(tutorial_id).update({
      total_time: newTotalTime,
      updatedAt: firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.log(e.message);
  }
};
