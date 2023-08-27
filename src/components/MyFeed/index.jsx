import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Carousel from "./Carousel/index";
import OrgsExplore from "./discoverOrgs/OrgExplore";
import CodelabzExplore from "./DiscoverCodelabz/CodelabzExplore";

<<<<<<< HEAD
const MyFeed = ({
  heading = "Explore Codelabz",
  title = " Explore top rated Organizations and find the Codelabz you are looking for",
  backgroundcolor = "white",
  textcolor = "black"
}) => {
  return (
    <Box style={{ background: backgroundcolor, color: textcolor }}>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ padding: "15px" }}
          data-testId="codefeedTitle"
        >
          <Typography variant="h2" style={{ color: textcolor }}>
            {heading}
          </Typography>
          <p>{title}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Carousel />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

MyFeed.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string,
  backgroundcolor: PropTypes.string,
  textcolor: PropTypes.string
=======
const MyFeed = () => {
  return (
    <Box style={{ background: "#F9F9F9", color: "#000000", height: "100%" }}>
      <OrgsExplore />
      <CodelabzExplore />
    </Box>
  );
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
};

export default MyFeed;
