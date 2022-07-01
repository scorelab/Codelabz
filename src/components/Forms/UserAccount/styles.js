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
      width: "90%",
    },
    "@media (max-width: 350px)": {
      padding: "10px 15px",
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    "@media (max-width: 400px)": {
      fontSize: 13,
    },
  },
}));

export default useStyles;
