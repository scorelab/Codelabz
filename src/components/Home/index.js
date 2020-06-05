import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";

const Home = () => {
  const firebase = useFirebase();

  return (
    <div>
      <p>This is home</p>
      <br />
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/signup"}>Sign Up</Link>
      <br />
      <button onClick={() => signOut()(firebase)}>Log out</button>
    </div>
  );
};

export default Home;
