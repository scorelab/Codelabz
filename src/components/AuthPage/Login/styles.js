import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECEAEB",
    height: "95vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "row",
  },
  card: {
    boxShadow: "none",
  },
  loginLeft: {
    flex: "2.2",
    [theme.breakpoints.down(750)]: {
      flex: "0",
    },
  },
  loginRight: {
    flex: "1.8",
    boxShadow: "none",
    [theme.breakpoints.down(750)]: {
      flex: "1",
    },
  },
  rootChildrenLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "left",
    flex: "1.8",
    border: "2px solid black",
    boxShadow: "5px 5px 10px gray",
    background: "#759F9E",
    animation: "$myEffectFromRight 1900ms",
    zIndex: "2",
    [theme.breakpoints.down(750)]: {
      boxShadow: "none",
      border: "none",
    },
  },
  rootChildrenRight: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    padding: "1rem",
    animation: "$myEffectFromLeft 1500ms",
    [theme.breakpoints.down(750)]: {
      flex: "0",
      display: "none",
    },
  },
  "@keyframes myEffectFromRight": {
    "0%": {
      opacity: 1,
      transform: "scale(.7,.7) translate(200vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
  "@keyframes myEffectFromLeft": {
    "0%": {
      opacity: 1,
      transform: "scale(.7,.7) translate(-100vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
}));

export default useStyles;
