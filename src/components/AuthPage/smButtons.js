import React, { useState } from "react";
import { Row, Col, Space, Button } from "antd";
import {
  GoogleOutlined,
  TwitterOutlined,
  GithubOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { signInWithGoogle, signInWithProviderID } from "../../store/actions";

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [expand, setExpand] = useState(null);

  return (
    <Row justify="center" align="center">
      <Col sm={16} className="center">
        <Space>
          <Button
            shape={expand === "google" ? null : "circle"}
            size="large"
            icon={<GoogleOutlined />}
            className="google"
            onMouseEnter={() => setExpand("google")}
            onMouseLeave={() => setExpand(null)}
            onClick={() => signInWithGoogle()(firebase, dispatch)}
          >
            {expand === "google" ? "Google" : null}
          </Button>
          <Button
            shape={expand === "facebook" ? null : "circle"}
            size="large"
            icon={<FacebookFilled />}
            className="facebook"
            onMouseEnter={() => setExpand("facebook")}
            onMouseLeave={() => setExpand(null)}
            onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
          >
            {expand === "facebook" ? "Facebook" : null}
          </Button>
          <Button
            shape={expand === "twitter" ? null : "circle"}
            size="large"
            icon={<TwitterOutlined />}
            className="twitter"
            onMouseEnter={() => setExpand("twitter")}
            onMouseLeave={() => setExpand(null)}
            onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          >
            {expand === "twitter" ? "Twitter" : null}
          </Button>
          <Button
            shape={expand === "github" ? null : "circle"}
            size="large"
            icon={<GithubOutlined />}
            className="github"
            onMouseEnter={() => setExpand("github")}
            onMouseLeave={() => setExpand(null)}
            onClick={() => signInWithProviderID("github")(firebase, dispatch)}
          >
            {expand === "github" ? "GitHub" : null}
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default SmButtons;
