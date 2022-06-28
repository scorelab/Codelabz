import React from 'react';
import Box from '@material-ui/core/Box';
import { alpha, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";

const Input = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#fff',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Roboto',
        "Helvetica", "Arial", 'sans-serif'
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  

const UserForm = () => {

  const classes = useStyles();

  return (
    <Card style={{ padding: "20px" }} className={classes.root}>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <FormControl variant="standard" style={{ marginRight: "25px" }}>
            <InputLabel shrink htmlFor="bootstrap-input" style={{color:"#000", fontWeight:"bold", fontSize:"17px"}}>
              Name
            </InputLabel>
            <Input defaultValue="name" id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" className={classes.usernameField}>
            <InputLabel shrink htmlFor="bootstrap-input" style={{color:"#000", fontWeight:"bold", fontSize:"17px"}}>
              Username
            </InputLabel>
            <Input defaultValue="@username" id="bootstrap-input" />
          </FormControl>
        </Box>
        <FormControl variant="standard" style={{ marginTop: "10px" }}>
          <InputLabel shrink htmlFor="bootstrap-input" style={{color:"#000", fontWeight:"bold", fontSize:"17px"}}>
            Email (Primary)
          </InputLabel>
          <Input defaultValue="xyz@gmail.com" id="bootstrap-input" />
          <Typography style={{color: "#0075AD", marginTop: "10px"}}>Add another Email address</Typography>
        </FormControl>
        <FormControl variant="standard" style={{ marginTop: "10px" }}>
          <InputLabel shrink htmlFor="bootstrap-input" style={{color:"#000", fontWeight:"bold", fontSize:"17px"}}>
            Country of residence
          </InputLabel>
          <Input defaultValue="Select Country" id="bootstrap-input" />
        </FormControl>
      </Box>
    </Card>
  )
}

export default UserForm
