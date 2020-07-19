import React from "react";
import { Avatar, Row, Col, Tooltip } from "antd";
import { avatarName } from "../../../helpers/avatarName";
/**Sidebar Icons component
 *
 * @param {boolean} active // whether the icon is selected
 * @param {string} text // text to show in case no image or icon (1 to 2 letters preferred)
 * @param {string} icon // icon to show in case no image
 * @param {string} image // image of the icon
 * @param {function} onClick // callback function to get click event
 * @param {object} data // pass the data to identify in the click event (required if click event is used)
 */
export const OrgIcons = ({
  active,
  text,
  icon,
  image,
  onClick,
  data,
  border,
  style,
  borderColor,
  isDesktop,
}) => {
  let tooltipProps = {
    placement: "right",
    title: data ? data.name : null,
    color: data ? data.color : null,
  };
  if (isDesktop === false) {
    tooltipProps.visible = false;
  }

  return (
    <Row type="flex" align="middle" justify="space-around">
      <Col xs={24}>
        <Tooltip
          {...tooltipProps}
          //visible={isDesktop ? null : false}
        >
          <Row
            align="middle"
            justify={isDesktop ? "space-around" : null}
            onClick={onClick && data ? () => onClick(data) : null}
          >
            <Col>
              <div
                className={
                  "minisidebar-item" +
                  (active === true ? " minisidebar-active" : "") +
                  (border === true
                    ? " minisidebar-item-border"
                    : " minisidebar-item-no-border")
                }
                style={{
                  borderColor: borderColor ? borderColor : null,
                }}
              >
                <Avatar
                  shape="circle"
                  size={35}
                  icon={icon ? icon : null}
                  src={image ? image : null}
                  style={{
                    backgroundColor: image ? "#ffffff" : "#3AAFA9",
                    ...style,
                  }}
                >
                  {text ? avatarName(text) : ""}
                </Avatar>
              </div>
            </Col>
            {isDesktop === false && (
              <Col className="ml-8" style={{ marginTop: "12px" }}>
                {data ? data.name : null}
              </Col>
            )}
          </Row>
        </Tooltip>
      </Col>
    </Row>
  );
};
