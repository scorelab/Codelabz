import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: ".5rem",
    width: "50vw",
    position: "relative",
    maxWidth: "80vw",
    textAlign: "left",
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down(750)]: {
      width: "90vw",
    },
  },
  heading: {
    fontWeight: 900,
    marginTop: "-.5rem",
    [theme.breakpoints.down(750)]: {
      fontSize: "1rem",
    },
  },
  body: {
    padding: "0rem 2rem 0rem 3.5rem",
    paddingBottom: "0rem",
    [theme.breakpoints.down(750)]: {
      padding: "0rem 1rem 0rem 1rem",
      justify: "center",
      textAlign: "left",
    },
  },
  tags: {
    fontWeight: "500",
    color: "#455A64",
  },
  avatar: {
    height: "2rem",
    width: "2rem",
    position: "relative",
    left: "1rem",
    border: "1.5px solid black",
    borderRadius: "500px",
  },
  cardContent: {
    paddingTop: "1rem",
  },
  cardAction: {
    padding: "0rem 0rem 0rem 3.8rem",
    [theme.breakpoints.down(750)]: {
      padding: "0",
    },
  },
  button: {
    background: "#BCBCBC",
    width: "1rem",
    height: "2rem",
    marginBottom: ".5rem",
    [theme.breakpoints.down(750)]: {
      height: "1.4rem",
    },
  },
  logo: {
    width: "2.5rem",
    height: "2rem",
    marginTop: "0rem",
    zIndex: "1",
  },
  organizationLogo: {
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    flexDirecton: "column",
    paddingRight: "10px",
    width: "auto",
  },
  cardHeader: {
    padding: "1rem 1rem 0rem 1rem",
  },
  readTime: {
    [theme.breakpoints.down(750)]: {
      fontSize: ".5rem",
      background: "red",
      display: "none",
    },
  },
  headerGrid: {
    width: "2rem",
    height: ".5rem",
    marginTop: "-1.5rem",
    border: "0.1px solid #f4f4f4",
  },
  personImg: {
    zIndex: 2,
    position: "relative",
    left: "1.5rem",
    top: "-.6rem",
    border: "1px solid black",
    borderRadius: "500px",
  },
}));

export default useStyles;
