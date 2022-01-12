import React from "react";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";

const ForgotPassPage = (props) => {
  return (
    <Card className={props.classes.root} data-testId="forgotPassword">
      <Typography
        variant="h4"
        className={"mb-24 text-center " + props.classes.heading}
      >
        Trouble logging in?
      </Typography>
      <p className="mb-24 text-center">
        Don't worry, we got it covered. <br />
        Enter the email address registered with us and
        <br /> we will send you a link to reset your password.
      </p>

      {props.error && (
        <Collapse in={props.open}>
          <Alert
            severity="error"
            className="mb-16"
            onClose={() => {
              props.setOpen(false);
            }}
            message={""}
          >
            {props.error}
          </Alert>
        </Collapse>
      )}

      {props.success && (
        <Collapse in={props.open}>
          <Alert
            severity="success"
            className="mb-16"
            onClose={() => {
              props.setOpen(false);
            }}
            message={""}
          >
            {props.confirmationText}
          </Alert>
        </Collapse>
      )}

      <form onSubmit={props.onSubmit}>
        <OutlinedInput
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => props.setEmail(e.target.value)}
          className="mb-32"
          fullWidth
          height="10rem"
          data-testId="forgotPasswordEmail"
          startAdornment={
            <InputAdornment sposition="start">
              <MailOutlineOutlinedIcon style={{ color: "rgba(0,0,0,.25)" }} />
              &nbsp;
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          style={{ background: props.buttonColor }}
          loading={props.loading}
          className="mt-10"
          type="submit"
          fullWidth
          data-testId="forgotPasswordButton"
        >
          {props.loading ? "Sending..." : "Send me the link"}
        </Button>
      </form>
      <Grid justify="center" align="center" className="mt-16">
        or
      </Grid>
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
  );
};


export default ForgotPassPage;
