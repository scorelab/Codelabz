// org validation

export const orgWebsiteValidation = [
  {
    required: true,
    message: "Please enter the website of the organization",
  },
  {
    pattern: new RegExp(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ),
    message: "Please provide a valid URL",
  },
  {
    pattern: new RegExp(/^(http:\/\/|https:\/\/)/),
    message: "URL must contain the protocol (https:// or http://)",
  },
];

export const orgSMValidation = [
  {
    required: false,
    message: "Please enter the website of the organization",
  },
];

export const orgHandleValidation = [
  {
    required: true,
    message: "Please enter your organization handle",
  },
  {
    pattern: new RegExp(/^[a-z0-9]{1,}$/),
    message:
      "Organization handle can only contain lowercase alphanumeric characters",
  },
  {
    pattern: new RegExp(/^[a-z0-9]{6,}$/),
    message: "Organization handle cannot be less than 6 characters",
  },
];

export const orgNameValidation = [
  {
    required: true,
    message: "Please enter the organization name",
  },
  {
    type: "string",
    message: "Please provide a valid organization name",
  },
];

// user validation

export const userHandleValidation = [
  {
    required: true,
    message: "Please enter your user handle",
  },
  {
    pattern: new RegExp(/^[a-z0-9]{1,}$/),
    message: "User handle can only contain lowercase alphanumeric characters",
  },
  {
    min: 6,
    message: "User handle cannot be less than 6 characters",
  },
];

export const userWebsiteValidation = [
  {
    pattern: new RegExp(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ),
    message: "Please provide a valid URL",
  },
  {
    pattern: new RegExp(/^(http:\/\/|https:\/\/)/),
    message: "URL must contain the protocol (https:// or http://)",
  },
];
