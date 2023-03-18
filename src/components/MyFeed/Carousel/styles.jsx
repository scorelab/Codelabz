import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	slides: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		zIndex: "2",
		boxSizing: "border-box",
	},
	image: {
		height: "20rem",
		width: "20rem",
	},
	slide: {},
	slideActive: {},
	slideContainer: {
		width: 900,
		overflow: "hidden",
		display: "flex",
		height: 500,
	},
	root: {
		boxShadow: "0rem 2rem 2rem gray",
		height: 445,
		zIndex: "2",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "column",
		transform: "scale(0.8)",
	},
	rootAnim: {
		animation: "$myEffectRoot 1000ms",
	},
	rootLeft: {
		maxWidth: 300,
		animation: "$myEffect 1200ms",
		height: 345,
		minWidth: 280,
		zIndex: "-1",
		position: "relative",
		left: "60%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		filter: "brightness(0.74) blur(2px)",
	},
	rootRight: {
		maxWidth: 300,
		animation: "$myEffect 1200ms",
		height: 345,
		minWidth: 280,
		zIndex: "-1",
		position: "relative",
		right: "60%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		filter: "brightness(0.74) blur(2px)",
	},
	media: {
		height: 140,
	},
	arrow: {
		"&:hover": {
			transform: "scale(1.2,1.2)",
		},
	},
	"@keyframes myEffect": {
		"0%": {
			opacity: 1,

			transform: "scale(.6,.6) ",
		},
		"100%": {
			opacity: 1,
			transform: "scale(1,1) rotateY(0)",
		},
	},
	"@keyframes myEffectRoot": {
		"0%": {
			opacity: 1,

			transform: "scale(.6,.6) rotateY(-100deg)",
		},
		"100%": {
			opacity: 1,
			transform: "scale(1,1) rotateY(0)",
		},
	},
}));

export default useStyles;
