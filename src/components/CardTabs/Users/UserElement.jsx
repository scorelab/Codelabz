import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddUser from "../../../assets/images/add-user.svg";
import CheckUser from "../../../assets/images/square-check-regular.svg";

const UserElement = ({ user, index, useStyles }) => {
  const classes = useStyles();
  const [icon, setIcon] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isFollowing = await user.onClick.isUserFollower();
        setIcon(!isFollowing);
      } catch (error) {
        console.error("Error fetching follower status:", error);
      }
    };
    fetchData();
  }, [icon]);
  const handleUserClick = async event => {
    event.preventDefault();
    try {
      let isFollowing = await user.onClick.isUserFollower();
      if (isFollowing) {
        await user.onClick.removeUserFollower();
      } else {
        await user.onClick.addUserFollower();
      }
      setIcon(isFollowing);
    } catch (error) {
      console.error("Error toggling follower status:", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        key: "user" + { index },
        mb: 1.5
      }}
      gutterBottom
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        <img
          src={user.img[0]}
          className={classes.userImg}
          data-testId={index == 0 ? "UsersCardImg" : ""}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{ fontWeight: 600, fontSize: "1rem" }}
            data-testId={index == 0 ? "UserName" : ""}
          >
            {user.name}
          </Box>
          <Box
            sx={{ fontWeight: 400, fontSize: "0.8rem" }}
            data-testId={index == 0 ? "UserDesg" : ""}
          >
            {user.desg}
          </Box>
        </Box>
      </Box>
      <Box
        onClick={handleUserClick}
        data-testId={index == 0 ? "UserAdd" : ""}
        sx={icon && { cursor: "pointer" }}
      >
        <img src={icon ? AddUser : CheckUser} />
      </Box>
    </Box>
  );
};

export default UserElement;
