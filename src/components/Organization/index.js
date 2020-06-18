import React from "react";
import OrgSidebar from "./orgSidebar";

const Organizations = () => {
  return (
    <div className="row-footer-below">
      <div className="org-list-panel">
        <OrgSidebar />
      </div>
      <div className="org-data-panel"></div>
    </div>
  );
};

export default Organizations;
