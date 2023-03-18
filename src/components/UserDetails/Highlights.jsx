import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "block",
		maxHeight: "100%",
	},
	info: {
		display: "block",
	},
	head: {
		fontWeight: "medium",
		marginBottom: "5px",
	},
}));

function Highlights(props) {
	const classes = useStyles();
	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent style={{ backgroundColor: props.backgroundColor }}>
				<ThemeProvider theme={theme}>
					<Typography
						className={classes.head}
						variant="h5"
						component="h2"
						data-testId="HighlightsHeading">
						{props.Heading}
					</Typography>
					<Typography
						variant="body2"
						component="p"
						data-testId="HighlightsCurrentJob">
						{props.CurrentJob}
					</Typography>
					<Typography
						variant="body2"
						component="p"
						data-testId="HighlightsEducation">
						{props.Education}
					</Typography>
					<Typography
						variant="body2"
						component="p"
						data-testId="HighlightsLanguages">
						{props.Languages}
					</Typography>
					<Typography
						variant="body2"
						component="p"
						data-testId="HighlightsJoinedDate">
						{props.JoinedDate}
					</Typography>
				</ThemeProvider>
			</CardContent>
		</Card>
	);
}
export default Highlights;
