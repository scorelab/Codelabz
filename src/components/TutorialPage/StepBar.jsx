import React, { useEffect, useState } from "react";
import { Drawer, Typography } from "@mui/material";
import StepList from "./StepList";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import { useFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { useAllowDashboard } from "../../helpers/customHooks";
import Card from "@mui/material/Card";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 250,
    flexShrink: 0,
    display: theme.breakpoints.down("md") ? null : "none"
  },
  drawerPaper: {
    width: 250
  },
  card: {
    margin: "0.1rem",
    padding: "0.5rem 1.5rem 0.5rem 0.5rem"
  }
}));

const StepsBar = ({
  open,
  toggleSlider,
  steps,
  drawWidth,
  value,
  onStateChange,
  children
}) => {
  const windowSize = useWindowSize();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const allowDashboard = useAllowDashboard();

  //Taking out the current organization handle of the user
  const currentOrg = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  console.log("steps bar", steps);

  const classes = useStyles();
  return (
    <>
      {windowSize.width <= (drawWidth || 960) ? (
        <Drawer
          closable="true"
          open={open}
          anchor="right"
          onClose={toggleSlider}
          data-testId="sidebar_mobile"
          style={{ zIndex: 99999 }}
          classes={{
            root: classes.drawer,
            paper: classes.drawerPaper
          }}
          xs={12}
          md={3}
        >
          <StepList
            menuItems={steps}
            value={value}
            onStateChange={onStateChange}
            toggleSlider={toggleSlider}
            style={{
              position: "absolute"
            }}
          >
            {children}
          </StepList>
        </Drawer>
      ) : (
        <Card className={classes.card} data-testId="tutorialpageStepsBar">
          <div data-testId="sidebar_desktop">
            <Typography sx={{ fontWeight: "800", textAlign: "center" }}>
              STEPS
            </Typography>
            <StepList
              menuItems={steps}
              value={value}
              onStateChange={onStateChange}
            >
              {children}
            </StepList>
          </div>
        </Card>
      )}
    </>
  );
};

export default StepsBar;
