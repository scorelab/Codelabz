import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Grid,
	Box,
	Button,
	Divider,
	DialogTitle,
	Dialog,
	DialogContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReactCrop from "react-image-crop";

const useStyles = makeStyles((theme) => ({
	ProfilePhoto: {
		boxShadow: "none",
		borderColor: "white",
	},
}));

/**
 * @description - This component is used to Update the profile photo of the user/organization.
 * @param {open} If the dialog is open or not
 * @param {onClose} Function to close the dialog
 * @param {saveImage} Function to save the image
 * @returns
 */
export default function ChangeProfile({ open, saveImage, onClose }) {
	const classes = useStyles();

	const [upImg, setUpImg] = useState();
	const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 16 });
	const imgRef = useRef(null);
	const ReactCropRef = useRef(null);
	const fileUploadRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [completedCrop, setCompletedCrop] = useState(null);

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	const UpdateImage = useCallback(
		function (canvas) {
			previewCanvasRef.current.width = completedCrop?.width;
			previewCanvasRef.current.height = completedCrop?.height;
			canvas.clearRect(
				0,
				0,
				previewCanvasRef.current.width,
				previewCanvasRef.current.height
			);
			const relativeX =
				(completedCrop?.x * upImg.width) / ReactCropRef.current.imageRef.width;
			const relativeY =
				(completedCrop?.y * upImg.height) /
				ReactCropRef.current.imageRef.height;
			const relativeWidth =
				((completedCrop?.width + 10) * upImg.width) /
				ReactCropRef.current.imageRef.width;
			const relativeHeight =
				((completedCrop?.height + 10) * upImg.width) /
				ReactCropRef.current.imageRef.height;
			canvas.drawImage(
				upImg,
				relativeX,
				relativeY,
				relativeWidth,
				relativeHeight,
				0,
				0,
				completedCrop?.width,
				completedCrop?.height
			);
		},
		[
			completedCrop?.height,
			completedCrop?.width,
			completedCrop?.x,
			completedCrop?.y,
			upImg,
		]
	);

	const onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const image = new Image();
				image.src = reader.result;
				image.onload = () => {
					setUpImg(image);
				};
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	useEffect(() => {
		if (upImg && previewCanvasRef) {
			const context = previewCanvasRef.current.getContext("2d");

			UpdateImage(context);
		}
	}, [completedCrop, upImg, UpdateImage]);

	return (
		<Dialog
			fullWidth
			maxWidth="md"
			open={open}
			onClose={onClose}
			data-testId="changeOrgImgDialog">
			<DialogTitle id="alert-dialog-title">
				<span
					style={{
						fontSize: "1.3em",
						fontWeight: "480",
					}}>
					{"Change Profile Picture"}
				</span>
			</DialogTitle>
			<DialogContent>
				<div className="App">
					<div>
						<Divider />
						<Button
							variant="outlined"
							disableElevation
							color="primary"
							className={classes.ProfilePhoto}
							style={{
								width: "100%",
							}}
							onClick={() => fileUploadRef.current.click()}>
							Click here to select an image from your device
						</Button>
						<input
							id="file-upload"
							fullWidth
							style={{
								display: "none",
							}}
							accept="image/*"
							ref={fileUploadRef}
							type="file"
							onChange={onSelectFile}
						/>
						<Divider />
					</div>
					<div>
						<Grid
							container
							direction="row"
							spacing={3}
							justifyContent="space-evenly">
							<Grid item xs={5}>
								<ReactCrop
									src={upImg?.src}
									ref={ReactCropRef}
									onImageLoaded={onLoad}
									crop={crop}
									onChange={(c) => setCrop(c)}
									onComplete={(c) => setCompletedCrop(c)}
								/>
							</Grid>
							<Grid
								item
								container
								alignContent="center"
								xs={5}
								justifyContent="center">
								<canvas
									ref={previewCanvasRef}
									style={{
										borderRadius: "50%",
									}}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row-reverse">
							<Grid xs={6} md={6} lg={6} item={true}>
								<Box mt={0} mb={4} m={1}>
									<Button
										fullWidth
										size="small"
										variant="contained"
										color="primary"
										disableElevation
										onClick={() =>
											saveImage(previewCanvasRef.current, completedCrop)
										}>
										Save
									</Button>
								</Box>
							</Grid>
							<Grid xs={6} md={6} lg={6} item={true}>
								<Box mt={0} mb={4} m={1}>
									<Button
										fullWidth
										size="small"
										variant="contained"
										color="secondary"
										disableElevation
										onClick={onClose}>
										Close
									</Button>
								</Box>
							</Grid>
						</Grid>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
