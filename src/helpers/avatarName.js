export const avatarName = (fullname) => {
  if (fullname) {
    return fullname
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");
  } else {
    return null;
  }
};
