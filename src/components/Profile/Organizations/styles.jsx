import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    width: "95%",
    padding: "10px 20px",
    boxShadow: "none",
    border: "1px solid #e8e8e8",
    borderRadius: 15,
    "@media (max-width: 960px)": {
      width: "100%",
      padding: "10px 0"
    }
  },
  content: {
    "@media (max-width: 380px)": {
      padding: 10
    }
  },
  left: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: 135,
    width: 210,
    "@media (max-width: 380px)": {
      width: 150
    }
  },
  googleIcon: {
    height: 30,
    width: 30,
    "&:hover": {
      transform: "scale(1.2)"
    },
    "@media (max-width: 780px)": {
      height: 27,
      width: 27
    }
  },
  fb: {
    fontSize: 42,
    color: "#5269a4",
    "@media (max-width: 780px)": {
      width: "100%"
    }
  },
  tw: {
    color: "#03A9F4",
    fontSize: 33,
    "&:hover": {
      transform: "scale(1.2)"
    },
    "@media (max-width: 780px)": {
      fontSize: 30
    }
  },
  git: {
    fontSize: 30,
    "&:hover": {
      transform: "scale(1.2)"
    },
    "@media (max-width: 780px)": {
      fontSize: 28
    }
  },
  organizations: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 380px)": {
      height: 130
    }
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  organization: {
    fontSize: 17,
    color: "#0969DA",
    "@media (max-width: 380px)": {
      fontSize: 13
    }
  },
  role: {
    fontSize: 13,
    color: "#767676",
    "@media (max-width: 380px)": {
      fontSize: 11
    }
  },
  right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: 135,
    width: 180,
    "@media (max-width: 380px)": {
      width: 140
    }
  },
  button: {
    fontSize: 14,
    flexBasis: 0,
    margin: "0 5px",
    padding: "3px 15px",
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    textTransform: "none",
    "@media (max-width: 380px)": {
      fontSize: 11,
      margin: "0 2px",
      padding: "3px 0"
    }
  }
}));

export default useStyles;
