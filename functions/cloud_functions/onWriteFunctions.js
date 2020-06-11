const { rtdb } = require("../auth");

exports.registerUserHandleHandler = async change => {
  try {
    const newValue = change.after.get("handle");
    const previousValue = change.before.get("handle");

    if (
      previousValue === undefined &&
      newValue !== undefined &&
      newValue !== previousValue
    ) {
      await rtdb.ref(`cl_user_handle`).update({ [newValue]: true });
    }

    return console.log("Function executed");
  } catch (e) {
    return console.log(e);
  }
};
