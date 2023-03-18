import React from "react";
import BaseTutorialsComponent from "../BaseTutorialsComponent";

const UserTutorialsComponent = ({ userHandle, photoURL, displayName }) => {
  return (
    <div>
      <BaseTutorialsComponent
        owner={userHandle}
        imageURL={photoURL}
        ownerName={displayName}
      />
    </div>
  );
};

export default UserTutorialsComponent;
