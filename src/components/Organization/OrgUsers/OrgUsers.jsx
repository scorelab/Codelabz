import {
	Avatar,
	Button,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { validateHandle } from "../../../helpers/validations";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { checkUserHandleExists, checkAdminExists, checkAdminEmail ,checkContributorExists,checkContributorEmail,areRolesMutuallyExclusive} from "../../../store/actions";
import { addOrgAdmins ,addOrgContributors} from "../../../store/actions";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { fetchAdmins , fetchContributors} from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
	root: {
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: "10px",
	},
	gridPadding: {
		padding: theme.spacing(2),
	},
	button: {
		boxShadow: "none",
		borderRadius: "10px",
	},
	heading: {
		fontSize: theme.typography.pxToRem(17),
		fontWeight: theme.typography.fontWeightMedium,
	},
	body: {
		fontSize: theme.typography.pxToRem(12),
	},
	userCard: {
		padding: theme.spacing(1),
		"&:hover": {
			backgroundColor: theme.palette.background.default,
		},
		borderRadius: "10px",
	},
	userList: {
		marginTop: theme.spacing(2),
	},
	userName: {
		fontSize: theme.typography.pxToRem(14),
		fontWeight: theme.typography.fontWeightMedium,
	},
	userDesignation: {
		fontSize: theme.typography.pxToRem(14),
		paddingLeft: theme.spacing(0.5),
		fontWeight: theme.typography.fontWeightLight,
	},
	viewMore: {
		borderTop: `1px solid ${theme.palette.divider}`,
		padding: theme.spacing(1),
		cursor: "pointer",
	},
	buttonDiv: {
		[theme.breakpoints.down("md")]: {
			justifyContent: "flex-start",
			paddingTop: theme.spacing(2),
		},
		[theme.breakpoints.up("md")]: {
			justifyContent: "flex-end",
		},
	},
	popup_overlay: {
		position: "absolute",
		top: 200,
		left: 500,
		width: "40%",
		height: "50%",
		backgroundColor: "white",
		boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
		zIndex: "9999m"
	},
	popup: {
		display: "flex",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		width: "90%",
		height: "80%",
		// border:"1px solid black"
	},
	inputfield: {
		border: "none",
		backgroundColor: "#E0E0E0",
		// color:"white",
		borderRadius: "10px",
		height: "50%",
		textAlign: "center"
	},
	submit: {
		border: "none",
		backgroundColor: "#999999",
		color: "white",
		borderRadius: "10px",
		height: "50%",
		textAlign: "center",
		"&:hover": {
			backgroundColor: "#666666", // Change background color on hover
		},
	},

	errorDiv: {
		display: "flex",
		border: "1px solid red",
		height: "100px"
	},
	errorMessage: {
		marginLeft: "29%",
		color: "red"
	},
	errorIcon: {
		height: "100%",
		width: "7%",
		color: "red",
		mixBlendMode: "multiply",
	}



}));

function Orgusers({
	Users,
	title,
	description,
	AddUser,
	isViewMore,
	dataTestId,
	org_handle
}) {
	const classes = useStyles();
	const [showPopUp, setShowPopUp] = useState(false);
	const firebase = useFirebase();
	const firestore = useFirestore();
	const dispatch = useDispatch();

	const [handleValidateError, setHandleValidateError] = useState(false);
	const [handleValidateErrorMessage, setHandleValidateErrorMessage] = useState("");

	const [orgUserHandle, setOrgUserHandle] = useState('');
	const [orgUserEmail, setOrgUserEmail] = useState('')
	const [orgUserDesignation, setOrgUserDesignation] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const [orgUsers, setOrgUsers] = useState(Users);

	const fetchData = async (users) => {
		try {
			if(users=="Admins"){
				const admins = await fetchAdmins(org_handle)(firebase, dispatch);
				setOrgUsers(admins)
			}else{
				const contributors = await fetchContributors(org_handle)(firebase, dispatch);
				setOrgUsers(contributors)
			}
		} catch (error) {
			console.error("Error fetching Org Users", error);
		}
	};

	const addNewOrgUser = async (e) => {
		setLoading(true);
		e.stopPropagation();
		e.preventDefault();

		const exists = await checkUserHandleExists(orgUserHandle)(firebase, dispatch);
		if (exists) {
			if (Users[0].hasOwnProperty("adminHandle")) {
				const adminHandleExists = await checkAdminExists(orgUserHandle, org_handle)(firebase, dispatch);
				if (!adminHandleExists) {
					const adminEmailValid = await checkAdminEmail(orgUserHandle, orgUserEmail)(firebase, dispatch);
					if (adminEmailValid) {
						const rolesMutuallyExclusive=await areRolesMutuallyExclusive("contributors",orgUserHandle,org_handle)(firebase,dispatch);
						if (!rolesMutuallyExclusive){
							addOrgAdmins(org_handle, orgUserHandle, orgUserEmail, orgUserDesignation)(firestore, dispatch)
								.then(() => {
									setLoading(false);
									Swal.fire({
										title: "Admin Added !",
										text: "You clicked the button!",
										icon: "success"
									});
								})
							setShowPopUp(false);
							fetchData("Admins");
						}else{
							setLoading(false);
							setErrorMessage('User is already added as Contributor')
							setError(true)
						}
					} else {
						setLoading(false);
						setErrorMessage('Email is not registered for this user')
						setError(true)
					}
				} else {
					setLoading(false);
					setErrorMessage("Admin already exists !")
					setError(true);
				}
			}
			else {
				const contributorHandleExists = await checkContributorExists(orgUserHandle, org_handle)(firebase, dispatch);
				if (!contributorHandleExists) {
					const contributorEmailValid = await checkContributorEmail(orgUserHandle, orgUserEmail)(firebase, dispatch);
					if (contributorEmailValid) {
						const rolesMutuallyExclusive=await areRolesMutuallyExclusive("admins",orgUserHandle,org_handle)(firebase,dispatch);
						if (!rolesMutuallyExclusive){
							addOrgContributors(org_handle, orgUserHandle, orgUserEmail, orgUserDesignation)(firestore, dispatch)
								.then(() => {
									setLoading(false);
									Swal.fire({
										title: "Contributor Added !",
										text: "You clicked the button!",
										icon: "success"
									});
								})
							setShowPopUp(false);
							fetchData("Contributors");
						}else{
							setLoading(false);
							setErrorMessage('User is already added as Admin')
							setError(true)	
						}
					} else {
						setLoading(false);
						setErrorMessage('Email is not registered for this user')
						setError(true)
					}
				} else {
					setLoading(false);
					setErrorMessage("Contributor already exists !")
					setError(true);
				}
			}

		} else {
			setLoading(false);
			setErrorMessage("User doesn't exists !")
			setError(true);
		}
	}

	const popUp = () => {
		if (Users[0].hasOwnProperty("adminHandle")) {

			setIsAdmin(true);
			setShowPopUp(!showPopUp)
		} else {
			setIsAdmin(false);
			setShowPopUp(!showPopUp)
		}
	}

	const closePopUp = () => {
		if (showPopUp) {
			setShowPopUp(false);
		}
	}

	return (
		<React.Fragment>
			{showPopUp && (

				<div className={`${classes.root} ${classes.popup_overlay}`}>
					<div className={`${classes.popup}`}>
						<form className={`${classes.form}`} onSubmit={addNewOrgUser}>
							<input className={`${classes.inputfield}`} type="text" placeholder={isAdmin ? "Enter Admin's Handle" : "Enter Contributor's Handle"} onChange={(e) => setOrgUserHandle(e.target.value)} required />
							<input className={`${classes.inputfield}`} type="email" placeholder={isAdmin ? "Enter Admin's Email" : "Enter Contributor's Email"} onChange={(e) => setOrgUserEmail(e.target.value)} required />
							<input className={`${classes.inputfield}`} type="text" placeholder={isAdmin ? "Enter Admin's Designation" : "Enter Contributor's Designation"} onChange={(e) => setOrgUserDesignation(e.target.value)} required />
							{error && (
								<div className={`${classes.errorDiv}`} ><CancelOutlinedIcon className={`${classes.errorIcon}`} onClick={() => setError(false)} /><p className={`${classes.errorMessage}`}>{errorMessage}</p></div>
							)}
							<input className={`${classes.submit}`} type="submit" value={loading ? "Validating ..." : isAdmin ? "Add Admin" : "Add Contributor"} required />
						</form>
					</div>
				</div>
			)}

			<Paper elevation={0} className={classes.root} data-testid={dataTestId} >
				<Grid container className={classes.gridPadding} onClick={closePopUp}>
					<Grid container direction="row">
						<Grid item container xs={10} direction="column">
							<Grid item>
								<Typography className={classes.heading} data-testid="org-title">
									{title}
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									variant="body1"
									className={classes.body}
									data-testid="org-description">
									{description}
								</Typography>
							</Grid>
						</Grid>
						<Grid item container md={2} className={classes.buttonDiv}>
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								onClick={popUp}
								style={{
									display: AddUser ? "flex" : "none",
								}}>
								<AddIcon />
								Add New
							</Button>
						</Grid>
					</Grid>
					<Grid
						container
						className={classes.userList}
						data-testid="org-userlist">
						{orgUsers.map((user, index) => (
							<React.Fragment key={index}>
								<Grid
									container
									direction="row"
									justifyContent="center"
									alignItems="center"
									className={classes.userCard}
									data-testid="org-user-card"
									spacing={2}>
									<Grid
										item
										container
										xs={3}
										md={1}
										justifyContent="center"
										alignItems="center">
										{user.avatar.type === "char" ? (
											<Avatar>{user.avatar.value}</Avatar>
										) : (
											<Avatar src={user.avatar.value} />
										)}
									</Grid>
									<Grid
										item
										xs={9}
										md={11}
										container
										direction="row"
										alignItems="center">
										<Typography className={classes.userName}>
											{Users[0].hasOwnProperty("adminHandle") ? user.adminHandle : user.contributorHandle }
										</Typography>
										<Typography className={classes.userDesignation}>
											{Users[0].hasOwnProperty("adminHandle") ? user.adminDesignation : user.contributorDesignation}
										</Typography>
									</Grid>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
				<Grid
					item
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					className={classes.viewMore}
					style={{
						display: isViewMore ? "flex" : "none",
					}}>
					<ExpandMoreIcon />
					<Typography variant="body1" className={classes.body}>
						View More
					</Typography>
				</Grid>
			</Paper>
		</React.Fragment>
	);
}

export default Orgusers;
