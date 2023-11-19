const { db, rtdb, admin } = require("../auth");

exports.sendVerificationEmailHandler = async user => {
  try {
    const { uid, email, emailVerified } = user;

    if (!email) {
      return console.log(`Email is undefined for user: ${uid}`);
    }

    if (!emailVerified) {
      const verificationLink = await admin
        .auth()
        .generateEmailVerificationLink(email);
      await db.collection("cl_mail").add({
        to: email,
        template: {
          name: "verificationEmailTemplate",
          data: {
            verificationLink
          }
        }
      });
      return console.log(`Verification email sent to ${email}`);
    } else {
      return console.log(`${email} is already verified`);
    }
  } catch (e) {
    return console.log(e.message);
  }
};

exports.createOrganizationHandler = async (snapshot, context) => {
  try {
    const { org_handle } = context.params;

    const org_email = snapshot.get("org_email");

    const querySnapshot = await db
      .collection("cl_user")
      .where("email", "==", org_email)
      .get();

    const user_uid =
      querySnapshot.docs.length > 0 ? querySnapshot.docs[0].id : null;

    if (!user_uid) {
      return console.log(
        `Error occurred. User with ${org_email} email not found.`
      );
    }

    /**
     * register org_handle in rtdb
     * @type {Promise<void>}
     */
    const registerOrgHandle = rtdb
      .ref(`cl_org_handle`)
      .update({ [org_handle]: true });

    /**
     * create org_metrics sub-collection
     * @type {Promise<FirebaseFirestore.WriteResult>}
     */
    const setOrgMetrics = db
      .collection("cl_org_general")
      .doc(org_handle)
      .collection("cl_org_metrics")
      .doc("metrics")
      .set({
        launch: "",
        launched: false,
        tutorials: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    /**
     * create org_users collection => set user uid and respective permissions
     * @type {Promise<FirebaseFirestore.WriteResult>}
     */
    const setOrgUsers = db
      .collection("org_users")
      .doc(`${org_handle}_${user_uid}`)
      .set({
        uid: user_uid,
        org_handle,
        permissions: [3]
      });

    await Promise.all([registerOrgHandle, setOrgMetrics, setOrgUsers]);
    return console.log(
      `The data of organization: ${org_handle} of user: ${user_uid} is successfully added.`
    );
  } catch (e) {
    return console.log(e);
  }
};
