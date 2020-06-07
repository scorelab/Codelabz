import React, { useEffect, useState } from "react";
import { Alert, Button } from "antd";
import { resendVerifyEmail } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const AlertComp = ({ description, type }) => {
  return (
    <Alert
      message={""}
      description={description}
      type={type ? type : "error"}
      closable
      className="mb-16"
    />
  );
};

const ViewAlerts = ({ error }) => {
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const errorProp = useSelector(({ auth }) => auth.verifyEmail.error);
  const loadingProp = useSelector(({ auth }) => auth.verifyEmail.loading);
  const email = useSelector(({ auth }) => auth.verifyEmail.email);

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
        <Alert description={error} />
      )}

      {error && error === "email-unverified" && !resendError && (
        <AlertComp
          description={
            <>
              Please verify your email. Click{" "}
              <Button
                type="link"
                onClick={() => resendVerifyEmail(email)(dispatch)}
                className="pl-0 pr-0"
              >
                here
              </Button>{" "}
              to resend the verification email.
            </>
          }
        />
      )}

      {resendError && <AlertComp description={resendError} />}

      {resendLoading && (
        <AlertComp description={"Resending the verification email..."} />
      )}

      {success && (
        <AlertComp
          description={"Please check your email and verify your email."}
          type="success"
        />
      )}
    </>
  );
};

export default ViewAlerts;
