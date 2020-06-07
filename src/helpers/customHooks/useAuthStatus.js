import { useState, useEffect } from "react";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const auth = useSelector(({ firebase }) => firebase.auth);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isLoaded(auth) && !isEmpty(auth));
  }, [auth]);

  return authed;
};

export default useAuthStatus;
