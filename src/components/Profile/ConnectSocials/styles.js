import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    borderRadius: 15,
    boxShadow: "none",
    border: "1px solid #e8e8e8",
    padding: "10px 20px",
    "@media (max-width: 960px)": {
      width: "100%",
      padding: 0
    }
  },
  content: {
    paddingBottom: "15px !important",
    paddingTop: 15,
    "@media (max-width: 600px)": {
      padding: "15px 5px"
    }
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: "3px 0",
    width: 245,
    "&:hover": {
      cursor: "pointer"
    }
  },
  linkDisabled: {
    backgroundColor: "lightgray",
    cursor: "not-allowed"
  },
  button: {
    height: 26,
    "&:hover": {
      transform: "scale(1.2)"
    },
    marginLeft: 2,
    marginRight: 23,
    "@media (max-width: 500px)": {
      marginLeft: 2,
      marginRight: 10,
      height: 20
    }
  },
  fb: {
    fontSize: 31,
    color: "#1877F2",
    marginRight: 19,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 24
    }
  },
  tw: {
    color: "#03A9F4",
    fontSize: 30,
    marginLeft: -3,
    marginRight: 18,
    "@media (max-width: 500px)": {
      marginRight: 6,
      fontSize: 23
    }
  },
  git: {
    fontSize: 26,
    marginRight: 19,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 19
    }
  },
  text: {
    fontFamily: "Poppins",
    color: "#000",
    "@media (max-width: 500px)": {
      fontSize: 12
    }
  }
}));

export default useStyles;
