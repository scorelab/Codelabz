import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    height: "100%",
    background: "#f2f2f2"
  },
  mainBody: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    margin: "1rem 0 2rem 0",
    flexDirection: "column"
    // minWidth: "50%"
  },
  sideBody: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    width: "fit-content",
    margin: "1rem 1rem 2rem 1rem",
    height: "100%",
    flexDirection: "column",
    [theme.breakpoints.down(960)]: {
      display: "none"
    },
    maxWidth: "300px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  Notification: {
    position: "relative",
    boxSizing: "border-box",
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: "15px 20px",
    gap: "20px",
    fontSize: "1.2rem"
    // direction: "column"
  },
  unread: {
    position: "absolute",
    height: "10px",
    width: "10px",
    borderRadius: "50%",
    backgroundColor: "#5AB1E3",
    top: "50%",
    transform: "translateY(-50%)",
    left: "5px"
  },
  Avatar: {
    backgroundColor: red[500]
  },
  time: {
    fontWeight: "600",
    fontSize: "12px",
    color: "black",
    opacity: "0.4",
    marginTop: "-3px"
  },
  sort: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: "0rem 0 0rem 0"
  },
  sortedList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "auto",
    [theme.breakpoints.down(750)]: {
      display: "none"
    }
  },
  navigation: {
    "&:selcted": {
      border: "2px solid black"
    }
  },
  sideCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxHeight: "35rem",
    margin: "0 0 2rem 0",
    background: "white",
    boxShadow: ".5px 2px 5px gray"
  },

  leftSideCard: {
    display: "flex",
    alignItems: "left",
    justifyContent: "center",
    flexDirection: "column",
    maxHeight: "35rem",
    margin: "0 0 2rem 0",
    background: "white",
    boxShadow: ".5px 2px 5px gray"
  },

  outerSideBar: {
    minWidth: "100%"
  },
  contentPart: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: "1400px"
  },
  card: {
    padding: "6px",
    margin: "0 0.5rem 0 0.5rem"
  }
}));

export default useStyles;
