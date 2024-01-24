import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "30px"
    }
  },
  rightButtonsGroup: {
    display: "flex",
    gap: "5px"
  },
  prevButton: {
    borderWidth: "2px",
    "&:hover": {
      borderWidth: "2px"
    },
    minWidth: "fit-content"
  },
  completeButton: {
    minWidth: "fit-content"
  }
}));

const ControlButtons = ({
  currentStep,
  setCurrentStep,
  stepsData,
  hide,
  setStepData
}) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  if (!hide && stepsData) {
    return (
      <Grid>
        <Box className={classes.container}>
          <Button
            color="primary"
            variant="outlined"
            data-testid="previousStepButton"
            onClick={() => {
              setCurrentStep(currentStep - 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentStep === 0}
            className={classes.prevButton}
          >
            Previous
          </Button>
          <Box className={classes.rightButtonsGroup}>
            <Button
              variant="contained"
              color="primary"
              type="primary"
              data-testid="nextStepButton"
              onClick={() => {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
              }}
              disabled={currentStep >= stepsData.length - 1}
            >
              Next
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (!stepsData[currentStep].completed) setSnackbarOpen(true);
                window.scrollTo(0, 0);
                setStepData(prevSteps =>
                  prevSteps.map((step, index) =>
                    index === currentStep
                      ? { ...step, completed: !step.completed }
                      : step
                  )
                );
              }}
              className={classes.completeButton}
            >
              {stepsData[currentStep].completed
                ? "Reset Step"
                : "Complete Step"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Tutorial Step complete"
        />
      </Grid>
    );
  } else return null;
};

export default ControlButtons;
