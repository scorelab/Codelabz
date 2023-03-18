import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  backtoTop: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 999,
    transition: "opacity 0.4s",
    "&:hover": {
      opacity: 0.8
    }
  },
}));

export default useStyles;
