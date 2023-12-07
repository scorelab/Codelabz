import { Box, Grid, Typography, Button } from "@mui/material";
import Thumbnails from "./Thumbnails";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative"
  },
  load: {
    position: "absolute",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    left: "0",
    bottom: "-1px",
    width: "100%",
    height: "100px",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
  }
}));
const SideBar = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <div className={classes.load}>
          <Button sx={{ textTransform: "none" }}>Show More &darr;</Button>
        </div>
        <Grid container direction="column">
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              textAlign: "center",
              margin: "15px 0 10px"
            }}
          >
            More From Codelabz
          </Typography>
          <Thumbnails />
          <Thumbnails />
          <Thumbnails />
        </Grid>
      </Box>
      <Box className={classes.container}>
        <div className={classes.load}>
          <Button sx={{ textTransform: "none" }}>Show More &darr;</Button>
        </div>
        <Grid container direction="column">
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              textAlign: "center",
              margin: "15px 0 10px"
            }}
          >
            More On GIT
          </Typography>
          <Thumbnails />
          <Thumbnails />
          <Thumbnails />
        </Grid>
      </Box>
    </>
  );
};

export default SideBar;
