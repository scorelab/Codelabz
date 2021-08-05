import React from "react";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import Grid from '@material-ui/core/Grid';

const ControlButtons = ({ currentStep, setCurrentStep, stepsData, hide }) => {
  const bottomMargin = 54;

  if (!hide && stepsData) {
    return (
      <Grid>
      <div>
          {currentStep > 0 && (
            <Button
            color="secondary"
            variant="contained"
              onClick={() => {
                setCurrentStep(currentStep - 1);
                window.scrollTo(0, 0);
              }}
            >
              Previous
            </Button>
          )}
          {currentStep < stepsData.length - 1 && (
            <Button
             variant="contained"
             color="primary"
              type="primary"
              onClick={() => {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
              }}
              style={{ float: "right" }}
            >
              Next
            </Button>
          )}
          {currentStep === stepsData.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                <Snackbar 
                anchorOrigin={{ 
                  vertical: "bottom",
                   horizontal: "left",
                 }}
                 open={true} autoHideDuration={6000}
                 message="tutorial complete" 
                />;
                window.scrollTo(0, 0);
              }}
              style={{ float: "right" }}
            >
              Finish
            </Button>
          )}
        </div>
      </Grid>
    );
  } else return null;
};

export default ControlButtons;
