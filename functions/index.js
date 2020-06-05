const functions = require("firebase-functions");

/**
 * +++++++++++++++++++CLOUD FUNCTIONS+++++++++++++++++++++++++++++
 */

/**Import functions
 */
const onCallFunctions = require("./cloud_functions/onCallFunctions");
const onCreateFunctions = require("./cloud_functions/onCreateFunctions");

//+++++++++++++++++++++onCall Functions+++++++++++++++++++++++++++++++++
exports.resendVerificationEmail = functions.https.onCall(
  onCallFunctions.resendVerificationEmailHandler
);

//+++++++++++++++++++++onCreate Functions+++++++++++++++++++++++++++++++
exports.sendVerificationEmail = functions.auth
  .user()
  .onCreate(onCreateFunctions.sendVerificationEmailHandler);
