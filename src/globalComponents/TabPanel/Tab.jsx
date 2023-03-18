import React from "react";

const Tab = ({ icon, label }) => {
  return (
    <div className="child">
      <div className="icon">{icon}</div>
      <div className="title">{label}</div>
    </div>
  );
};

export default Tab;
