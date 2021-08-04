import React, { useState } from "react";
import OrgSidebar from "./OrgSidebar/orgSidebar";
import { useMediaQuery } from "react-responsive";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import OrgInfoCard from "./OrgInfoCard/orgInfoCard";
import OrgUsersCard from "./OrgUsersCard/orgUsersCard";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

const Organizations = () => {
  window.scrollTo(0, 0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const classes = useStyles();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  return (
    <Grid
      className="row-footer-below"
      style={{ display: "flex", flexDirection: "row" }}
    >
      {isDesktop && (
        <div className="mini-sidebar-column">
          <OrgSidebar onOrgChange={() => {}} />
        </div>
      )}
      {!isDesktop && (
        <Drawer
          anchor="bottom"
          open={drawerVisible}
          height={"60%"}
          onClose={() => setDrawerVisible(false)}
        >
          <Grid>
            <Grid xs={24} className="col-pad-24-s pt-0">
              <OrgSidebar
                onOrgChange={() => {
                  setDrawerVisible(false);
                }}
              />
            </Grid>
          </Grid>
        </Drawer>
      )}

      <Grid>
        {!isDesktop && (
          <Grid>
            <Grid xs={24} className="col-pad-24-s pb-0">
              <Button
                onClick={() => setDrawerVisible(true)}
                block
                type="primary"
                variant="outlined"
              >
                Switch organization
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid className={classes.cardBody}>
          <Grid xs={24} sm={24} md={14} className="col-pad-24-s pr-12">
            <OrgInfoCard />
          </Grid>
          <Grid xs={24} sm={24} md={10} className="col-pad-24-s pl-12">
            <OrgUsersCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Organizations;
