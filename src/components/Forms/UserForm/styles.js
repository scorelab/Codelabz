import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20,
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
  input: {
    "& input": {
      padding: "18px !important",
      width: "250px !important"
    },
  },
  errorMessage: {
    fontSize: 12,
    color: "#f44336",
    marginTop: 4
  },
  fb: {
    fontSize: 31,
    color: "#1877F2",
    marginRight: 4,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 24,
    },
  },
  tw: {
    color: "#03A9F4",
    fontSize: 30,
    marginRight: 5,
    "@media (max-width: 500px)": {
      marginRight: 6,
      fontSize: 23,
    },
  },
  li: {
    color: "#0077b5",
    fontSize: 31,
    marginRight: 5,
    "@media (max-width: 500px)": {
      marginRight: 6,
      fontSize: 23,
    },
  },
  git: {
    fontSize: 26,
    marginRight: 7,
    marginLeft: 3,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 19,
    },
  },
}));

export default useStyles;
