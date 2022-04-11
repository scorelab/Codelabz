import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import PropTypes from "prop-types";
import Carousel from "./Carousel/index";

const MyFeed = ({
  heading = "Explore Codelabz",
  title = " Explore top rated Organizations and find the Codelabz you are looking for",
  backgroundcolor = "white",
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
          justifyContent="center"
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
              justifyContent: "center",
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
  textcolor: PropTypes.string,
};

export default MyFeed;
