import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
		[theme.breakpoints.down("xs")]: {
			width: "95%",
		},
		[theme.breakpoints.up("md")]: {
			width: "50%",
		},
	},
	head: {
		fontWeight: "medium",
		marginBottom: "5px",
	},
}));

function AboutUsers({ backgroundColor, Heading, Content, className }) {
	const classes = useStyles();
	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	return (
		<Card className={className || classes.root} variant="outlined">
			<CardContent style={{ backgroundColor: backgroundColor }}>
				<ThemeProvider theme={theme}>
					<Typography className={classes.head} variant="h5" component="h2">
						{Heading}
					</Typography>
					<Typography variant="body2" component="p">
						{Content}
					</Typography>
				</ThemeProvider>
			</CardContent>
		</Card>
	);
}
export default AboutUsers;
