import React from "react";
import BaseTutorialsComponent from "../BaseTutorialsComponent";
import { useSelector } from "react-redux";
import _ from "lodash";

const OrgTutorialsComponent = ({ organizations }) => {
  const org_list = organizations.map(o => o.org_handle);
  const org = useSelector(
    ({
      tutorials: {
        data: { org }
      }
    }) => org
  );

  if (org.length > 0) {
    const orgs_with_tutorials_count = org_list.map(org_handle => {
      return {
        org_handle,
        tutorials_count: org.filter(e => e.owner === org_handle).length
      };
    });

    const clone_orgs = _.clone(organizations);
    const merged_orgs = _.merge(clone_orgs, orgs_with_tutorials_count);
    const updated_orgs = _.reverse(_.sortBy(merged_orgs, ["tutorials_count"]));

    return (
      <>
        {updated_orgs.map((org, index) => (
          <BaseTutorialsComponent
            key={index}
            owner={org.org_handle}
            imageURL={org.org_image}
            ownerName={org.org_name}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        {organizations.map((org, index) => (
          <BaseTutorialsComponent
            key={index}
            owner={org.org_handle}
            imageURL={org.org_image}
            ownerName={org.org_name}
          />
        ))}
      </>
    );
  }
};

export default OrgTutorialsComponent;
