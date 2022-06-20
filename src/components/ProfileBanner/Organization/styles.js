import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    profileCover: {
        width: '100vw',
    height: "580px",
    position: "relative",
    background: "url(`../../../assets/images/demoperson1.jpeg`)",
  },

  profileCoverImg: {
    width: "100%",
    height: "520px",
    objectFit: "cover",
  },

  profileUserImg: {
    width: "214px",
    height: "214px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
  },

  profileInfo: {
    position: "relative",
    // left: "35px",
    top: "150px",
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
    width:'100%'
  },
  profileInfoData: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "23px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "20px",
    marginTop: "0",
    paddingTop: "0",
  },
  profileSubscribeButton: {
    width: "217px",
    height: "63px",
    background: "#FF0000",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "28px",
    lineHeight: "33px",
    color: "#FFFFFF",
  },

  profileRightBottom: {
    display: "flex",
  },
}));

export default useStyles;
