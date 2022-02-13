import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Snackbar from "@material-ui/core/Snackbar";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateStepTime, updateStepTitle } from "../../../store/actions";

const StepsTitle = ({ owner, tutorial_id }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const [step_id, set_step_id] = useState(null);
  const [step_title, set_step_title] = useState(null);
  const [step_time, set_step_time] = useState(null);

  const current_step_no = useSelector(
    ({
      tutorials: {
        editor: { current_step_no },
      },
    }) => current_step_no
  );
  const current_data = useSelector(
    ({
      tutorials: {
        current: { data },
      },
    }) => data
  );

  useEffect(() => {
    if (current_data) {
      const { steps } = current_data;
      const current_step_data = steps[current_step_no];
      set_step_id(current_step_data.id);
      set_step_title(current_step_data.title);
      set_step_time(current_step_data.time);
    }
  }, [
    step_title,
    step_time,

    current_data,
    set_step_id,
    set_step_title,
    set_step_time,
    current_step_no,
  ]);

  const setStepTitle = () => {
    const newStepTitle = "step_title";
    if (step_title !== newStepTitle && newStepTitle.length > 0) {
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
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
            horizontal: "left",
          }}
          open={true}
          autoHideDuration={6000}
          message="Updated...."
        />
      ));
    }
  };

  const setStepTime = () => {
    const newStepTime = "step_time";
    if (step_time !== newStepTime && newStepTime.length > 0) {
      
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
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
            horizontal: "left",
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
      <Grid item={true} xs={24}>
        <form>
          <Grid style={{ width: "100%" }}>
            <Grid item={true} xs={24} md={19}>
              <Input
                onBlur={setStepTitle}
                onPressEnter={setStepTitle}
                placeholder="Title of the step"
                className="tutorial-title-input"
                size="large"
                prefix={current_step_no + 1 + "."}
              />
            </Grid>
            <Grid item={true} xs={24} md={5}>
              <Input
                onBlur={setStepTime}
                onPressEnter={setStepTime}
                placeholder="Time"
                style={{ width: "100%" }}
                className="tutorial-title-input"
                size="large"
                type="number"
                suffix="minutes"
                name="step_time"
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default StepsTitle;
