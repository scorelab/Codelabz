import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TutorialCard from '../BaseTutorialsComponent/TutorialCard';

const SearchResultsComponent = ({ results }) => {
  return (
    <div>
      <Grid container item>
        <Divider variant="middle" />
        <Grid item justify="space-around" align="middle" xs>
          {'Search Results'}
        </Grid>
        <Divider variant="middle" />
        <Grid xs={12} justify="space-around" align="middle">
          {results.map((tutorial, index) => (
            <TutorialCard key={index} tutorialData={tutorial} loading={false} />
          ))}
          {results.length === 0 && 'No CodeLabz with the given query'}
        </Grid>
        <Divider variant="middle" />
      </Grid>
    </div>
  );
};

export default SearchResultsComponent;
