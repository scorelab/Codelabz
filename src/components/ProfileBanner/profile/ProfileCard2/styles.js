import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileCover: {
    width: "fit-content",
    height: "fit-content",
    minHeight: "20rem",
    position: "relative",
  },

  profileInfo: {
    background: "#F5F5F5",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
    position: "relative",
    padding: "5%",
    justifyContent: "center",
  },

  profileUserImg: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
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
    fontStyle: "normal",
    lineHeight: "25px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "21px",
  },

  profileInfoData: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "22px",
    fontSize: "19px",
    color: "#878787",
    fontWeight: "400",
  },

}));

export default useStyles;
