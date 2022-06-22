import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    height: "100%",

    background: "#f2f2f2",
  },
  mainBody: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    margin: "1rem 0 2rem 0",
    flexDirection: "column",
  },
  sideBody: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "5rem",
    margin: "0 1rem 2rem 1rem",
    height: "100%",
    flexDirection: "column",
    [theme.breakpoints.down(750)]: {
      display: "none",
    },
  },
  TagsListitem: {
    borderRadius: "20px",
    border: "2px solid #79747E",
    padding: "2px 10px",
    margin: "auto",
    width: "80%",
    marginBottom: "10px",
  },
  card: {
    margin: ".5rem",
    width: "50vw",
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
  cardBody: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    direction: "column",
  },
  sort: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: "0rem 0 0rem 0",
  },
  sortedList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "auto",
    [theme.breakpoints.down(750)]: {
      display: "none",
    },
  },
  navigation: {
    "&:selcted": {
      border: "2px solid black",
    },
  },
  sideCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxHeight: "35rem",
    margin: "0 0 2rem 0",
    background: "white",
    boxShadow: ".5px 2px 5px gray",
  },
}));

export default useStyles;
