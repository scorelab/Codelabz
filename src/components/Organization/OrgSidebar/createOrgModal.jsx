import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createOrganization } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import CountryDropdown from "../../../helpers/countryDropdown";

const CreateOrgModal = (props) => {
	const firebase = useFirebase();
	const firestore = useFirestore();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState({
		org_name: "",
		org_handle: "",
		org_website: "",
		org_country: "",
	});

	const handleChange = (e) => {
		setData((prev) => ({
			...prev,
			[e.target?.name]: e.target?.value,
		}));
	};
	const handleCountry = (e) => {
		setData((prev) => ({
			...prev,
			org_country: e,
		}));
	};
	const loadingProp = useSelector(
		({
			profile: {
				edit: { loading },
			},
		}) => loading
	);
	const errorProp = useSelector(
		({
			profile: {
				edit: { error },
			},
		}) => error
	);

	useEffect(() => {
		setLoading(loadingProp);
	}, [loadingProp]);

	useEffect(() => {
		setError(errorProp);
	}, [errorProp]);

	useEffect(() => {
		if (loadingProp === false && errorProp === false) {
			setVisible(false);
		}
	}, [loadingProp, errorProp]);

	useEffect(() => {
		if (props.show === true) {
			setVisible(true);
		}
	}, [props.show]);

	// Calls a function in the sidebar to set the modal state to visible false as well
	useEffect(() => {
		if (visible === false) {
			props.closeCallback();
		}
	}, [visible, props]);

	const handleCancel = () => {
		setVisible(false);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("orgData", data);
		setLoading(true);
		await createOrganization(data)(firebase, firestore, dispatch);
	};

	return (
		<Dialog
			open={visible}
			onClose={!handleCancel}
			style={{
				zIndex: "1",
			}}>
			{error && (
				<Alert
					message={""}
					description={"Org creation failed"}
					severity="error"
					closable
					className="mb-24"
				/>
			)}
			<div
				style={{
					margin: "2rem",
				}}>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						flexFlow: "column",
						justifyContent: "center",
						alignItems: "flex-start",
						padding: "1rem",
					}}>
					<Input
						placeholder="Organization Name"
						autoComplete="organization"
						name="org_name"
						onChange={(e) => handleChange(e)}
						fullWidth
						style={{ marginBottom: "1rem" }}
					/>
					<Input
						placeholder="Organization Handle"
						autoComplete="off"
						name="org_handle"
						onChange={(e) => handleChange(e)}
						fullWidth
						style={{ marginBottom: "1rem" }}
					/>
					<CountryDropdown name="org_country" handleChange={handleCountry} />

					<Input
						placeholder="Website"
						autoComplete="url"
						name="org_website"
						onChange={(e) => handleChange(e)}
						fullWidth
						style={{ marginBottom: "1rem" }}
					/>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<Button key="back" onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							key="submit"
							type="primary"
							htmlType="submit"
							loading={loading}
							onClick={(e) => onSubmit(e)}>
							{loading ? "Creating..." : "Create"}
						</Button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default CreateOrgModal;
