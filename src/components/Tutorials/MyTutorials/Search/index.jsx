import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchFromTutorialsIndex } from "../../../../store/actions";
import NewTutorial from "../../NewTutorial";
import SearchResultsComponent from "./SearchResultsComponent";

const SearchComponent = () => {
	const [results, setResults] = useState([]);
	const [viewResults, setViewResults] = useState(false);
	const [indexData, setIndexData] = useState([]);
	const [visibleModal, setVisibleModal] = useState(false);

	const user = useSelector(
		({
			tutorials: {
				data: { user },
			},
		}) => user
	);

	const org = useSelector(
		({
			tutorials: {
				data: { org },
			},
		}) => org
	);

	useEffect(() => {
		if (user && org) {
			setIndexData([...user, ...org]);
		}
	}, [user, org]);

	const handleOnSearch = ({ target: { value } }) => {
		if (value === "") {
			return setViewResults(false);
		}
		const result = searchFromTutorialsIndex(value);
		if (result.length === 0) {
			setViewResults(true);
			return setResults([]);
		}
		if (result.length > 0) {
			let tempArray = [];
			result.forEach((item) => {
				tempArray = [
					...tempArray,
					..._.filter(indexData, (ref) => ref.tutorial_id === item.ref),
				];
			});
			setViewResults(true);
			return setResults(tempArray);
		}
	};

	const closeModal = () => {
		setVisibleModal((prev) => !prev);
	};
	return (
		<Grid container item justify="space-between" data-testId="tutorialSearch">
			<Grid xs={12} md={3} className="col-pad-24">
				<Button
					variant="contained"
					onClick={() => setVisibleModal(true)}
					color="primary"
					startIcon={<Add />}
					data-testId="tutorialAddNewButton"
					style={{ backgroundColor: "royalblue" }}>
					Add New CodeLabz
				</Button>
				<NewTutorial
					viewModal={visibleModal}
					onSidebarClick={(e) => closeModal(e)}
				/>
			</Grid>
			<Grid xs={12} md={4} className="col-pad-24">
				<TextField
					placeholder="Search CodeLabz by title, summary, or owner"
					onKeyUp={handleOnSearch}
					style={{ width: "100%" }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Search />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			{viewResults && (
				<Grid xs={12} className={"mb-24 "}>
					<SearchResultsComponent results={results} />
				</Grid>
			)}
		</Grid>
	);
};

export default SearchComponent;
