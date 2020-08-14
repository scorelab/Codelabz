import React from "react";
import BaseTutorialsComponent from "../BaseTutorialsComponent";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Tabs, Avatar } from "antd";
const { TabPane } = Tabs;

const OrgTutorialsComponent = ({ organizations, user }) => {
  const org_list = organizations.map((o) => o.org_handle);
  const org = useSelector(
    ({
      tutorials: {
        data: { org },
      },
    }) => org
  );

  const OrgTabPanel = ({ orgList }) => {
    return (
      <Tabs defaultActiveKey="0" tabPosition="left">
        <TabPane
          tab={
            <>
              <Avatar size={35} src={user.photoURL} className="mr-8" />
              {user.displayName}
            </>
          }
          key={0}
        >
          <BaseTutorialsComponent
            owner={user.userHandle}
            imageURL={user.photoURL}
            ownerName={user.displayName}
          />
        </TabPane>
        {orgList.map((org, index) => (
          <TabPane
            tab={
              <>
                <Avatar size={35} src={org.org_image} className="mr-8" />
                {org.org_name}
              </>
            }
            key={index + 1}
          >
            <BaseTutorialsComponent
              key={index}
              owner={org.org_handle}
              imageURL={org.org_image}
              ownerName={org.org_name}
            />
          </TabPane>
        ))}
      </Tabs>
    );
  };

  if (org.length > 0) {
    const orgs_with_tutorials_count = org_list.map((org_handle) => {
      return {
        org_handle,
        tutorials_count: org.filter((e) => e.owner === org_handle).length,
      };
    });

    const clone_orgs = _.clone(organizations);
    const merged_orgs = _.merge(clone_orgs, orgs_with_tutorials_count);
    const updated_orgs = _.reverse(_.sortBy(merged_orgs, ["tutorials_count"]));

    return <OrgTabPanel orgList={updated_orgs} />;
  } else {
    return <OrgTabPanel orgList={organizations} />;
  }
};

export default OrgTutorialsComponent;
