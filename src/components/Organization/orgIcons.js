import React from "react";
import { Avatar, Row, Col, Tooltip } from "antd";
import { avatarName } from "../../helpers/avatarName";
/**Sidebar Icons component
 *
 * @param {boolean} active // whether the icon is selected
 * @param {string} text // text to show in case no image or icon (1 to 2 letters preffered)
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
}) => {
  return (
    <Row
      type="flex"
      align="middle"
      justify="space-around"
      style={{ width: 65 }}
    >
      <Col>
        <Tooltip
          placement="right"
          title={data ? data.name : null}
          color={data ? data.color : null}
        >
          <div
            className={
              "minisidebar-item" +
              (active === true ? " minisidebar-active" : "") +
              (border === true
                ? " minisidebar-item-border"
                : " minisidebar-item-no-border")
            }
            onClick={onClick && data ? () => onClick(data) : null}
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
                ...style,
                backgroundColor: image ? "#fffff" : "#3AAFA9",
              }}
            >
              {text ? avatarName(text) : ""}
            </Avatar>
          </div>
        </Tooltip>
      </Col>
    </Row>
  );
};
