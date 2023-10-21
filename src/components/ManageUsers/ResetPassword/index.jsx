import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
	clearRecoverPasswordError,
	verifyPasswordResetCode,
} from "../../../store/actions";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
			<Grid justify="center">
				<Grid md={12} lg={10}>
					<Card bordered={false}>
						{loading && (
							<Title
								level={4}
								style={{ textAlign: "center", marginBottom: "40px" }}>
								Please wait...
							</Title>
						)}
						{error && (
							<>
								<Alert
									message={"Password reset link verification failed"}
									description={error}
									severity="error"
									closable
									className="mb-16"
									showIcon
								/>
								<Grid justify="center" align="center" className="mt-24">
									<Grid className="center">
										Back to <Link to={"/login"}>CodeLabz</Link>
									</Grid>
								</Grid>
							</>
						)}

						{success && <PasswordResetForm actionCode={actionCode} />}
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default ResetPassword;
