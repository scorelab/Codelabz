import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import BaseTutorialsComponent from '../BaseTutorialsComponent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%', margin: '5px' }}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    height: '100px',
  },
}));

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
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab
            label={user.displayName}
            {...a11yProps(0)}
            className={classes.tab}
            icon={<Avatar alt={user.displayName} src={user.photoURL} />}
          />
          {orgList.map((org, index) => (
            <Tab
              key={index + 1}
              label={org.org_name}
              {...a11yProps(index + 1)}
              icon={<Avatar alt={org.org_name} src={org.org_image} />}
            />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <BaseTutorialsComponent
            owner={user.userHandle}
            imageURL={user.photoURL}
            ownerName={user.displayName}
          />
        </TabPanel>
        {orgList.map((org, index) => (
          <TabPanel value={value} index={index + 1} key={index + 1}>
            <BaseTutorialsComponent
              key={index}
              owner={org.org_handle}
              imageURL={org.org_image}
              ownerName={org.org_name}
            />
          </TabPanel>
        ))}
      </div>
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
