import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerifyEmail } from "../../../store/actions";

const AlertComp = ({ description, type }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Collapse in={isOpen}>
      <Alert
        severity={type ? type : "error"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        className="mb-16"
      >
        {description}
      </Alert>
    </Collapse>
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
        <AlertComp description={error} />
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
