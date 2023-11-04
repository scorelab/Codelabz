import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		border: "1px solid #cccccc",
		boxShadow: "none",
		[theme.breakpoints.down(750)]: {
			minWidth: "90vw",
			border: "none",
			boxShadow: "none",
		},
	},
	forgotPassword: {
		color: "blue",
		textDecoration: "none", 
		"&:hover": {
		  textDecoration: "underline", 
		},
	},
}));

export default useStyles;
