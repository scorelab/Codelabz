import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ExploreOrgs from "./ExploreOrgs";
import PropTypes from "prop-types";

const MyFeed = ({
  heading = "Explore Codelabz",
  title = " Explore top rated Organizations and find the Codelabz you are looking for",
  backgroundcolor = "#f2f2f2",
  textcolor = "black",
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
        >
          <Typography variant="h2" style={{ color: textcolor }}>
            {heading}
          </Typography>
          <p>{title}</p>
        </Grid>

        <Grid item xs={12}>
          {" "}
          <ExploreOrgs />
        </Grid>
      </Grid>
    </Box>
  );
};

MyFeed.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string,
  backgroundcolor: PropTypes.string,
  textcolor: PropTypes.string,
};

export default MyFeed;
