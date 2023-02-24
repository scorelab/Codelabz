import { functions } from "firebase/app";
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env"
});

/**
 * +++++++++++++++++++CLOUD FUNCTIONS+++++++++++++++++++++++++++++
 */

/**Import functions
 */
const onCallFunctions = require("./cloud_functions/onCallFunctions");
const onCreateFunctions = require("./cloud_functions/onCreateFunctions");
const onWriteFunctions = require("./cloud_functions/onWriteFunctions");
const onUpdateFunctions = require("./cloud_functions/onUpdateFunctions");
const pubSubFunctions = require("./cloud_functions/pubSubFunctions");

//+++++++++++++++++++++onCall Functions+++++++++++++++++++++++++++++++++
exports.resendVerificationEmail = functions.https.onCall(
  onCallFunctions.resendVerificationEmailHandler
);

exports.sendPasswordUpdateEmail = functions.https.onCall(
  onCallFunctions.sendPasswordUpdateEmailHandler
);

//+++++++++++++++++++++onCreate Functions+++++++++++++++++++++++++++++++
exports.sendVerificationEmail = functions.auth
  .user()
  .onCreate(onCreateFunctions.sendVerificationEmailHandler);

exports.createOrganization = functions.firestore
  .document("cl_org_general/{org_handle}")
  .onCreate(onCreateFunctions.createOrganizationHandler);

//++++++++++++++++++++onWrite Functions+++++++++++++++++++++++++++++++
exports.registerUserHandle = functions.firestore
  .document("cl_user/{uid}")
  .onWrite(onWriteFunctions.registerUserHandleHandler);

//++++++++++++++++++++onUpdate Functions++++++++++++++++++++++++++++++
exports.updateOrgUser = functions.firestore
  .document("cl_org_general/{org_handle}/cl_org_users/users")
  .onUpdate(onUpdateFunctions.addOrgUserHandler);

//++++++++++++++++++++Pub/Sub Functions++++++++++++++++++++++++++++++
exports.deleteTutorialSteps = functions.pubsub
  .schedule("every 7 days")
  .onRun(pubSubFunctions.deleteTutorialStepsHandler);
