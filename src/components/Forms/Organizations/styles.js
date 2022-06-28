import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "35px",
    "&:hover": {
      transform: "scale(1.2)",
    },
    '@media (max-width: 780px)' : {
      height: "27px"
    }
  },
  root: {
    width: "70%",
    '@media (max-width: 780px)' : {
      width: '100%'
    }
  },
  fb: {
    fontSize: "42px",
    color: "#5269a4",
    '@media (max-width: 780px)' : {
      width: '100%'
    }
  },
  tw: {
    color: "#7194ef",
    fontSize: "30px",
  },
  git: {
    fontSize: "35px",
    '@media (max-width: 780px)' : {
      fontSize: "28px"
    }
  },
  go: {},
}));

export default useStyles;
