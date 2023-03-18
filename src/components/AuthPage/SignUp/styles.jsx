import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		border: "1px solid #cccccc",
		boxShadow: "none",
		maxWidth: "520px",
		[theme.breakpoints.down(750)]: {
			border: "none",
			boxShadow: "none",
		},
	},
}));

export default useStyles;
