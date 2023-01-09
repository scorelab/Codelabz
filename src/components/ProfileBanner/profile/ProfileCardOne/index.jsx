import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Menu, MenuItem } from "@mui/material";

// import dp from "../../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../../assets/images/Filled3dots.svg";
import { Link } from "react-router-dom";

export default function ProfileCardOne({
	profileImage,
	name,
	story,
	followers,
	following,
}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<div
				className={classes.profileRightTop}
				data-testId="user_profile_card_one">
				<div className={classes.profileCover}>
					<div className={classes.profileInfo}>
						<div>
							<img
								className={classes.profileUserImg}
								src={profileImage}
								alt="Avatar"
								data-testId="user_profile_card_one_avatar"
							/>
						</div>
						<div className={classes.profileUserConnect}>
							<Grid container spacing={1}>
								<Grid item>
									<Typography
										className={classes.profileInfoName}
										data-testId="user_profile_card_one_name">
										{name}
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										className={classes.profileInfoStory}
										data-testId="user_profile_card_one_story">
										{story}
									</Typography>
								</Grid>
								<Grid item container direction="row">
									<Grid item>
										<span
											className={classes.profileInfoData}
											style={{ marginRight: "20px" }}
											data-testId="user_profile_card_one_follwerCount">
											{followers} followers
										</span>
									</Grid>
									<Grid item>
										<span
											className={classes.profileInfoData}
											style={{ marginRight: "2px" }}
											data-testId="user_profile_card_one_followingCount">
											{following} following
										</span>
									</Grid>
								</Grid>
								<Grid
									item
									container
									style={{ marginTop: "15px" }}
									data-testId="user_profile_card_one_buttonGroup">
									<button
										className={classes.profileSubscribeButton}
										data-testId="user_profile_card_one_buttonGroup_followButton">
										Follow
									</button>
									<button className={classes.profileShareButton}>Share</button>
									<button className={classes.profileReportButton}>
										Report
									</button>
									<button
										className={classes.profileIconButton}
										id="basic-button"
										aria-controls={open ? "basic-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
										onClick={handleClick}>
										<img src={iconbuttonImage} alt="iconbutton" />
									</button>
									<Menu
										id="basic-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "left",
										}}>
										<Link to="/user-dashboard/settings">
											<MenuItem onClick={handleClose}>User Settings</MenuItem>
										</Link>
									</Menu>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
