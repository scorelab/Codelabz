import validator from "validator";

export const validateName = (
  name,
  setNameValidateError,
  setNameValidateErrorMessage
) => {
  if (validator.isEmpty(name)) {
    setNameValidateError(true);
    setNameValidateErrorMessage("Please enter your name");
    return false;
  } else if (!name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
    setNameValidateError(true);
    setNameValidateErrorMessage("Please enter a real name");
    return false;
  } else {
    setNameValidateError(false);
    setNameValidateErrorMessage("");
    return true;
  }
};

export const validateOrgName = (
  orgName,
  setOrgNameValidateError,
  setOrgNameValidateErrorMessage
) => {
  if (validator.isEmpty(orgName)) {
    setOrgNameValidateError(true);
    setOrgNameValidateErrorMessage("Please enter organization name");
    return false;
  } else if (!orgName.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
    setOrgNameValidateError(true);
    setOrgNameValidateErrorMessage("Please enter a real name");
    return false;
  } else {
    setOrgNameValidateError(false);
    setOrgNameValidateErrorMessage("");
    return true;
  }
};

export const validateHandle = async (
  checkUserHandleExists,
  firebase,
  dispatch,
  handle,
  setHandleValidateError,
  setHandleValidateErrorMessage
) => {
  const handleExists = await checkUserHandleExists(handle)(firebase, dispatch);
  if (validator.isEmpty(handle)) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage("Please enter a handle");
    return false;
  } else if (
    !validator.isAlphanumeric(handle) ||
    !validator.isLowercase(handle)
  ) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(
      "User handle can only contain lowercase alphanumeric characters"
    );
    return false;
  } else if (handle.length < 6) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(
      "User handle cannot be less than 6 characters"
    );
    return false;
  } else if (handleExists) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(`The handle ${handle} is already taken`);
    return false;
  } else {
    setHandleValidateError(false);
    setHandleValidateErrorMessage("");
    return true;
  }
};

export const validateOrgHandle = async (
  checkOrgHandleExists,
  firebase,
  dispatch,
  orgHandle,
  setOrgHandleValidateError,
  setOrgHandleValidateErrorMessage
) => {
  const orgHandleExists = await checkOrgHandleExists(orgHandle)(
    firebase,
    dispatch
  );
  if (validator.isEmpty(orgHandle)) {
    setOrgHandleValidateError(true);
    setOrgHandleValidateErrorMessage("Please enter a handle");
    return false;
  } else if (
    !validator.isAlphanumeric(orgHandle) ||
    !validator.isLowercase(orgHandle)
  ) {
    setOrgHandleValidateError(true);
    setOrgHandleValidateErrorMessage(
      "Organization handle can only contain lowercase alphanumeric characters"
    );
    return false;
  } else if (orgHandle.length < 6) {
    setOrgHandleValidateError(true);
    setOrgHandleValidateErrorMessage(
      "Organization handle cannot be less than 6 characters"
    );
    return false;
  } else if (orgHandleExists) {
    setOrgHandleValidateError(true);
    setOrgHandleValidateErrorMessage(
      `The handle ${orgHandle} is already taken`
    );
    return false;
  } else {
    setOrgHandleValidateError(false);
    setOrgHandleValidateErrorMessage("");
    return true;
  }
};

export const validateCountry = (country, setCountryValidateError) => {
  console.log(country);
  if (validator.isEmpty(country)) {
    setCountryValidateError(true);
    return false;
  } else {
    setCountryValidateError(false);
    return true;
  }
};

export const validateOrgCountry = (orgCountry, setOrgCountryValidateError) => {
  console.log(orgCountry);
  if (validator.isEmpty(orgCountry)) {
    setOrgCountryValidateError(true);
    return false;
  } else {
    setOrgCountryValidateError(false);
    return true;
  }
};

export const validateOrgWebsite = (
  orgWebsite,
  setOrgWebsiteValidateError,
  setOrgWebsiteValidateErrorMessage
) => {
  if (validator.isEmpty(orgWebsite)) {
    setOrgWebsiteValidateError(true);
    setOrgWebsiteValidateErrorMessage("Please enter organization website");
    return false;
  } else if (!validator.isURL(orgWebsite)) {
    setOrgWebsiteValidateError(true);
    setOrgWebsiteValidateErrorMessage("Please provide a valid URL");
    return false;
  } else if (
    !(orgWebsite.includes("https://") || orgWebsite.includes("http://"))
  ) {
    setOrgWebsiteValidateError(true);
    setOrgWebsiteValidateErrorMessage(
      "URL must contain the protocol (https:// or http://)"
    );
    return false;
  } else {
    setOrgWebsiteValidateError(false);
    setOrgWebsiteValidateErrorMessage("");
    return true;
  }
};
