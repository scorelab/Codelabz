import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    borderRadius: 15,
    boxShadow: "none",
    border: "1px solid #e8e8e8",
    padding: "10px 20px",
    "@media (max-width: 960px)": {
      width: "100%",
      padding: 0
    }
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "50%"
  },
  content: {
    paddingBottom: "15px !important",
    paddingTop: 15,
    "@media (max-width: 100px)": {
      padding: "15px 5px"
    }
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    "@media (max-width: 500px)": {
      flexDirection: "column",
      justifyContent: "center",
      margin: 0
    }
  },
  link: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    "&:hover": {
      cursor: "pointer"
    },
    marginRight: 19,
    backgroundColor: "#D3D3D3",
    "@media (max-width: 500px)": {
      margin: "none",
      marginBottom: 15
    }
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
    fontSize: 30,
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
    fontSize: 30,
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
      fontSize: "4vmin",
      marginRight: 19
    }
  }
}));

export default useStyles;
