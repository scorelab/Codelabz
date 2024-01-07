import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { validateHandle } from "../../../helpers/validations";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { checkUserHandleExists, checkAdminExists, checkAdminEmail } from "../../../store/actions";
import { addOrgAdmins } from "../../../store/actions";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { fetchAdmins } from "../../../store/actions";

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

	const [adminHandle, setAdminHandle] = useState('');
	const [adminEmail, setAdminEmail] = useState('')
	const [adminDesignation, setAdminDesignation] = useState('');

	const [errorMessage, setErrorMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading,setLoading]=useState(false);

	const [orgUsers,setOrgUsers]=useState(Users);

	const fetchData = async () => {
		try {
		  const admins = await fetchAdmins(org_handle)(firebase, dispatch);
		  setOrgUsers(admins)
		} catch (error) {
		  console.error("Error fetching admins:", error);
		}
	};

	const addNewAdmins = async (e) => {
		setLoading(true);
		e.stopPropagation();
		e.preventDefault();

		const exists = await checkUserHandleExists(adminHandle)(firebase, dispatch);
		if (exists) {
			const adminHandleExists = await checkAdminExists(adminHandle, org_handle)(firebase, dispatch);
			if (!adminHandleExists) {
				const adminEmailExists = await checkAdminEmail(adminHandle,adminEmail)(firebase, dispatch);
				if (adminEmailExists) {
					addOrgAdmins(org_handle, adminHandle, adminEmail, adminDesignation)(firestore, dispatch)
						.then(() => {
							setLoading(false);
							Swal.fire({
								title: "Admin Added !",
								text: "You clicked the button!",
								icon: "success"
							});
						})
					setShowPopUp(false);
					fetchData();
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
		} else {
			setLoading(false);
			setErrorMessage("User doesn't exists !")
			setError(true);
		}
	}


	// useEffect(() => {
	// 	fetchData();
	//   }, [firebase, dispatch, org_handle]);


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
						<form className={`${classes.form}`} onSubmit={addNewAdmins}>
							<input className={`${classes.inputfield}`} type="text" placeholder="Enter admin's name" onChange={(e) => setAdminHandle(e.target.value)} required />
							<input className={`${classes.inputfield}`} type="email" placeholder="Enter admin's email" onChange={(e) => setAdminEmail(e.target.value)} required />
							<input className={`${classes.inputfield}`} type="text" placeholder="Enter admin's designation" onChange={(e) => setAdminDesignation(e.target.value)} required />
							{error && (
								<div className={`${classes.errorDiv}`} ><CancelOutlinedIcon className={`${classes.errorIcon}`} onClick={()=>setError(false)}/><p className={`${classes.errorMessage}`}>{errorMessage}</p></div>
							)}
							<input className={`${classes.submit}`} type="submit" value={loading ? "Validating ..." : "Add Admin"} required />
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
								onClick={() => setShowPopUp(!showPopUp)}
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
											{user.adminHandle},
										</Typography>
										<Typography className={classes.userDesignation}>
											{user.adminDesignation}
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
