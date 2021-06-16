import React from "react";
import { Link } from "react-router-dom";
import BrandName from "../../../helpers/brandName";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../../store/actions";
import { useAuthStatus } from "../../../helpers/customHooks";
import Headroom from "react-headroom";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const MiniNavbar = ({ type }) => {
  const firebase = useFirebase();
  const authed = useAuthStatus();
  const dispatch = useDispatch();

  return (
    <Headroom>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <h3
            style={{
              color: "#3AAFA9",
              fontSize: "1.5rem",
              marginTop: "1.2rem",
              marginLeft: "1rem",
            }}
            className="brand-font mb-0"
          >
            <Link to={"/"}>
              <BrandName />
            </Link>
          </h3>
        </Grid>
        <Grid item>
          {authed
            ? [
                <Button key="2" type="link">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </Button>,
                <Button
                  onClick={() => signOut()(firebase, dispatch)}
                  key="1"
                  type="dashed"
                >
                  Log out
                </Button>,
              ]
            : [
                <Grid item style={{ position: "absolute", right: "2rem" }}>
                  <Button
                    key="2"
                    type={type && type === "/login" ? "primary" : "link"}
                    variant="outlined"
                  >
                    <Link to={"/login"}>Log In</Link>
                  </Button>

                  <Button
                    key="1"
                    type={
                      type && type === "/signup"
                        ? "primary"
                        : type && type === "/login"
                        ? "link"
                        : "dashed"
                    }
                  >
                    <Link to={"/signup"}>Sign Up</Link>
                  </Button>
                </Grid>,
              ]}
        </Grid>
      </Grid>
    </Headroom>
  );
};

export default MiniNavbar;
