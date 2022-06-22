import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    borderRadius: 15,
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    '@media (max-width: 1150px)' : {
      width: "80%",
    },
    '@media (max-width: 750px)' : {
      width: "100%",
    }
  },
  content: {
    padding: "15px 10px",
    paddingBottom: "15px !important",
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
    backgroundColor: "#E8E8E8",
    width: 265,
    borderRadius: 7,
    boxShadow: "none",
    '@media (max-width: 540px)' : {
      width: 175
    }
  },
  button: {
    height: 26,
    "&:hover": {
      transform: "scale(1.2)",
    },
    marginLeft: -7,
    marginRight: 8,
    '@media (max-width: 540px)' : {
      marginLeft: -7,
      marginRight: 2,
      height: 20
    }
  },
  fb: {
    fontSize: 31,
    color: "#1877F2",
    marginRight: 5,
    '@media (max-width: 540px)' : {
      marginRight: 2,
      fontSize: 24
    }
  },
  tw: {
    color: "#03A9F4",
    fontSize: 30,
    marginLeft: 9,
    marginRight: 8,
    '@media (max-width: 540px)' : {
      marginLeft: 0,
      marginRight: 4,
      fontSize: 23
    }
  },
  git: {
    fontSize: 26,
    marginLeft: 0,
    marginRight: 8,
    '@media (max-width: 540px)' : {
      marginRight: 3,
      fontSize: 19
    }
  },
  text: {
    color: "#000000A6",
    '@media (max-width: 540px)' : {
      fontSize: 11
    }
  }
}));

export default useStyles;
