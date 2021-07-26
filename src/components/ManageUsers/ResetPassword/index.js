import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRecoverPasswordError,
  verifyPasswordResetCode,
} from "../../../store/actions";
import { Alert, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import PasswordResetForm from "./PasswordResetForm";

const { Title } = Typography;

const ResetPassword = ({ queryParams = "test" }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { oobCode: actionCode } = queryParams;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const errorProps = useSelector(({ auth }) => auth.recoverPassword.error);
  const loadingProps = useSelector(({ auth }) => auth.recoverPassword.loading);

  useEffect(() => {
    verifyPasswordResetCode(actionCode)(firebase, dispatch);
  }, [actionCode, firebase, dispatch]);

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

  useEffect(
    () => () => {
      clearRecoverPasswordError()(dispatch);
    },
    [dispatch]
  );

  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card bordered={false}>
            {loading && (
              <Title
                level={4}
                style={{ textAlign: "center", marginBottom: "40px" }}
              >
                Please wait...
              </Title>
            )}
            {error && (
              <>
                <Alert
                  message={"Password reset link verification failed"}
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

            {success && <PasswordResetForm actionCode={actionCode} />}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
