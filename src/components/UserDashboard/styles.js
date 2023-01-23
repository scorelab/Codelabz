import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 75,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0 100px",
    "@media (max-width: 960px)": {
      padding: "0 0",
      top: 110
    },
    "@media (max-width: 400px)": {
      padding: "0 0",
    },
  },
  avatar: {
    "@media (max-width: 960px)": {
      height: 30,
      width: 30,
      fontSize: 14
    }
  },
  name: {
    fontSize: 18,
    "@media (max-width: 960px)": {
      fontSize: 16
    }
  },
  account: {
    fontSize: 16,
    "@media (max-width: 960px)": {
      fontSize: 12
    }
  },
  image: {
    height: 15,
    width: 15,
    margin: "0 10px",
    "@media (max-width: 960px)": {
      margin: "0 5px"
    }
  },
  button: {
    border: "1px solid #e8e8e8",
    padding: 4,
    fontSize: 14,
    "@media (max-width: 960px)": {
      fontSize: 11,
      marginRight:"10px"
    }
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
    gap: "1rem",
    "@media (max-width: 960px)": {
      gap: 0
    }
  },
  sidebar: {
    "@media (max-width: 960px)": {
      display: "none"
    }
  },
  heading: {
    fontSize: 24,
    paddingBottom: 15,
    "@media (max-width: 960px)": {
      textAlign: "center",
      fontSize: 20
    }
  }
}));

export default useStyles;
