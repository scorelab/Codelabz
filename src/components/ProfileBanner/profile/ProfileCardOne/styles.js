import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileCover: {
    width: "fit-content",
    height: "fit-content",
    // minHeight: "20rem",
    position: "relative",
  },

  profileUserImg: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
    maxWidth: "fit-content"
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
    position: "relative",
    padding: "5%",
    justifyContent: "center",
    [theme.breakpoints.down(850)]: {
      flexWrap: "wrap",
    },
    [theme.breakpoints.down(550)]: {
      padding: "1%",
      justifyContent: "flex-start",
    }
  },

  profileInfoName: {
    width: "25rem",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "35px",
    color: "#000000",
    fontWeight: "500",
    fontSize: "30px",
  },

  profileInfoStory: {
    fontFamily: "Roboto",
    width:"97%",
    fontStyle: "normal",
    lineHeight: "1.2",
    color: "#000000",
    fontWeight: "400",
    opacity:"0.9",
    fontSize: "4vmin",
  },

  profileInfoDesc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
  },
  profileInfoData: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "22px",
    fontSize: "19px",
    color: "#878787",
    fontWeight: "400",
  },
  profileUserConnect: {
    // width: "fit-content", 
    marginLeft: "2.5rem",
    [theme.breakpoints.down(550)]: {
      marginLeft: "0.5rem",
    }
  },
  profileSubscribeButton: {
    width: "127px",
    height: "38px",
    minHeight: "2rem",
    background: "#03AAFA",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#FFFFFF",
    border: "none",
    [theme.breakpoints.down(400)]: {
      width: "80px",
      fontSize:"18px",
    }
  },

  profileShareButton: {
    width: "fit-content",
    marginLeft: "10px",
    height: "38px",
    minHeight: "2rem",
    background: "#FFFFFF",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#000",
    border: "none",
    [theme.breakpoints.down(400)]: {
      width: "80px",
      fontSize:"18px"
    }
  },

  profileReportButton: {
    width: "fit-content",
    marginLeft: "10px",
    height: "38px",
    minHeight: "2rem",
    background: "#FFFFFF",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#000",
    border: "none",
    [theme.breakpoints.down(400)]: {
      width: "90px",
      fontSize:"18px",
      width:"",
    }
  },

  profileIconButton: {
    width: "fit-content",
    marginLeft: "10px",
    height: "38px",
    minHeight: "2rem",
    background: "#FFFFFF",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#000",
    border: "none",
  },
}));

export default useStyles;
