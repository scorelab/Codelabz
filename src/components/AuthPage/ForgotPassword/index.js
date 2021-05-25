import React, { useEffect, useState } from "react";
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
import { Typography,Collapse,Button,Card,Grid,OutlinedInput,InputAdornment} from '@material-ui/core';
import { createMuiTheme,makeStyles,ThemeProvider } from '@material-ui/core/styles';
import {Alert} from '@material-ui/lab';

const ForgotPassword = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email,setEmail]=useState("");
  const [open, setOpen] = React.useState(true);
  const errorProps = useSelector(({ auth }) => auth.profile.error);
  const loadingProps = useSelector(({ auth }) => auth.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => setError(errorProps), [errorProps]);
  useEffect(() => setLoading(loadingProps), [loadingProps]);
  useEffect(() => setOpen(true), [loadingProps]);

  useEffect(() => {
    if (errorProps === false && loadingProps === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProps, loadingProps]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async (values) => {
    values.preventDefault();
    setError("");
    await sendPasswordResetEmail(email)(firebase, dispatch);
  };

  const theme = createMuiTheme({
    typography: {
        h4:{
          fontWeight: 600,
        }
      },
    palette: {
      primary: {
        main:"#455a64",
      }
    },
  });

  const useStyles = makeStyles({
    root: {
      padding: "2rem",
      background: "rgba(0,0,0,.01)",
      border: "none",
      boxShadow: "none",
    }
  })
  const classes = useStyles();
 
  return (
    <ThemeProvider theme={theme}>
    <Card className={classes.root}>
    <Typography variant="h4" className="mb-24 text-center">Trouble logging in?</Typography>
      <p className="mb-24 text-center">
        Don't worry, we got it covered. <br />
        Enter the email address registered with us and
        <br /> we will send you a link to reset your password.
      </p>

      {error && (
        <Collapse in={open}>
        <Alert 
        severity="error"
        className="mb-16"
        onClose={() => {setOpen(false);}}
        message={""}>{error}
        </Alert>
        </Collapse>
      )}

      {success && (
        <Collapse in={open}>
        <Alert 
        severity="success"
        className="mb-16"
        onClose={() => {setOpen(false);}}
        message={""}>We have sent you an email containing the link to reset your password. Please check your inbox including spams.
        </Alert>
        </Collapse>
      )}

      <form onSubmit={onSubmit}>
            <OutlinedInput
              placeholder="Email"
              autoComplete="email"
              onChange={e=>setEmail(e.target.value)}
              className="mb-32"
              fullWidth
              height="10rem"
              startAdornment={<InputAdornment sposition="start"><MailOutlineOutlinedIcon style={{ color: "rgba(0,0,0,.25)" }} />&nbsp;</InputAdornment>}
            />
          <Button variant="contained" color="primary" loading={loading} className="mt-10" type="submit" fullWidth >
          {loading ? "Sending..." : "Send me the link"}
          </Button>
          </form>
          <Grid justify="center" align="center" className="mt-16">or</Grid>
      <Grid justify="center" align="center" className="mt-24">
        <Grid sm={24} className="center">
          <Link to={"/login"}>Back to Sign in</Link>
        </Grid>
      </Grid>
      <Grid justify="center" align="center" className="mt-24">
        <Grid sm={24} className="center">
          New to <span className="brand-font text-bold">CodeLabz</span>?{" "}
          <Link to={"/signup"}>Create an account</Link>
        </Grid>
      </Grid>
    </Card>
    </ThemeProvider>
  );
};

export default ForgotPassword;
