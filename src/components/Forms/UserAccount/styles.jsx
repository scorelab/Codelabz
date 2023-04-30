import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: "none",
		padding: "25px 25px",
		border: "1px solid #e8e8e8",
		borderRadius: 15,
		width: "95%",
		"@media (max-width: 960px)": {
			width: "100%",
			padding: "15px 15px",
		},
	},
	row: {
		display: "flex",
		alignItems: "center",
		marginBottom: 10,
	},
	text: {
		"@media (max-width: 400px)": {
			fontSize: 13,
		},
	},
}));

export default useStyles;
