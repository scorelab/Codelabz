import { Grid, Card, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import useStyles from "./styles";
import { notifications } from "./notifications";
import { useState, useRef } from "react";
import { blue } from "@mui/material/colors";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 220,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NotificationBox = ({ notification }) => {
  const classes = useStyles();
  const anchorRef = useRef();

  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = () => setOpenModal(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRead = () => {
    notification.isRead = true;
    handleClose();
  };
  const handleDelete = id => {
    notifications.filter(notification => id != notification.id);
  };
  return (
    <>
      <Card
        className={classes.Notification}
        style={{
          backgroundColor: notification.isRead ? "#fff" : blue[50],
          borderRadius: "16px"
        }}
      >
        {!notification.isRead && <Box className={classes.unread}></Box>}
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          data-testId="UserAvatar"
          sx={{
            width: "60px",
            height: "60px"
          }}
        >
          S
        </Avatar>
        <Box
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Typography>
            <span style={{ fontWeight: "600" }}>{notification.username}</span>{" "}
            from <span style={{ fontWeight: "600" }}>Codelabz</span>
          </Typography>
          <Typography className={classes.time}>
            {notification.timestamp}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>
            {notification.message.length > 200 ? `${notification.message.substring(0, 200)}....` : notification.message}
          </Typography>
        </Box>
        <div>
          <IconButton
            ref={anchorRef}
            onClick={() => {
              setOpen(true);
            }}
            aria-label="share"
            data-testId="MoreIcon"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <MoreHorizOutlinedIcon />
          </IconButton>
          <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose}>
            <MenuItem onClick={handleRead}>Mark as read</MenuItem>
            <MenuItem onClick={() => handleDelete(notification.id)}>
              Delete
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Block {notification.username}
            </MenuItem>
          </Menu>
        </div>
      </Card>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                data-testId="UserAvatar"
                sx={{
                  width: "60px",
                  height: "60px"
                }}
              >
                S
              </Avatar>
            </Grid>

            <Grid item xs={12} md={10} style={{ marginTop: "10px" }}>
              <Typography>
                <span style={{ fontWeight: "600" }}>{notification.username}</span>{" "}
                from <span style={{ fontWeight: "600" }}>Codelabz</span>
              </Typography>
              <Typography className={classes.time}>
                {notification.timestamp}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleModalClose}
                style={{ position: 'absolute', top: '30px', right: '25px' }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} >
              <div style={{ maxHeight:"300px", overflowY: "auto", }}>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {notification.message}
              </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    </>
  );
};

export default NotificationBox;
