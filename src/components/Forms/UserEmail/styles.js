import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    padding: "15px 30px",
    border: "1px solid #e8e8e8",
    borderRadius: 15,
    width: "95%",
    "@media (max-width: 960px)": {
      width: "100%",
      padding: "10px 15px"
    }
  },
  input: {
    marginRight: 10,
    width: 250,
    backgroundColor: "#F9F9F9",
    borderRadius: 6,
    "& input": {
      padding: "18px !important"
    }
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
