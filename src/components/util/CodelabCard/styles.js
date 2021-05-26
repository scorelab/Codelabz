import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem",
    minWidth: "50vw",
  },
  heading: {
    fontWeight: "600",
  },
  tags: {
    fontWeight: "500",
    color: "#455A64",
  },
}));

export default useStyles;
