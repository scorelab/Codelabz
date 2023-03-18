import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dp from "../../../../assets/images/demoperson1.jpeg";

export default function ProfileCardTwo({
	profileImage,
	name,
	followers,
	contributors,
}) {
	const classes = useStyles();
	return (
		<>
			<div
				className={classes.profileRightTop}
				data-testId="user_profile_card_two">
				<div className={classes.profileCover}>
					<div className={classes.profileInfo}>
						<div>
							<img
								className={classes.profileUserImg}
								src={profileImage}
								data-testId="user_profile_card_two_avatar"
							/>
						</div>
						<div style={{ width: "fit-content", marginLeft: "2.5rem" }}>
							<Typography
								className={classes.profileInfoName}
								data-testId="user_profile_card_two_name">
								{name}
							</Typography>
							<Typography className={classes.profileInfoStory}>
								Add Profile Credentials
							</Typography>
							<Grid container>
								<span
									className={classes.profileInfoData}
									style={{ marginRight: "20px" }}
									data-testId="user_profile_card_two_contributorCount">
									{contributors} Contributors
								</span>
								<span
									className={classes.profileInfoData}
									style={{ marginRight: "2px" }}
									data-testId="user_profile_card_two_followerCount">
									• {followers} followers
								</span>
							</Grid>
							<Typography className={classes.profileInfoStory}>
								Write a description about yourself
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
