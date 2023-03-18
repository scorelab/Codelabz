import Grid from "@mui/material/Grid";
import React from "react";
import BrandName from "./brandName";

const Spinner = ({ half }) => {
	return (
		<Grid
			justify={"center"}
			style={{ minHeight: half ? "50vh" : "100vh" }}
			alignItems="center"
			container>
			<Grid item xs={12} sx={{ textAlign: "center" }}>
				<div className="pulse">
					<BrandName />
				</div>
			</Grid>
			<Grid item />
		</Grid>
	);
};

export default Spinner;
