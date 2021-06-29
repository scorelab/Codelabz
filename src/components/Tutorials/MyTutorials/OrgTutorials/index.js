import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import Content from '../../../../globalComponents/TabPanel/Content';
import Contents from '../../../../globalComponents/TabPanel/Contents';
import Tab from '../../../../globalComponents/TabPanel/Tab';
import TabPanel from '../../../../globalComponents/TabPanel/TabPanel';
import Tabs from '../../../../globalComponents/TabPanel/Tabs';
import BaseTutorialsComponent from '../BaseTutorialsComponent';

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
    const [selectedTab, setSelectedTab] = React.useState(0);

    const onSelectTab = (index) => setSelectedTab(index);

    return (
      <TabPanel>
        <Tabs onSelect={onSelectTab}>
          <Tab
            label={user.displayName}
            key={0}
            icon={<Avatar alt={user.displayName} src={user.photoURL} />}
          />
          {orgList.map((org, index) => (
            <Tab
              key={index + 1}
              label={org.org_name}
              icon={<Avatar alt={org.org_name} src={org.org_image} />}
            />
          ))}
        </Tabs>
        <Contents active={selectedTab}>
          <Content key={0}>
            <BaseTutorialsComponent
              owner={user.userHandle}
              imageURL={user.photoURL}
              ownerName={user.displayName}
            />
          </Content>
          {orgList.map((org, index) => (
            <Content key={index + 1}>
              <BaseTutorialsComponent
                key={index}
                owner={org.org_handle}
                imageURL={org.org_image}
                ownerName={org.org_name}
              />
            </Content>
          ))}
        </Contents>
      </TabPanel>
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
    const updated_orgs = _.reverse(_.sortBy(merged_orgs, ['tutorials_count']));

    return <OrgTabPanel orgList={updated_orgs} />;
  } else {
    return <OrgTabPanel orgList={organizations} />;
  }
};

export default OrgTutorialsComponent;
