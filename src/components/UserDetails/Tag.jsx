import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import {
    Button,    
  } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
		[theme.breakpoints.down("xs")]: {
			width: "95%",
		},
	},
	head: {
		fontWeight: "medium",
		marginBottom: "5px",
	},
}));

function Tag({ Heading, backgroundColor, Content }) {
	const classes = useStyles();
	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	// Check if Content is empty
	if (!Content) {
		// Handle the case when Content is empty, you can return null or handle it accordingly
		return null;
	}

	// Split the string into an array using commas as the delimiter
	const contentArray = Content.split(',');

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent style={{ backgroundColor: backgroundColor }}>
				<ThemeProvider theme={theme}>
					<Typography
						className={classes.head}
						variant="h5"
						component="h2"
						data-testId="DescriptionHeading">
						{Heading}
					</Typography>
					{contentArray.map((item, index) => (
						<Button
							key={index}
							variant="outline"
							color="primary"
							style={{
								boxShadow: "none",
								borderRadius: "25px",
								border: 0,
								backgroundColor: theme.palette.grey[200],
								padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
								margin: `${theme.spacing(1)}px`,
								margin: "3px",
							}}
							component="p"
							data-testId={`DescriptionContent_${index}`}
						>
							{item.trim()} {/* Trim to remove any leading/trailing spaces */}
						</Button>
					))}
				</ThemeProvider>
			</CardContent>
		</Card>
	);
}

export default Tag;