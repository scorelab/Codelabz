import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { deleteOrganization } from "../../../store/actions/orgActions";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	input: {
		marginTop: "15px",
	},
	deleteButton: {
		marginTop: "15px",
		color: "white",
	},
}));

/**
 * @description Delete organization modal
 */
function OrgDeleteModal() {
	const history = useHistory("/");
	const firebase = useFirebase();
	const dispatch = useDispatch();

	const [deleteOrgInput, setDeleteOrgInput] = React.useState("");

	const classes = useStyles();
	const CurrentOrg = useSelector(
		({
			profile: {
				data: { organizations },
			},
			org: {
				general: { current },
			},
		}) => organizations.find((element) => element.org_handle === current)
	);

	const deleteOrganizationHandler = useCallback(async () => {
		await deleteOrganization(CurrentOrg.org_handle)(firebase, dispatch);
		history.push("/");
	}, [CurrentOrg.org_handle, dispatch, firebase, history]);

	return (
		<React.Fragment>
			<DialogTitle>
				Are you sure you want to delete {CurrentOrg?.org_name}?
			</DialogTitle>

			<DialogContent className={classes.root}>
				<Typography>
					This action cannot be <strong>undone</strong>. This will delete all
					the data associated with this organization.
				</Typography>
				<Typography
					style={{
						marginTop: "20px",
					}}>
					Please type <strong data-testid="orgHandle" >{CurrentOrg?.org_handle}</strong> to confirm.
				</Typography>
				<TextField
					fullWidth
					placeholder="Type here"
					variant="outlined"
					className={classes.input}
					value={deleteOrgInput}
					onChange={(e) => setDeleteOrgInput(e.target.value)}
					data-testid="deleteOrgInput"
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					disableElevation
					data-testid="deleteOrgButton"
					className={classes.deleteButton}
					onClick={deleteOrganizationHandler}
					disabled={CurrentOrg?.org_handle !== deleteOrgInput}>
					Delete Organization
				</Button>
			</DialogContent>
		</React.Fragment>
	);
}

export default OrgDeleteModal;
