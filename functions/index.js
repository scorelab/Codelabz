const functions = require("firebase-functions");

/**
 * +++++++++++++++++++CLOUD FUNCTIONS+++++++++++++++++++++++++++++
 */

/**Import functions
 */
const onCreateFunctions = require("./cloud_functions/onCreateFunctions");

//+++++++++++++++++++++onCall Functions+++++++++++++++++++++++++++++++++

//+++++++++++++++++++++onCreate Functions+++++++++++++++++++++++++++++++
exports.sendVerificationEmail = functions.auth
  .user()
  .onCreate(onCreateFunctions.sendVerificationEmailHandler);
