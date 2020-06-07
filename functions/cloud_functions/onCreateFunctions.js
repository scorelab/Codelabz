const admin = require("firebase-admin");
const { db } = require("../auth");

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
