import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Orgusers from "../OrgUsers/OrgUsers";
import AddContributor from "../OrgUsers/AddNewUser/addNewContributorModal";
import AddAdmin from "../OrgUsers/AddNewUser/addNewAdminModal";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	heading: {
		fontWeight: 100,
		fontSize: "1.6rem",
	},
}));


function Users() {
	const classes = useStyles();
	const [modalOpenAdmin, setModalOpenAdmin] = useState(false);
	const[modalOpenContr, setModalOpenContr]=useState(false);

	const closeContriModal=()=>{
		setModalOpenContr(false);
	}
  const handleAddContri=()=>{
	setModalOpenContr(false);
	
  }
	const closeModal = () => {
	  setModalOpenAdmin(false);
	};
  
	const handleAddAdmin = (userName) => {
	

	 
	  console.log("Adding admin with username:", userName);
	  setModalOpenAdmin(false)
	};
	
	const AdminUsers = [
		{
			name: "Shahaab Manzar",
			designation: "GSoC 22'",
			avatar: {
				type: "char",
				value: "A",
			},
		},
		{
			name: "Sarfraz Alam",
			designation: "GSoC 22'",
			avatar: {
				type: "image",
				value: "https://i.pravatar.cc/300",
			},
		},
	];

	const ContributersUsers = [
		{
			name: "Sarfraz Alam",
			designation: "GSoC 22'",
			avatar: {
				type: "image",
				value: "https://i.pravatar.cc/300",
			},
		},
		{
			name: "Jhanvi Thakkar",
			designation: "GSoC 22'",
			avatar: {
				type: "image",
				value: "https://i.pravatar.cc/300",
			},
		},
		{
			name: "Saksham Sharma",
			designation: "GSoC 22'",
			avatar: {
				type: "image",
				value: "https://i.pravatar.cc/300",
			},
		},
		{
			name: "Mehender boi",
			designation: "GSoC 22'",
			avatar: {
				type: "image",
				value: "https://i.pravatar.cc/300",
			},
		},
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
					<Orgusers
						Users={AdminUsers}
						title="Admin"
						description="Admins can manage submissions, content, and settings"
						AddUser={true}
						dataTestId="org-admin-list"	
						buttonTitle="Add Admin"
						addButton={()=>{setModalOpenAdmin(true)}}
						modalComponent={  <AddAdmin open={modalOpenAdmin} onClose={closeModal} onSubmit={handleAddAdmin} />}
						
					/>
				</Grid>
				<Grid item>
					<Orgusers
						Users={ContributersUsers}
						title="Contributers"
						description="Contributers can contribute to the project"
						AddUser={true}
						isViewMore={true}
						dataTestId="org-contributor-list"	
						buttonTitle="Add Contributor"
						addButton={()=>{setModalOpenContr(true)}}
					
					   modalComponent={<AddContributor modalopen={modalOpenContr} onClose={closeContriModal} onSubmit={handleAddContri}/>}
						
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default Users;
