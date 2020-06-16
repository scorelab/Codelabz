import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

const useGetPermissions = () => {
  const organizations = useSelector(
    ({
      profile: {
        data: { data }
      }
    }) => data && data.organizations
  );
  const current = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const organization = _.find(
      organizations,
      org => org.org_handle === current
    );
    setPermissions(_.get(organization, "permissions", []));
  }, [current, organizations]);

  return permissions;
};

export default useGetPermissions;
