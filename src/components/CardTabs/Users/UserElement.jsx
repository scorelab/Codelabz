import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddUser from "../../../assets/images/add-user.svg";
import CheckUser from "../../../assets/images/square-check-regular.svg";


const UserElement = ({ user, index, useStyles }) => {
  const classes = useStyles();
  const [icon, setIcon] = useState(true);
  const [confirming, setConfirming] = useState(false);

  const handleIconClick = () => {
    if (!confirming) {
      // If icon is CheckUser, enable confirmation
      setConfirming(true);
    } else {
      // If icon is AddUser, toggle the icon immediately
      setIcon(!icon);
    }
  };

  const handleConfirm = () => {
    // Perform any action you want on confirmation
    // For now, just toggle the icon
    setIcon(!icon);
    setConfirming(!confirm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        key: "user" + { index },
        mb: 1.5,
      }}
      gutterBottom
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={user.img[0]}
          className={classes.userImg}
          data-testId={index === 0 ? "UsersCardImg" : ""}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{ fontWeight: 600, fontSize: "1rem" }}
            data-testId={index === 0 ? "UserName" : ""}
          >
            {user.name}
          </Box>
          <Box
            sx={{ fontWeight: 400, fontSize: "0.8rem" }}
            data-testId={index === 0 ? "UserDesg" : ""}
          >
            {user.desg}
          </Box>
        </Box>
      </Box>

      <Box
        onClick={handleIconClick}
        data-testId={index === 0 ? "UserAdd" : ""}
        sx={
          {
            cursor: "pointer",
          }
        }
      >
        {confirming ? (
          <div className="modal"
          style={
            {
              width: "5rem",
              marginLeft: "-30px",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "1rem",
              gap: "0.5rem",
              textAlign: "left",
              display: "flex",
            }
          }>
            <span>Confirm</span>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={() => setConfirming(true)}>No</button>
          </div>
        ) : (
          <img src={icon ? AddUser : CheckUser} />
        )}
      </Box>
    </Box>
  );
};

export default UserElement;
