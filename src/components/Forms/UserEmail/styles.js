import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    padding: "10px 20px",
    border: "1px solid #cccccc",
    borderRadius: 15,
    width: "40%",
    "@media (max-width: 1200px)": {
      width: "60%",
    },
    "@media (max-width: 700px)": {
      width: "90%",
    },
  },
  input: {
    marginRight: 10,
    width: 250,
    backgroundColor: "#F9F9F9",
    borderRadius: 6,
  },
  text: {
    "@media (max-width: 490px)": {
      marginBottom: 10,
    },
  },
  email: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    "@media (max-width: 490px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

export default useStyles;
