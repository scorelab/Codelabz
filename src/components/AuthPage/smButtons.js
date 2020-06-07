import React from "react";
import { Row, Col, Space, Button } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { signInWithGoogle, signInWithProviderID } from "../../store/actions";
const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  return (
    <Row justify="center" align="center">
      <Col sm={16} className="center">
        <Space>
          <Button
            shape="circle"
            size="large"
            icon={
              <GoogleOutlined
                onClick={() => signInWithGoogle()(firebase, dispatch)}
                style={{ color: "#db3236" }}
              />
            }
          />
          <Button
            shape="circle"
            size="large"
            icon={<FacebookOutlined style={{ color: "#4267B2" }} />}
          />
          <Button
            shape="circle"
            size="large"
            icon={
              <TwitterOutlined
                onClick={() =>
                  signInWithProviderID("twitter")(firebase, dispatch)
                }
                style={{ color: "#1DA1F2" }}
              />
            }
          />
          <Button
            shape="circle"
            size="large"
            icon={
              <GithubOutlined
                onClick={() =>
                  signInWithProviderID("github")(firebase, dispatch)
                }
                style={{ color: "#211F1F" }}
              />
            }
          />
        </Space>
      </Col>
    </Row>
  );
};

export default SmButtons;
