import React from "react";
import { Drawer, Space, Row, Col, message, Divider, Button } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const ImageDrawer = ({ onClose, visible }) => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Drawer
      title="Images"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      getContainer={true}
      style={{ position: "absolute" }}
      width="400px"
      className="image-drawer"
      destroyOnClose={true}
    >
      <div className="col-pad-24">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to here to upload
          </p>
        </Dragger>
        <Divider />
        <Row className="mb-24">
          <Col xs={24} md={8}>
            <img
              src="https://cdn.motor1.com/images/mgl/mG4VR/s1/sri-lanka-s-super-ev-check-vega-evx-s-real-technical-specifications.jpg"
              alt=""
            />
          </Col>
          <Col xs={24} md={16} className="pl-8" style={{}}>
            <h4 className="pb-8">car.jpg</h4>
            <Space style={{ float: "right" }}>
              <Button type="primary">Copy URL</Button>
              <Button type="ghost" danger>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row className="mb-24">
          <Col xs={24} md={8}>
            <img
              alt="car"
              src="https://cdn.motor1.com/images/mgl/mG4VR/s1/sri-lanka-s-super-ev-check-vega-evx-s-real-technical-specifications.jpg"
            />
          </Col>
          <Col xs={24} md={16} className="pl-8" style={{}}>
            <h4 className="pb-8">car.jpg</h4>
            <Space style={{ float: "right" }}>
              <Button type="primary">Copy URL</Button>
              <Button type="ghost" danger>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row className="mb-24">
          <Col xs={24} md={8}>
            <img
              alt="car"
              src="https://cdn.motor1.com/images/mgl/mG4VR/s1/sri-lanka-s-super-ev-check-vega-evx-s-real-technical-specifications.jpg"
            />
          </Col>
          <Col xs={24} md={16} className="pl-8" style={{}}>
            <h4 className="pb-8">car.jpg</h4>
            <Space style={{ float: "right" }}>
              <Button type="primary">Copy URL</Button>
              <Button type="ghost" danger>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row className="mb-24">
          <Col xs={24} md={8}>
            <img
              alt="car"
              src="https://cdn.motor1.com/images/mgl/mG4VR/s1/sri-lanka-s-super-ev-check-vega-evx-s-real-technical-specifications.jpg"
            />
          </Col>
          <Col xs={24} md={16} className="pl-8" style={{}}>
            <h4 className="pb-8">car.jpg</h4>
            <Space style={{ float: "right" }}>
              <Button type="primary">Copy URL</Button>
              <Button type="ghost" danger>
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
      </div>
    </Drawer>
  );
};

export default ImageDrawer;
