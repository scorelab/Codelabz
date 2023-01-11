import Avatar from "@mui/material/Avatar";
import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Content from "../../../../globalComponents/TabPanel/Content";
import Contents from "../../../../globalComponents/TabPanel/Contents";
import BaseTutorialsComponent from "../BaseTutorialsComponent";
import { Grid, Tab, Tabs, Typography } from "@mui/material";

const OrgTabPanel = ({ orgList, user }) => {
  const [listData, setListData] = React.useState([
    {
      name: user.displayName,
      image: user.photoURL,
      handle: user.userHandle
    }
  ]);

  const [selectedTab, setSelectedTab] = React.useState({
    tab: 0,
    data: listData[0]
  });

  const onSelectTab = index => setSelectedTab(index);

  useEffect(() => {
    setListData([
      {
        name: user.displayName,
        image: user.photoURL,
        handle: user.userHandle
      },
      ...orgList.map(org => ({
        name: org.org_name,
        image: org.org_image,
        handle: org.org_handle
      }))
    ]);
  }, [orgList]);

  return (
    <React.Fragment>
      <Grid container direction={"row"}>
        <Grid item xs={2}>
          <Tabs
            onChange={(event, newValue) =>
              onSelectTab({
                tab: newValue,
                data: listData[newValue]
              })
            }
            orientation="vertical"
            value={selectedTab.tab}
          >
            {listData.map((org, i) => (
              <Tab
                label={org.name}
                key={i}
                value={i}
                icon={<Avatar alt={org.name} src={org.image} />}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={10}>
          <BaseTutorialsComponent
            owner={selectedTab.data.handle}
            imageURL={selectedTab.data.image}
            ownerName={selectedTab.data.name}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const OrgTutorialsComponent = ({ organizations, user }) => {
  const org = useSelector(
    ({
      tutorials: {
        data: { org }
      }
    }) => org
  );
  const [orgData, setOrgData] = React.useState([]);

  useEffect(() => {
    if (org.length > 0) {
      const org_list = organizations.map(o => o.org_handle);

      const orgs_with_tutorials_count = org_list.map(org_handle => {
        return {
          org_handle,
          tutorials_count: org.filter(e => e.owner === org_handle).length
        };
      });

      const clone_orgs = _.clone(organizations);
      const merged_orgs = _.merge(clone_orgs, orgs_with_tutorials_count);
      const updated_orgs = _.reverse(
        _.sortBy(merged_orgs, ["tutorials_count"])
      );

      setOrgData(updated_orgs);
    }
  }, [organizations, org]);

  return <OrgTabPanel orgList={orgData} user={user} />;
};

export default OrgTutorialsComponent;
