import React, { useState } from "react";
import { Divider } from "antd";
import { OrgIcons } from "./orgIcons";
import Color from "color-thief-react";
import { useSelector } from "react-redux";
import gl from "../../assets/orgs/google.png";
import fb from "../../assets/orgs/facebook.webp";
import ap from "../../assets/orgs/apple.png";
import { PlusOutlined } from "@ant-design/icons";

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

  const createOrg = () => {
    alert("Organization created... lol");
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
            data={{ name: activeOrg.org_name + " (selected)" }}
            active={true}
          />
          <Divider className="mt-16 mb-0" />
        </>
      )}

      <OrgIcons
        border={false}
        borderColor={"#4F6EEE"}
        text="Create New Organization"
        icon={<PlusOutlined />}
        onClick={createOrg}
        style={{ color: "#4F6EEE", backgroundColor: "#F2F7FF" }}
        data={{ name: "Create New Organization" }}
      />

      {orgs &&
        orgs.map((org) => (
          <Color
            src={org.org_image}
            crossOrigin="Anonymous"
            key={org.org_handle}
          >
            {({ data, loading }) => {
              if (loading) {
                return (
                  <OrgIcons
                    border={true}
                    borderColor={"#aaaaaa"}
                    text={org.org_name}
                    image={org.org_image}
                    onClick={handleClickEvent}
                    data={{ name: org.org_name, handle: org.org_handle }}
                    active={false}
                  />
                );
              } else {
                return (
                  <OrgIcons
                    border={true}
                    borderColor={data}
                    text={org.org_name}
                    image={org.org_image}
                    onClick={handleClickEvent}
                    data={{
                      name: org.org_name,
                      handle: org.org_handle,
                      color: data,
                    }}
                    active={false}
                  />
                );
              }
            }}
          </Color>
        ))}
      <Color src={fb} crossOrigin="Anonymous">
        {({ data, loading }) => {
          if (loading) {
            return null;
          } else {
            return (
              <OrgIcons
                border={true}
                borderColor={data}
                text={"Facebook"}
                image={fb}
                onClick={handleClickEvent}
                data={{
                  name: "Facebook",
                  handle: "facebook",
                  color: data,
                }}
                active={false}
              />
            );
          }
        }}
      </Color>
      <Color src={gl} crossOrigin="Anonymous">
        {({ data, loading }) => {
          if (loading) {
            return null;
          } else {
            return (
              <OrgIcons
                border={true}
                borderColor={data}
                text={"Google"}
                image={gl}
                onClick={handleClickEvent}
                data={{
                  name: "Google",
                  handle: "google",
                  color: data,
                }}
                active={false}
              />
            );
          }
        }}
      </Color>
      <Color src={ap} crossOrigin="Anonymous">
        {({ data, loading }) => {
          if (loading) {
            return null;
          } else {
            return (
              <OrgIcons
                border={true}
                borderColor={data}
                text={"Apple"}
                image={ap}
                onClick={handleClickEvent}
                data={{
                  name: "Apple",
                  handle: "apple",
                  color: data,
                }}
                active={false}
              />
            );
          }
        }}
      </Color>
    </div>
  );
};

export default OrgSidebar;
