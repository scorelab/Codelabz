import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    
    width: "50%",
    borderRadius: 15,
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    '@media (max-width: 1200px)' : {
      width: "80%",
    },
    '@media (max-width: 800px)' : {
      width: "100%",
    }
  },
  content: {
    padding: "15px 10px",
    paddingBottom: "15px !important",
    '@media (max-width: 600px)' : {
      padding: "15px 5px",
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
    backgroundColor: "#E8E8E8",
    width: 285,
    borderRadius: 7,
    boxShadow: "none",
    '@media (max-width: 600px)' : {
      width: 180
    }
  },
  button: {
    height: 26,
    "&:hover": {
      transform: "scale(1.2)",
    },
    marginLeft: -7,
    marginRight: 8,
    '@media (max-width: 600px)' : {
      marginLeft: -3,
      marginRight: 5,
      height: 16
    }
  },
  fb: {
    fontSize: 31,
    color: "#1877F2",
    marginRight: 5,
    '@media (max-width: 600px)' : {
      marginRight: 2,
      fontSize: 22
    }
  },
  tw: {
    color: "#03A9F4",
    fontSize: 30,
    marginLeft: 14,
    marginRight: 5,
    '@media (max-width: 600px)' : {
      marginLeft: 5,
      marginRight: 3,
      fontSize: 21
    }
  },
  git: {
    fontSize: 26,
    marginLeft: 0,
    marginRight: 8,
    '@media (max-width: 600px)' : {
      marginRight: 3,
      fontSize: 18
    }
  },
  text: {
    fontFamily: "Poppins",
    color: "#000000B6",
    '@media (max-width: 600px)' : {
      fontSize: 10
    }
  }
}));

export default useStyles;
