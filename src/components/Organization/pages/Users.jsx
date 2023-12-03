import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState,useEffect } from "react";
import Orgusers from "../OrgUsers/OrgUsers";
import { fetchAdmins } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20
  },
  heading: {
    fontWeight: 100,
    fontSize: "1.6rem"
  }
}));


function Users({orghandle}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const firebase=useFirebase();
	const [adminUsers, setAdminUsers] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const admins = await fetchAdmins(orghandle)(firebase, dispatch);
			setAdminUsers(admins);
		  } catch (error) {
			console.error("Error fetching admins:", error);
		  }
		};
	
		fetchData();
	  }, [firebase, dispatch, orghandle]);


  const ContributersUsers = [
    {
      name: "Sarfraz Alam",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    },
    {
      name: "Jhanvi Thakkar",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    },
    {
      name: "Saksham Sharma",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    },
    {
      name: "Mehender boi",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    }
  ];


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
					<Orgusers
						Users={ContributersUsers}
						title="Contributers"
						description="Contributers can contribute to the project"
						AddUser={true}
						isViewMore={true}
						dataTestId="org-contributor-list"
						org_handle={orghandle}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);

}

export default Users;
