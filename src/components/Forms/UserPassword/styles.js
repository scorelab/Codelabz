import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    padding: "10px 20px",
    border: "1px solid #cccccc",
    borderRadius: 15,
    width: "40%",
    "@media (max-width: 1000px)": {
      width: "60%",
    },
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  input: {
    marginRight: 10,
    width: 250,
    backgroundColor: "#F9F9F9",
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#F9F9F9",
    border: "1px solid #D2D2D2",
    textTransform: "none",
    height: 35,
    width: 175,
    margin: "15px 0",
  },
  text: {
    margin: "5px 0",
    "@media (max-width: 400px)": {
      fontSize: 13,
    },
  },
}));

export default useStyles;
