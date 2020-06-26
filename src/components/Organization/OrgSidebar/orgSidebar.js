import React, { useState } from "react";
import { Divider } from "antd";
import { OrgIcons } from "./orgIcons";
import { Palette } from "color-thief-react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import CreateOrgModal from "./createOrgModal";
import { setCurrentOrgUserPermissions } from "../../../store/actions/profileActions";

const OrgSidebar = () => {
  const dispatch = useDispatch();
  const orgs = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  const [activeOrg, setActiveOrg] = useState(orgs[0]); // set the current active org here
  const [showModal, setShowModal] = useState(false); // set the current active org here

  const handleClickEvent = data => {
    let orgDetails = orgs.find(element => {
      return element.org_handle === data.handle;
    });
    setCurrentOrgUserPermissions(orgDetails.org_handle, orgDetails.permissions)(
      dispatch
    );
    setActiveOrg(orgDetails);
  };

  const createOrg = () => {
    setShowModal(true);
  };

  const createOrgClose = () => {
    setShowModal(false);
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
        orgs.map(org => (
          <Palette
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
                    borderColor={data[1]}
                    text={org.org_name}
                    image={org.org_image}
                    onClick={handleClickEvent}
                    data={{
                      name: org.org_name,
                      handle: org.org_handle
                    }}
                    active={false}
                  />
                );
              }
            }}
          </Palette>
        ))}
      <CreateOrgModal show={showModal} closeCallback={createOrgClose} />
    </div>
  );
};

export default OrgSidebar;
