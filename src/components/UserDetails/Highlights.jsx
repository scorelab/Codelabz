import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Input, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "block",
    maxHeight: "100%"
  },
  info: {
    display: "block"
  },
  head: {
    fontWeight: "medium",
    marginBottom: "5px"
  }
}));

function Highlights(props) {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save edited data
    // You can add your logic here to save the edited data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ backgroundColor: props.backgroundColor }}>
        <ThemeProvider theme={theme}>
          <div style={{display:'flex', justifyContent: 'space-between'}}>          
          <Typography className={classes.head} variant="h5" component="h2" data-testId="HighlightsHeading">
            {isEditing ? (
              <Input name="Heading" value={props.Heading} onChange={handleChange} />
            ) : (
              props.Heading
            )}
          </Typography>
          <IconButton
            onClick={handleEdit}
          >
            <EditIcon />
          </IconButton>
          </div>
          <Typography variant="body2" component="p" data-testId="HighlightsCurrentJob">
            {isEditing ? (
              <Input name="CurrentJob" value={props.CurrentJob} onChange={handleChange} />
            ) : (
              props.CurrentJob
            )}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsEducation">
            {isEditing ? (
              <Input name="Education" value={props.Education} onChange={handleChange} />
            ) : (
              props.Education
            )}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsLanguages">
            {isEditing ? (
              <Input name="Languages" value={props.Languages} onChange={handleChange} />
            ) : (
              props.Languages
            )}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsJoinedDate">
            {isEditing ? (
              <Input name="JoinedDate" value={props.JoinedDate} onChange={handleChange} />
            ) : (
              props.JoinedDate
            )}
          </Typography>
          {isEditing && (
            <button onClick={handleSave} style={{marginTop:'1.5vmin'}}>Save</button>
          )}
        </ThemeProvider>
      </CardContent>
    </Card>
  );
}
export default Highlights;
