const admin = require("firebase-admin");
const { db, rtdb } = require("../auth");

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

    const us_handle =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[0].get("handle")
        : null;

    if (!us_handle) {
      return console.log(
        `Error occurred. User with ${org_email} email not found.`
      );
    }

    const registerOrgHandle = rtdb
      .ref(`cl_org_handle`)
      .update({ [org_handle]: true });

    const setAdminGroup = db
      .collection("cl_org_group")
      .doc(org_handle)
      .collection("groups")
      .doc("admin")
      .set({ org_grp_users: [us_handle], org_grp_permissions: [1, 2, 3] });

    const setStandardGroup = db
      .collection("cl_org_group")
      .doc(org_handle)
      .collection("groups")
      .doc("standard")
      .set({ org_grp_users: [us_handle], org_grp_permissions: [1, 0, 0] });

    const setOrgUsers = db
      .collection("cl_org_users")
      .doc(org_handle)
      .set({ users: [us_handle] });

    await Promise.all([
      registerOrgHandle,
      setAdminGroup,
      setStandardGroup,
      setOrgUsers
    ]);
    return console.log(
      `The data of organization: ${org_handle} of user: ${us_handle} is successfully added.`
    );
  } catch (e) {
    return console.log(e);
  }
};
