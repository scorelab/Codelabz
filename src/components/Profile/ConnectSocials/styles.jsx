import { makeStyles } from "@mui/styles";

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
  column: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "stretch",
    flexDirection: "column",
    margin: "0 5em 0 5em"
  },

  link: {
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    padding: "3px 0",
    "&:hover": {
      cursor: "pointer"
    },
    borderBottom: "0.1px solid #dfdfdf"
  },
  isLinked: {
    opacity: 0.7,
    "&:hover": {
      cursor: "not-allowed"
    }
  },
  isLinkedImg: {
    height: 18,
    width: 18,
    margin: "9px 0 0 5px",
    marginLeft: "auto",
    color: "green"
  },
  button: {
    height: 40,
    "&:hover": {
      transform: "scale(1.2)"
    },
    transition: "200ms ease-in-out"
  },
  fb: {
    fontSize: 40,
    color: "#1877F2",
    "&:hover": {
      transform: "scale(1.2)"
    },
    transition: "200ms ease-in-out"
  },
  tw: {
    color: "#03A9F4",
    fontSize: 40,
    "&:hover": {
      transform: "scale(1.2)"
    },
    transition: "200ms ease-in-out"
  },
  git: {
    fontSize: 40,
    "&:hover": {
      transform: "scale(1.2)"
    },
    transition: "200ms ease-in-out"
  },
  text: {
    fontFamily: "sans-serif",
    fontSize: 15,
    color: "black",

    "@media (max-width: 500px)": {
      fontSize: 12
    },
    flexGrow: 1,
    marginLeft: 10
  }
}));

export default useStyles;
