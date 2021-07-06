import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    // boxShadow: "none",
    // border: "1px solid gray",
    [theme.breakpoints.down(750)]: {
      minWidth: "90vw",
      border: "none",
      boxShadow: "none",
    },
  },
}));

export default useStyles;
