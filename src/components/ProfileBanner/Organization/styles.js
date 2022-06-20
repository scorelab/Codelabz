import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileCover: {
    width: "100vw",
    height: "fit-content",
    minHeight: "10rem",
    position: "relative",
  },

  profileCoverImg: {
    position: "absolute",
    zIndex: "-1000",
    width: "100%",
    height: "380px",
    objectFit: "cover",
  },

  profileUserImg: {
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
  },

  profileInfo: {
    position: "relative",
    left: "2rem",
    top: "4rem",
    width: "calc(100% -35px)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
  },

  profileInfoName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "59px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "50px",
    marginTop: "0",
    paddingTop: "0",
  },

  profileInfoStory: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "35px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "30px",
    marginTop: "0",
    paddingTop: "0",
  },

  profileInfoDesc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent:'space-between',
    width: "95%",
  },
  profileInfoData: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "23px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "20px",
  },
  profileSubscribeButton: {
    width: "167px",
    height: "48px",
    minHeight: "2rem",
    background: "#FF0000",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#FFFFFF",
    border: "none",
  },
  profileIconButton: {
    width: "100px",
    height: "48px",
    minHeight: "2rem",
    background: "none",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#FFFFFF",
    border: "none",
  },
}));

export default useStyles;
