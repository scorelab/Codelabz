import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #cccccc",
    boxShadow: "none",
    maxWidth: "40vw",
    [theme.breakpoints.down(750)]: {
      minWidth: "90vw",
      border: "none",
      boxShadow: "none",
    },
  }
}));

export default useStyles;
