import React, { useState } from "react";
import { Divider } from "antd";
import { OrgIcons } from "./orgIcons";
import Color from "color-thief-react";
import { useSelector } from "react-redux";

const OrgSidebar = () => {
  const orgs = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const [activeOrg, setActiveOrg] = useState(orgs[0]); // set the current active org here

  const handleClickEvent = (data) => {
    let orgDetails = orgs.find((element) => {
      return element.org_handle === data.handle;
    });
    setActiveOrg(orgDetails);
  };

  return (
    <div className="mini-sidebar-column">
      {activeOrg && (
        <>
          <OrgIcons
            border={true}
            borderColor={null}
            text={activeOrg.org_name}
            image={activeOrg.org_image}
            onClick={null}
            data={{ name: activeOrg.org_name }}
            active={true}
          />
          <Divider className="mt-16 mb-0" />
        </>
      )}

      {orgs &&
        orgs.map((org) => (
          <Color
            src={org.org_image}
            crossOrigin="Anonymous"
            key={org.org_handle}
          >
            {({ data, loading }) => {
              if (loading)
                return (
                  <OrgIcons
                    border={true}
                    borderColor={"#aaaaaa"}
                    text={org.org_name}
                    image={org.org_image}
                    onClick={handleClickEvent}
                    data={{ name: org.org_name }}
                    active={false}
                  />
                );
              return (
                <OrgIcons
                  border={true}
                  borderColor={data}
                  text={org.org_name}
                  image={org.org_image}
                  onClick={handleClickEvent}
                  data={{
                    name: org.org_name,
                    color: data,
                    handle: org.org_handle,
                  }}
                  active={false}
                />
              );
            }}
          </Color>
        ))}
    </div>
  );
};

export default OrgSidebar;
