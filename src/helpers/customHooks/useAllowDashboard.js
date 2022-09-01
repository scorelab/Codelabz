import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

const useAllowDashboard = () => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  const [allowed, setAllowed] = useState(false);
  
  useEffect(() => {
      setAllowed( Boolean( _.get( profile,"handle",false ) ) );
  }, [profile]);

  return allowed;
};

export default useAllowDashboard;
