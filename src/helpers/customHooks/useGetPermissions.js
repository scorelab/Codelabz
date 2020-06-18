import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useGetPermissions = () => {
  const permission = useSelector(
    ({
      org: {
        general: { permissions }
      }
    }) => permissions
  );
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    setPermissions(permission);
  }, [permission]);

  return permissions;
};

export default useGetPermissions;
