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
      padding: "0 10px",
      top: 110
    },
    "@media (max-width: 400px)": {
      padding: "0 5px",
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
      fontSize: 11
    }
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30
  },
  sidebar: {
    "@media (max-width: 960px)": {
      display: "none"
    }
  },
  formWrapper:{
    marginLeft:'25px',
    xs:{
      padding: 0
    },
    md: { padding: "0 10px" },
    "@media (min-width: 961px)": {
      marginLeft:60,
      marginRight:"-40px"
    },
    "@media (min-width: 1000px)": {
      marginLeft: '10px',
      marginRight: '-40px'
    },
    "@media (max-width: 987px)": {
      marginLeft: '30px',
      marginRight: '-40px'
    },
    "@media (max-width: 960px)": {
      marginLeft:60,
      marginRight:60
    },
    "@media (max-width: 690px)": {
      marginLeft:40,
      marginRight:40
    },
    "@media (max-width: 500px)": {
      marginLeft:15,
      marginRight:15
    }, 
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
