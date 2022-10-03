import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  profileRightTop: {
    backgroundColor: "transparent"
  },
  profileCover: {
    height: "100%"
  },

  profileCoverImg: {
    zIndex: "-1000",
    width: "100%",
    height: "280px",
    objectFit: "cover"
  },

  profileUserImg: {
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white"
  },

  profileInfo: {
    position: "relative",
    marginLeft: "3%",
    marginTop: "-10%",
    width: "95%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      alignItems: "center"
    }
  },

  profileInfoName: {
    fontStyle: "normal",
    lineHeight: "59px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "50px",
    marginTop: "0",
    paddingTop: "0"
  },

  profileInfoStory: {
    fontStyle: "normal",
    lineHeight: "35px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "30px",
    marginTop: "0",
    paddingTop: "0"
  },

  profileInfoDesc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    width: "95%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  profileInfoData: {
    lineHeight: "23px",
    color: "#000000"
  },
  profileSubscribeButton: {
    width: "167px",
    height: "48px",
    minHeight: "2rem",
    background: red[600],
    borderRadius: "10px",
    fontWeight: "500",
    fontSize: "22px",
    color: "#FFFFFF",
    "&:hover": {
      background: red[800]
    },
    border: "none"
  },
  moreDiv: {
    minHeight: "2rem",
    background: "none",
    borderRadius: "10px",
    border: "none",
    marginRight: theme.spacing(2)
  },
  moreButton: {
    width: "50px",
    height: "30px"
  },
  profileInfoContainer: {
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      textAlign: "center"
    }
  },
  buttonContainer: {
    [theme.breakpoints.down("md")]: {
      marginTop: "2rem"
    },
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default useStyles;
