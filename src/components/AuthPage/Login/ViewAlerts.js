import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { resendVerifyEmail } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const ViewAlerts = ({ error, email }) => {
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const errorProp = useSelector(({ auth }) => auth.verifyEmail.error);
  const loadingProp = useSelector(({ auth }) => auth.verifyEmail.loading);

  useEffect(() => setResendError(errorProp), [errorProp]);
  useEffect(() => setResendLoading(loadingProp), [loadingProp]);

  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProp, loadingProp]);

  return (
    <>
      {error && error !== "email-unverified" && !resendError && (
        <Alert
          message={""}
          description={error}
          type="error"
          closable
          className="mb-16"
        />
      )}

      {error && error === "email-unverified" && !resendError && (
        <Alert
          message={""}
          description={
            <>
              Please verify your email. Click{" "}
              <button
                style={{ cursor: "pointer" }}
                onClick={() => resendVerifyEmail(email)(dispatch)}
              >
                here
              </button>{" "}
              to resend the verification email.
            </>
          }
          type="error"
          closable
          className="mb-16"
        />
      )}

      {resendError && (
        <Alert
          message={""}
          description={resendError}
          type="error"
          closable
          className="mb-16"
        />
      )}

      {resendLoading && (
        <Alert
          message={""}
          description={"Resending the verification email..."}
          type="info"
          closable
          className="mb-16"
        />
      )}

      {success && (
        <Alert
          message={""}
          description={"Please check your email and verify your email."}
          type="success"
          closable
          className="mb-16"
        />
      )}
    </>
  );
};

export default ViewAlerts;
