import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "35px",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  root: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    flexFlow: "row",
  },
  fb: {
    fontSize: "42px",
    color: "#5269a4",
  },
  tw: {
    color: "#7194ef",
    fontSize: "40px",
  },
  git: {
    fontSize: "35px",
  },
  go: {},
  imageIcon: {
    display: "flex",
    height: "inherit",
    width: "inherit",
    margin: "auto",
  },
  google: {
    textAlign: "center",
    fontSize: "35px",
  },
}));

export default useStyles;
