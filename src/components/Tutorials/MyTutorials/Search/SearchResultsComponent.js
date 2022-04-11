import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TutorialCard from '../BaseTutorialsComponent/TutorialCard';

const SearchResultsComponent = ({ results }) => {
  return (
    <div>
      <Grid container item justifyContent="center">
        <Divider variant="middle" />
        <Grid item xs={12}>
          <Typography align="center"> Search Results</Typography>
        </Grid>
        <Divider variant="middle" />
        {results.map((tutorial, index) => (
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2} className="pr-24">
            <TutorialCard key={index} tutorialData={tutorial} loading={false} />
          </Grid>
        ))}
        {results.length === 0 && 'No CodeLabz with the given query'}

        <Divider variant="middle" />
      </Grid>
    </div>
  );
};

export default SearchResultsComponent;
