import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { useAllowDashboard } from "../../../../helpers/customHooks";
import useGetPermissions from "../../../../helpers/customHooks/useGetPermissions";
import AppsIcon from "@mui/icons-material/Apps";
import { IconButton, List, ListItem, Menu } from "@mui/material";
import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const useStyles = makeStyles(theme => ({
  menu: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(767)]: {
      flexDirection: "column"
    },
    marginTop: theme.spacing(5),
    borderRadius: "10px"
  }
}));

const LeftMenu = ({ mode, onClick }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const permissions = useGetPermissions();
	const allowDashboard = useAllowDashboard();
	let { pathname: location } = useLocation();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (matches) {
		return (
			<React.Fragment>
				<List>
					<ListItem>
						<NavLink to="/tutorials" onClick={onClick}>
							Tutorials
						</NavLink>
					</ListItem>
					{allowDashboard && (
						<ListItem key="my-code-feed">
							<NavLink to="/dashboard/my_feed" onClick={onClick}>
								My CodeFeed
							</NavLink>
						</ListItem>
					)}
					{allowDashboard && permissions.length > 0 && (
						<ListItem key="/organization">
							<NavLink to="/organization" onClick={onClick}>
								Organizations
							</NavLink>
						</ListItem>
					)}
				</List>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className={classes.menu}
				elevation={1}>
				<MenuItem key="/tutorials">
					<NavLink to="/tutorials">Tutorials</NavLink>
				</MenuItem>
				{allowDashboard && (
					<MenuItem key="my-code-feed">
						<NavLink to="/dashboard/my_feed">My CodeFeed</NavLink>
					</MenuItem>
				)}
				{allowDashboard && permissions.length > 0 && (
					<MenuItem key="/organization">
						<NavLink to="/organization">Organizations</NavLink>
					</MenuItem>
				)}
			</Menu>
		</React.Fragment>
	);
};

export default LeftMenu;
