import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateStepTime, updateStepTitle } from "../../../store/actions";

const StepsTitle = ({ owner, tutorial_id, currentStepNo }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const [step_id, set_step_id] = useState(null);
  const [step_title, set_step_title] = useState(null);
  const [step_time, set_step_time] = useState(null);

  const [newStepTitle, setNewStepTitle] = useState(step_title);
  const [newStepTime, setNewStepTime] = useState(step_time);

  const current_step_no = useSelector(
    ({
      tutorials: {
        editor: { current_step_no }
      }
    }) => current_step_no
  );
  const current_data = useSelector(
    ({
      tutorials: {
        current: { data }
      }
    }) => data
  );

  useEffect(() => {
    if (current_data) {
      const { steps } = current_data;
      const current_step_data = steps[currentStepNo];
      set_step_id(current_step_data.id);
      set_step_title(current_step_data.title);
      setNewStepTitle(current_step_data.title);
      set_step_time(current_step_data.time);
      setNewStepTime(current_step_data.time);
    }
  }, [
    step_title,
    step_time,
    current_data,
    set_step_id,
    set_step_title,
    set_step_time,
    current_step_no,
    currentStepNo
  ]);

  const setStepTitle = () => {
    if (step_title !== newStepTitle && newStepTitle.length > 0) {
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={true}
        autoHideDuration={6000}
        message="Updating....."
      />;
      updateStepTitle(
        owner,
        tutorial_id,
        step_id,
        newStepTitle
      )(firebase, firestore, dispatch).then(() => (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={true}
          autoHideDuration={6000}
          message="Updated...."
        />
      ));
    }
  };

  const setStepTime = () => {
    if (step_time !== newStepTime) {
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={true}
        autoHideDuration={6000}
        message="Updating....."
      />;
      updateStepTime(
        owner,
        tutorial_id,
        step_id,
        newStepTime
      )(firebase, firestore, dispatch).then(() => (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={true}
          autoHideDuration={6000}
          message="Updated...."
        />
      ));
    }
  };

  return (
    <Grid>
      <Grid xs={24}>
        <form>
          <Grid style={{ width: "100%" }}>
            <Grid xs={24} md={19}>
              <Input
                onChange={e => setNewStepTitle(e.target.value)}
                value={newStepTitle}
                onBlur={setStepTitle}
                placeholder="Title of the step"
                className="tutorial-title-input"
                size="large"
                prefix={current_step_no + 1 + "."}
                type="text"
                data-testid={"stepTitleInput"}
              />
            </Grid>
            <Grid xs={24} md={5}>
              <Input
                onChange={e => setNewStepTime(parseInt(e.target.value) || 1)}
                value={newStepTime}
                onBlur={setStepTime}
                placeholder="Time"
                style={{ width: "100%" }}
                className="tutorial-title-input"
                size="large"
                type="number"
                suffix="minutes"
                name="step_time"
                data-testid={"stepTimeInput"}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default StepsTitle;
