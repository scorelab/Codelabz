const { db, rtdb, admin } = require("../auth");

exports.deleteTutorialStepsHandler = async () => {
  console.log("starting of deleting tutorial steps");

  const delete_steps = await rtdb.ref(`/delete_steps`).once("value");

  const delete_steps_array = [];
  delete_steps.forEach(step => {
    delete_steps_array.push({
      id: step.key,
      type: step.child("type").val(),
      owner: step.child("owner").val(),
      tutorial_id: step.child("tutorial_id").val(),
      step_id: step.child("step_id").val()
    });
  });

  if (delete_steps_array.length > 0) {
    const promises = delete_steps_array.map(async step => {
      await db
        .collection("cl_codelabz")
        .doc(step.type)
        .collection(step.owner)
        .doc(step.tutorial_id)
        .update({
          [`steps.${step.step_id}`]: admin.firestore.FieldValue.delete(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

      await rtdb
        .ref()
        .child("notes")
        .child(step.tutorial_id)
        .child(step.step_id)
        .remove();

      await rtdb
        .ref()
        .child("delete_steps")
        .child(step.id)
        .remove();
    });
    await Promise.all(promises);
    console.log("completed of deleting tutorial steps");
  } else {
    console.log("no steps to delete");
  }
};
