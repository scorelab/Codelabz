import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  profileCover: {
    width: "30vw",
    height: "14px",
    minHeight: "20px",
    position: "relative",
    background: "#000"
  },
  profileInfo: {
    position: "absolute",
    left: "15px",
    top: "10px",
    width: "calc(100% -35px)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center"
  },
  profileUserImg: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white"
  },

  profileInfoName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "28px",
    color: "#454545",
    fontWeight: "700",
    fontSize: "24px",
    marginTop: "25px",
    paddingTop: "0"
  },

  profileSubscribeButton: {
    width: "90%",
    height: "3rem",
    minHeight: "2rem",
    background: "#03AAFA",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#FFFFFF"
  },
  profileInfoText: {
    width: "95%",
    marginTop: "1rem"
  },
  profileInfoStory: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "23px",
    color: "#292929",
    fontWeight: "400",
    fontSize: "19px",
    marginTop: "0.5rem"
  },
  profileInfoAboutTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "#454545",
    fontWeight: "700",
    fontSize: "16px"
  },
  profileInfoAboutInfo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "19px",
    color: "#444444",
    fontWeight: "400",
    fontSize: "16px",
    marginTop: "0.5rem",
    paddingTop: "0"
  }
}));

export default useStyles;
