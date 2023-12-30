const { db, admin } = require("../auth");
const _ = require("lodash");

exports.addOrgUserHandler = async (change, context) => {
  try {
    const newValue = _.omit(change.after.data(), ["createdAt", "updatedAt"]);
    const previousValue = _.omit(change.before.data(), [
      "createdAt",
      "updatedAt"
    ]);
    const newUsersList = Object.keys(newValue);
    const previousUsersList = Object.keys(previousValue);

    //check if the new array has a new user
    /**example
     * newUsersList = [1,2,3]
     * previousUsersList = [1,2]
     * addedUser = [3]
     * @type {array<string>}
     */
    const addedUser = _.difference(newUsersList, previousUsersList);

    //check if the new array has removed user
    /**example
     * newUsersList = [1,2]
     * previousUsersList = [1,2,3]
     * removedUser = [3]
     * @type {array<string>}
     */
    const removedUser = _.difference(previousUsersList, newUsersList);

    if (addedUser.length > 0) {
      await db
        .collection("cl_user")
        .doc(addedUser[0])
        .update({
          organizations: admin.firestore.FieldValue.arrayUnion(
            context.params.org_handle
          )
        });
      return console.log(
        `user [${addedUser[0]}] successfully updated. Added [${context.params.org_handle}] to organizations.`
      );
    } else if (removedUser.length > 0) {
      await db
        .collection("cl_user")
        .doc(removedUser[0])
        .update({
          organizations: admin.firestore.FieldValue.arrayRemove(
            context.params.org_handle
          )
        });
      return console.log(
        `user [${removedUser[0]}] successfully updated. Removed [${context.params.org_handle}] from organizations.`
      );
    } else {
      return console.log(`No new added users or removed users`);
    }
  } catch (e) {
    return console.log(e);
  }
};
