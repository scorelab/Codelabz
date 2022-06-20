import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    '@media (max-width: 600px)' : {
      width: "100%"
    }
  },
  usernameField: {
    '@media (max-width: 520px)' : {
      margin: "10px 0"
    }
  }
}));

export default useStyles;
