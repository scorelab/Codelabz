import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardBody: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down(750)]: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
