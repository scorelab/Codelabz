import React, { useEffect, useState } from "react";
import Alert from "@mui/lab/Alert";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, clearAuthError } from "../../../store/actions";

const VerifyEmail = ({ queryParams = "test" }) => {
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
			<Grid justify="center">
				<Grid xs={24} sm={24} md={12} lg={10}>
					<Card bordered={false}>
						{loading && (
							<Typography
								variant="h3"
								style={{ textAlign: "center", marginBottom: "40px" }}>
								Now verifying your email
							</Typography>
						)}

						{error && (
							<>
								<Alert severity="error" closable className="mb-16" showIcon>
									Verification failed
								</Alert>
								<Grid justify="center" align="center" className="mt-24">
									<Grid sm={24} className="center">
										Back to <Link to={"/login"}>CodeLabz</Link>
									</Grid>
								</Grid>
							</>
						)}

						{success && (
							<>
								<Alert severity="success" closable className="mb-16" showIcon>
									Your email has been verified!
								</Alert>
								<Grid justify="center" align="center" className="mt-24">
									<Grid sm={24} className="center">
										<Link to={"/login"}>Log in</Link>
									</Grid>
								</Grid>
							</>
						)}
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default VerifyEmail;
