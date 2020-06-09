import React from "react";
import { Row, Col, PageHeader, Button } from "antd";
import { Link } from "react-router-dom";
import BrandName from "../brandName";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { useAuthStatus } from "../../helpers/customHooks";
import { useHistory } from "react-router-dom";

const MiniNavbar = ({ type }) => {
  const firebase = useFirebase();
  const authed = useAuthStatus();
  const history = useHistory();

  return (
    <Row>
      <Col xs={24}>
        <PageHeader
          className="site-page-header"
          title={
            <h3 style={{ color: "#3AAFA9" }} className="brand-font">
              <Link to={"/"}>
                <BrandName />
              </Link>
            </h3>
          }
          backIcon={false}
          extra={
            authed
              ? [
                  <Button key="2" type="link">
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </Button>,
                  <Button
                    onClick={() => signOut()(firebase, history)}
                    key="1"
                    type="dashed"
                  >
                    Log out
                  </Button>,
                ]
              : [
                  <Button
                    key="2"
                    type={type && type === "login" ? "primary" : "link"}
                  >
                    <Link to={"/login"}>Log In</Link>
                  </Button>,
                  <Button
                    key="1"
                    type={
                      type && type === "signup"
                        ? "primary"
                        : type && type === "login"
                        ? "link"
                        : "dashed"
                    }
                  >
                    <Link to={"/signup"}>Sign Up</Link>
                  </Button>,
                ]
          }
        />
      </Col>
    </Row>
  );
};

export default MiniNavbar;
