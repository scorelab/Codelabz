import Grid from "@material-ui/core/Grid";
import React from "react";
import BrandName from "./brandName";

const Spinner = ({ half }) => {
  return (
    <Grid
      justify={"center"}
      style={{ minHeight: half ? "50vh" : "100vh" }}
      alignItems="center"
      container
    >
      <Grid xs={12} style={{ textAlign: "center" }}>
        <div className="pulse">
          <BrandName />
        </div>
      </Grid>
      <Grid />
    </Grid>
  );
};

export default Spinner;
