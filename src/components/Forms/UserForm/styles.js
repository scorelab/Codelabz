import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none",
    padding: "20px 30px",
    border: "1px solid #e8e8e8",
    borderRadius: 15,
    width: "95%",
    "@media (max-width: 960px)": {
      width: "100%",
      padding: "15px 20px"
    }
  },
  usernameField: {
    "@media (max-width: 520px)": {
      margin: "10px 0"
    }
  },
  input: {
    "& input": {
      padding: "18px !important"
    }
  }
}));

export default useStyles;
