import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../../globalComponents/Divider";
import SmButtons from "../smButton/smButtons";
import SignupForm from "./signupForm";
import useStyles from "./styles";
import PropTypes from "prop-types";

const SignUp = ({ background = "white" }) => {
  const classes = useStyles();
  const handleMouseEnter = (e) =>{
    e.target.style.color='royalblue'
  }
  const handleMouseLeave = (e)=>{
    e.target.style.color='#03AAFA'
  }
  return (
    <Card raised className={`${classes.card}   `} data-testId="signUp" style={{ background: background }}>
    
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
            <Link to="/login"><span style={{color:'#03AAFA'}} onMouseEnter={(e)=>{handleMouseEnter(e)}} onMouseLeave={(e)=>{handleMouseLeave(e)}}>Log In</span></Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
SignUp.prototype = {
  background: PropTypes.string,
};

export default SignUp;
