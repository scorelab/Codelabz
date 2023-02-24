import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Highlights from "../../UserDetails/Highlights";
import SocialIcons from "../../Profile/SocialIcons/SocialIcons";
import EventsCard from "../../CardTabs/Events/index";

const useStyles = makeStyles((theme) => ({
	bottomMargin: {
		marginBottom: "10px",
	},
}));

const UserHighlights = ({ organizations }) => {
	const classes = useStyles();

	return (
		<div>
			<Grid className={classes.bottomMargin}>
				<Highlights
					Heading={"Credentials & Highlights"}
					CurrentJob={"Software Engineer at Appbeans 2021-Present"}
					Education={"Studying at Gl bajaj Institute of Technology, Delhi"}
					Languages={"Tamil, English, Hindi, Malayalam"}
					JoinedDate={"Joined December 2021"}
				/>
			</Grid>
			<Grid className={classes.bottomMargin}>
				<SocialIcons />
			</Grid>
			<Grid
				container
				alignContent="center"
				direction="column"
				style={{
					width: "100%",
				}}>
				<Grid item style={{ minWidth: "100%" }}>
					<EventsCard title={"Organizations"} events={organizations} />
				</Grid>
			</Grid>
		</div>
	);
};

export default UserHighlights;
