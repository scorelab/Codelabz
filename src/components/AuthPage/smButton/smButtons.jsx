import React from "react";
import { Grid, IconButton, Icon } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import SvgIcon from "@mui/material/SvgIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import useStyles from "./styles";



const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      data-testId="smButtons"
      style={{
        backgroundColor: "#EFF5F5",
        borderRadius: "30px",
        padding: "14px",
        marginTop: "0.4rem"
      }}
    >
      <Grid item>
        <IconButton className={classes.button}>
          <Icon
            onClick={() => signInWithGoogle()(firebase, dispatch)}
            className={classes.google}
          >
            <img className={classes.imageIcon} src={GoogleImg} alt="google" />
          </Icon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
          className={classes.button}
        >
          <FacebookIcon className={classes.fb}>
            <span className="sm-text">Facebook</span>
          </FacebookIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          className={classes.button}
        >
          
          <SvgIcon fontSize="medium">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </SvgIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
          className={classes.button}
        >
          <GitHubIcon className={classes.git}>
            <span className="sm-text">Github</span>
          </GitHubIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
