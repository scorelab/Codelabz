import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState,useEffect } from "react";
import Orgusers from "../OrgUsers/OrgUsers";
import { fetchAdmins, fetchContributors } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	heading: {
		fontWeight: 100,
		fontSize: "1.6rem",
	},
}));

function Users({orghandle}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const firebase=useFirebase();
	const [adminUsers, setAdminUsers] = useState([]);
	const [contributorUsers, setContributorUsers] = useState([]);

	const fetchAdminData = async () => {
		try {
		  const admins = await fetchAdmins(orghandle)(firebase, dispatch);
		  if(admins.length > 0){	
			  setAdminUsers(admins);
		  }else{
			  setAdminUsers([{adminHandle:"No",adminDesignation:"Admins yet !",avatar:{type:"char",value:"N"}}]);
		  }
		} catch (error) {
		  console.error("Error fetching admins:", error);
		}
	};

	const fetchContributorData = async () => {
		try {
		  const contributors = await fetchContributors(orghandle)(firebase, dispatch);
		  if(contributors.length > 0){	
			  setContributorUsers(contributors);
		  }else{
			  setContributorUsers([{contributorHandle:"No",contributorDesignation:"Contributors yet !",avatar:{type:"char",value:"N"}}]);
		  }
		} catch (error) {
		  console.error("Error fetching contributors:", error);
		}
	};


	useEffect(() => {
		fetchAdminData();
		fetchContributorData();
	  }, [firebase, dispatch, orghandle]);

	return (
		<React.Fragment>
			<Grid
				container
				className={classes.root}
				direction="column"
				spacing={3}
				data-testid="organization-users-page">
				<Grid item>
					<Typography className={classes.heading}>Users</Typography>
				</Grid>
				<Grid item>
				{adminUsers.length > 0 &&(
					<Orgusers
						Users={adminUsers}
						title="Admin"
						description="Admins can manage submissions, content, and settings"
						AddUser={true}
						dataTestId="org-admin-list"
						org_handle={orghandle}
					/>
				)}	
				</Grid>
				<Grid item>
				{contributorUsers.length > 0 &&(
					<Orgusers
						Users={contributorUsers}
						title="Contributers"
						description="Contributers can contribute to the project"
						AddUser={true}
						isViewMore={true}
						dataTestId="org-contributor-list"
						org_handle={orghandle}
					/>
				)}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default Users;
