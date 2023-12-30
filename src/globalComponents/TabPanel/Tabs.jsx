import React from "react";

const Tabs = ({ children, onSelect }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const onSelectedTab = index => {
    setSelectedTab(index);
    onSelect(index);
  };

  return (
    <div className="tabs">
      {children.map((element, index) => {
        return (
          <div
            onClick={() => onSelectedTab(index)}
            className={selectedTab === index ? "tab active" : "tab"}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
