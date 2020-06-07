import React from "react";
import { Row, Col, Space, Button } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
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
            icon={<GoogleOutlined style={{ color: "#db3236" }} />}
            onClick={() => signInWithGoogle()(firebase, dispatch)}
          />
          <Button
            shape="circle"
            size="large"
            icon={<FacebookOutlined style={{ color: "#4267B2" }} />}
            onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
          />
          <Button
            shape="circle"
            size="large"
            icon={<TwitterOutlined style={{ color: "#1DA1F2" }} />}
            onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          />
          <Button
            shape="circle"
            size="large"
            icon={<GithubOutlined style={{ color: "#211F1F" }} />}
            onClick={() => signInWithProviderID("github")(firebase, dispatch)}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default SmButtons;
