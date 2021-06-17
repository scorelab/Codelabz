import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ExploreOrgs from "./ExploreOrgs";

const MyFeed = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ paddingTop: "15px" }}
        >
          <Typography variant="h2">Explore Codelabz</Typography>
          <p>
            Explore top rated Organizations and find the <b>Codelabz</b> you are
            looking for
          </p>
        </Grid>

        <Grid>
          {" "}
          <ExploreOrgs />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyFeed;
