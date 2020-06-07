import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, clearAuthError } from "../../../store/actions";
import MiniNavbar from "../../MiniNavbar";

const { Title } = Typography;

const VerifyEmail = ({ queryParams }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { oobCode: actionCode } = queryParams;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const errorProps = useSelector(({ auth }) => auth.verifyEmail.error);
  const loadingProps = useSelector(({ auth }) => auth.verifyEmail.loading);

  useEffect(() => {
    verifyEmail(actionCode)(firebase, dispatch);
  }, [actionCode, firebase, dispatch]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    if (errorProps === false && loadingProps === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProps, loadingProps]);

  return (
    <>
      <MiniNavbar />
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card bordered={false}>
            {loading && (
              <Title
                level={4}
                style={{ textAlign: "center", marginBottom: "40px" }}
              >
                Now verifying your email
              </Title>
            )}

            {error && (
              <>
                <Alert
                  message={"Email verification failed"}
                  description={error}
                  type="error"
                  closable
                  className="mb-16"
                  showIcon
                />
                <Row justify="center" align="center" className="mt-24">
                  <Col sm={24} className="center">
                    Back to <Link to={"/login"}>CodeLabz</Link>
                  </Col>
                </Row>
              </>
            )}

            {success && (
              <>
                <Alert
                  message={"Success"}
                  description={"Your email has been verified!"}
                  type="success"
                  closable
                  className="mb-16"
                  showIcon
                />
                <Row justify="center" align="center" className="mt-24">
                  <Col sm={24} className="center">
                    <Link to={"/login"}>Log in</Link>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VerifyEmail;
