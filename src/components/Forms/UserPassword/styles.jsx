import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: "none",
		padding: "20px 40px",
		border: "1px solid #e8e8e8",
		borderRadius: 15,
		width: "95%",
		"@media (max-width: 960px)": {
			width: "100%",
			padding: "10px 5px",
		},
	},
	input: {
		marginRight: 10,
		width: 250,
		backgroundColor: "#F9F9F9",
		borderRadius: 6,
		"& input": {
			padding: "18px !important",
		},
	},
	button: {
		backgroundColor: "#F9F9F9",
		border: "1px solid #D2D2D2",
		textTransform: "none",
		height: 35,
		width: 175,
		margin: "15px 0",
	},
	row: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		margin: "5px 0",
		"@media (max-width: 400px)": {
			fontSize: 13,
		},
	},
}));

export default useStyles;
