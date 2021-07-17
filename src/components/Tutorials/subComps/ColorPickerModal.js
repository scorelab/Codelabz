import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import Grid from "@material-ui/core/Grid";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import "rc-color-picker/assets/index.css";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { setTutorialTheme } from "../../../store/actions";
import { GridOff } from "@material-ui/icons";

const ColorPickerModal = ({ visible, visibleCallback, tutorial_id, owner }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const handleOk = () => {
    setLoading(true);
    setTutorialTheme({ tutorial_id, owner, bgColor, textColor })(
      firebase,
      firestore,
      dispatch
    ).then(() => {
      setLoading(false);
      visibleCallback(false);
    });
  };

  const handleCancel = () => {
    visibleCallback(false);
  };

  const updateTextColor = color => {
    setTextColor(color.color);
  };

  const updateBackgroundColor = color => {
    setBgColor(color.color);
  };

  return (
    <div>
      <Modal
        title="Edit CodeLabz Theme"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Grid align="middle" justify="center" className="mb-24">
          <Grid
            xs={24}
            md={12}
            className="mb-16"
            style={{ textAlign: "center" }}
          >
            <h4 className="mb-8">Text Color</h4>
            <div>
              <ColorPickerPanel
                enableAlpha={false}
                onChange={updateTextColor}
                mode="RGB"
              />
            </div>
          </Grid>
          <Grid
            xs={24}
            md={12}
            className="mb-16"
            style={{ textAlign: "center" }}
          >
            <h4 className="mb-8">Background Color</h4>
            <div>
              <ColorPickerPanel
                enableAlpha={false}
                onChange={updateBackgroundColor}
                mode="RGB"
                align="center"
              />
            </div>
          </Grid>
        </Grid>

        <Grid
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: bgColor,
            color: textColor,
            border: "1px solid #eeeeee"
          }}
          align="middle"
        >
          <Grid xs={24} style={{ textAlign: "center" }}>
            Change the values above to see the preview
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ColorPickerModal;
