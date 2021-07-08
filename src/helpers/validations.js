import validator from "validator";

export const validateName = (
  name,
  setNameValidateError,
  setNameValidateErrorMessage,
  emptyMsg,
  realNameMsg
) => {
  if (validator.isEmpty(name)) {
    setNameValidateError(true);
    setNameValidateErrorMessage(emptyMsg);
    return false;
  } else if (!name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
    setNameValidateError(true);
    setNameValidateErrorMessage(realNameMsg);
    return false;
  } else {
    setNameValidateError(false);
    setNameValidateErrorMessage("");
    return true;
  }
};

export const validateHandle = async (
  checkUserHandleExists,
  firebase,
  dispatch,
  handle,
  setHandleValidateError,
  setHandleValidateErrorMessage,
  emptyMsg,
  lowercaseMsg,
  lengthMsg,
  takenMsg
) => {
  const handleExists = await checkUserHandleExists(handle)(firebase, dispatch);
  if (validator.isEmpty(handle)) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(emptyMsg);
    return false;
  } else if (
    !validator.isAlphanumeric(handle) ||
    !validator.isLowercase(handle)
  ) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(lowercaseMsg);
    return false;
  } else if (handle.length < 6) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(lengthMsg);
    return false;
  } else if (handleExists) {
    setHandleValidateError(true);
    setHandleValidateErrorMessage(takenMsg);
    return false;
  } else {
    setHandleValidateError(false);
    setHandleValidateErrorMessage("");
    return true;
  }
};

export const validateCountry = (country, setCountryValidateError) => {
  if (validator.isEmpty(country)) {
    setCountryValidateError(true);
    return false;
  } else {
    setCountryValidateError(false);
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
