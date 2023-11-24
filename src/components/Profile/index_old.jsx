import React from "react";
import ProfileInfoCard from "./ProfileInfoCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Profile = () => {
  return (
    <Box mt={4} mb={2} m={4} className="row-footer-below">
      <Box style={{ backgroundColor: "white" }}>
        <Grid container>
          <Grid xs={12} md={12} lg={12} item={true}>
            <ProfileInfoCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
