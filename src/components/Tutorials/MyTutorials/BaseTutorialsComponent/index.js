import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import EmptyTutorials from '../../../../helpers/emptyTutorials';
import Spinner from '../../../../helpers/spinner';
import TutorialCard from './TutorialCard';

/**
 * @param {string} owner - Owner of the tutorials
 * @param {string} imageURL - Profile image of the owner of the tutorials
 * @param {string} ownerName - Name of the owner of the tutorials
 * @returns {JSX.Element}
 * @constructor
 */
const BaseTutorialsComponent = ({ owner, ownerName }) => {
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

  if (user) {
    const index = [...user, ...org];

    const index_array = index.filter((e) => e.owner === owner);

    return (
      <div>
        <Grid container>
          <Grid justify="center" alignItems="center">
            {index_array.map((tutorial, index) => (
              <TutorialCard
                key={index}
                tutorialData={tutorial}
                loading={false}
              />
            ))}
            {index_array.length === 0 && (
              <EmptyTutorials org={ownerName} orgHandle={owner} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <Grid justify="center" align="center">
        <Grid xs={12} className="col-pad-24">
          <Spinner half />
        </Grid>
      </Grid>
    );
  }
};

export default BaseTutorialsComponent;
