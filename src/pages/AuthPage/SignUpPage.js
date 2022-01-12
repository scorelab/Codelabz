import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../globalComponents/Divider";
import SmButtons from "./smButton/smButtons";
import SignupForm from "../../components/AuthPage/SignUp/signupForm";

const SignUpPage = (props) => {
 return (
    <Card raised className={`${props.classes.card}   `} data-testId="signUp" style={{ background: props.background }}>
    
      <CardContent>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          Create an account
        </Typography>
        <SignupForm />
        <Divider>or</Divider>
        <SmButtons />
        <Grid
          container
          justify="center"
          alignItems="center"
          className="mt-24"
          data-testId="signUpHaveAccount"
        >
          <Grid item={true} sm={12} className="center">
            Already have a{" "}
            <span className="brand-font text-bold">CodeLabz</span> account?{" "}
            <Link to="/login">Log In</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
