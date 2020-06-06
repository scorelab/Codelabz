const admin = require("firebase-admin");
const { db } = require("../auth");

exports.sendVerificationEmailHandler = async user => {
  try {
    const { email } = user;
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
  } catch (e) {
    return console.log(e.message);
  }
};
