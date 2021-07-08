import { Card, Col, Row } from "antd";
import React from "react";
import BrandName from "../../helpers/brandName";
import ExploreOrgs from "./ExploreOrgs";
import Carousel from "./Carousel/index";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const MyFeed = () => {
  return (
    <Box>
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
          <Typography variant="h2">Explore Codelabz</Typography>
          <p>
            Explore top rated Organizations and find the <b>Codelabz</b> you are
            looking for
          </p>
          <div item xs={12}>
            <Carousel />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyFeed;
