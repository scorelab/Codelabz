export const signIn = credentials => async (firebase, history) => {
  try {
    await firebase.login(credentials);
    history.push("/dashboard");
  } catch (e) {
    console.log(e.message);
  }
};

export const signOut = () => async (firebase, history) => {
  try {
    await firebase.logout();
    history.push("/login");
  } catch (e) {
    console.log(e.message);
  }
};
