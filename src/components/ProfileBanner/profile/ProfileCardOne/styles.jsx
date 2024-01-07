import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  profileCover: {
    width: "fit-content",
    height: "fit-content",
    // minHeight: "20rem",
    position: "relative"
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
    [theme.breakpoints.down(1000)]: {
      flexWrap: "wrap"
    },
    [theme.breakpoints.down(550)]: {
      padding: "1%",
      justifyContent: "flex-start"
    }
  },

  profileInfoName: {
    width: "25rem",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "35px",
    color: "#000000",
    fontWeight: "500",
    fontSize: "30px"
  },

  profileInfoStory: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "1.2",
    color: "#000000",
    fontWeight: "400",
    width: "24rem",
    opacity: "0.9",
    fontSize: "4vmin",
    whiteSpace: "normal"
  },

  profileInfoDesc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%"
  },
  profileInfoData: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "22px",
    fontSize: "19px",
    color: "#878787",
    fontWeight: "400"
  },
  profileUserConnect: {
    // width: "fit-content",
    marginLeft: "2.5rem",
    [theme.breakpoints.down(550)]: {
      marginLeft: "0.5rem"
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
      fontSize: "18px"
    }
  },

  profileShareButton: {
    width: "fit-content",
    // marginLeft: "10px",
    height: "38px",
    minHeight: "2rem",
    background: "#FFFFFF",
    borderRadius: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "120%",
    lineHeight: "28px",
    color: "#000",
    border: "none",
    display:"flex",
    // border:"1px solid black",
    [theme.breakpoints.down(400)]: {
      width: "80px",
      fontSize: "18px"
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
    fontSize: "120%",
    lineHeight: "28px",
    color: "#000",
    border: "none",
    display:"flex",
    // border:"1px solid black",
    [theme.breakpoints.down(400)]: {
      width: "90px",
      fontSize: "18px"
    }
  },

  profileIconButton: {
    width: "fit-content",
    marginLeft: "5%",
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
    border: "none"
  },
  shareContainer:{
    width:"40%",
    height:"50%",
    top:"40%",
    left:"30%",
    // zIndex:"5",
    background:"white",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    // box-shadow: ;
    borderRadius:"25px",
    position:"absolute",
    display:"flex",
    flexDirection:"column",
  },
  cancelButton:{
    position:"relative",
    width:"13%",
    height:"13%",
    marginLeft:"auto",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderTopRightRadius:"25px",
    // border:"1px solid black"
  },
  socialIconsDiv:{
    position:"relative",
    marginTop:"2%",
    width:"100%",
    height:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // border:"1px solid black",
  },
  socialIcon:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // border:"1px solid black",
    width:"40px",
    height:"40px",
    margin:"0 15px 0 15px",
    borderRadius:"50px",
    '&:hover': {
      width:"50px",
      height:"50px"
    }
  },
  shareLinkContainer:{
    width:"100%",
    display:"flex",
    height:"15%",
    // border:"1px solid black",
    position:"relative",
    justifyContent:"center",

    // padding:"0 2% 0 2%"
  },
  shareLinkContainerInput:{
    width:"60%",
    height:"80%",
    marginRight:"1%",
    textAlign:"center",
    // border:"none",
    position:"relative",
  },
  shareLinkContainerCopyButton:{
    width:"10%",
    height:"100%",
    position:"relative",
    fontSize:"70%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // color:"white"
  }

}));

export default useStyles;
