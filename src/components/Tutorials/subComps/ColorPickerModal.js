import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Row, Col } from "antd";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import "rc-color-picker/assets/index.css";

const ColorPickerModal = ({ visible, visibleCallback, tutorial_id }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [loading, setLoading] = useState(false);
  console.log(tutorial_id);
  const handleOk = () => {
    // TODO - put colors to the db
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      visibleCallback(false);
    }, 2000);
  };

  const handleCancel = () => {
    visibleCallback(false);
  };

  const updateTextColor = (color) => {
    setTextColor(color.color);
  };

  const updateBackgroundColor = (color) => {
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
        <Row align="middle" justify="center" className="mb-24">
          <Col
            xs={24}
            md={12}
            className="mb-16"
            style={{ textAlign: "center" }}
          >
            <h4 className="mb-8">Text Color</h4>
            <div>
              <ColorPickerPanel
                enableAlpha={false}
                color={textColor}
                onChange={updateTextColor}
                mode="RGB"
              />
            </div>
          </Col>
          <Col
            xs={24}
            md={12}
            className="mb-16"
            style={{ textAlign: "center" }}
          >
            <h4 className="mb-8">Background Color</h4>
            <div>
              <ColorPickerPanel
                enableAlpha={false}
                color={bgColor}
                onChange={updateBackgroundColor}
                mode="RGB"
                align="center"
              />
            </div>
          </Col>
        </Row>

        <Row
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: bgColor,
            color: textColor,
            border: "1px solid #eeeeee",
          }}
          align="middle"
        >
          <Col xs={24} style={{ textAlign: "center" }}>
            Change the values above to see the preview
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ColorPickerModal;
