import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  verifyPasswordResetCode
} from "../../../store/actions";
import { Alert, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import PasswordResetForm from "./PasswordResetForm";
const { Title } = Typography;

const ResetPassword = ({ queryParams }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { oobCode: actionCode } = queryParams;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const errorProps = useSelector(({ auth }) => auth.profile.error);
  const loadingProps = useSelector(({ auth }) => auth.profile.loading);

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
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  return (
    <Card bordered={false}>
      <Title level={4} style={{ textAlign: "center", marginBottom: "40px" }}>
        {loading && "Add a loading icon here"}
      </Title>

      {error && (
        <Alert
          message={"Password reset link verification failed"}
          description={error}
          type="error"
          closable
          className="mb-16"
          showIcon
        />
      )}

      {success && <PasswordResetForm actionCode={actionCode} />}

      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          <Link to={"/login"}>Sign in</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ResetPassword;
