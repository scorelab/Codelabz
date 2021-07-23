import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  slides: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: "2",
    boxSizing: "border-box",
  },
  image: {
    height: "20rem",
    width: "20rem",
  },
  slide: {},
  root: {
    maxWidth: 300,
    boxShadow: "0rem 2rem 2rem gray",
    animation: "$myEffectRoot 1000ms",
    minHeight: 445,
    zIndex: "2",
    minWidth: 280,
    margin: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  rootLeft: {
    maxWidth: 300,
    animation: "$myEffect 1200ms",
    height: 345,
    minWidth: 280,
    zIndex: "-1",
    position: "relative",
    left: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    filter: "brightness(0.74) blur(2px)",
  },
  rootRight: {
    maxWidth: 300,
    animation: "$myEffect 1200ms",
    height: 345,
    minWidth: 280,
    zIndex: "-1",
    position: "relative",
    right: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    filter: "brightness(0.74) blur(2px)",
  },
  media: {
    height: 140,
  },
  arrow: {
    "&:hover": {
      transform: "scale(1.2,1.2)",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 1,

      transform: "scale(.6,.6) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0)",
    },
  },
  "@keyframes myEffectRoot": {
    "0%": {
      opacity: 1,

      transform: "scale(.6,.6) rotateY(-100deg)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0)",
    },
  },
}));

export default useStyles;
