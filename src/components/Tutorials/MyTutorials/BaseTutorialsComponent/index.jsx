import Grid from "@mui/material/Grid";
import React from "react";
import { useSelector } from "react-redux";
import EmptyTutorials from "../../../../helpers/emptyTutorials";
import Spinner from "../../../../helpers/spinner";
import TutorialCard from "./TutorialCard";

/**
 * @param {string} owner - Owner of the tutorials
 * @param {string} imageURL - Profile image of the owner of the tutorials
 * @param {string} ownerName - Name of the owner of the tutorials
 * @returns {JSX.Element}
 * @constructor
 */
const BaseTutorialsComponent = ({ owner = "", ownerName = "", users = [] }) => {
  let user = useSelector(
    ({
      tutorials: {
        data: { user }
      }
    }) => user
  );
  const org = useSelector(
    ({
      tutorials: {
        data: { org }
      }
    }) => org
  );
  if (!user) user = users;
  if (user) {
    const index = [...user, ...org];

    const index_array = index.filter(e => e.owner === owner);
<<<<<<< HEAD

    return (
      <div>
        <Grid container item>
          {index_array.map((tutorial, index) => (
=======
    console.log(index, index_array);
    return (
      <div>
        <Grid container item>
          {index_array[0]?.tutorials?.map((tutorial, index) => (
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
            <Grid
              xs={12}
              sm={6}
              md={3}
              lg={2}
              xl={2}
              className="mb-8 mr-8 mt-8 ml-8"
            >
              <TutorialCard
                key={index}
                tutorialData={tutorial}
                loading={false}
              />
            </Grid>
          ))}
          {index_array.length === 0 && (
<<<<<<< HEAD
            <EmptyTutorials org={ownerName} orgHandle={owner} />
=======
            <Grid
              xs={12}
              sm={6}
              md={3}
              lg={2}
              xl={2}
              className="mb-8 mr-8 mt-8 ml-8"
            >
              <EmptyTutorials org={ownerName} orgHandle={owner} />
            </Grid>
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
          )}
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
