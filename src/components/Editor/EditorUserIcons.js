import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import { avatarName } from "../../helpers/avatarName";
/**Sidebar Icons component
 *
 * @param {boolean} active // whether the icon is selected
 * @param {string} text // text to show in case no image or icon (1 to 2 letters preferred)
 * @param {string} icon // icon to show in case no image
 * @param {string} image // image of the icon
 * @param {function} onClick // callback function to get click event
 * @param {object} data // pass the data to identify in the click event (required if click event is used)
 */
export const EditorUserIcons = ({
  text,
  icon,
  image,
  data,
  style,
  borderColor,
  isDesktop,
}) => {
  let tooltipProps = {
    placement: "top",
    title: data ? data.name : null,
    color: data ? data.color : null,
  };
  if (isDesktop === false) {
    tooltipProps.visible = false;
  }

  return (
    <Tooltip {...tooltipProps}>
      <div className="editor-icon noselect">
        <Badge
          dot
          color={borderColor ? borderColor : null}
          style={{ display: borderColor ? "inline-block" : "none" }}
        >
          <Avatar
            shape="circle"
            size={31}
            icon={icon ? icon : null}
            src={image ? image : null}
            style={{
              backgroundColor: image ? "#ffffff" : "#3AAFA9",
              ...style,
            }}
          >
            {text ? avatarName(text) : ""}
          </Avatar>
        </Badge>
      </div>
    </Tooltip>
  );
};

export const EditorUserIconsExtra = ({ data }) => {
  const content = (
    <div>
      {data &&
        data.map((user, i) => {
          return (
            <EditorUserIcons
              borderColor={user.color}
              text={user.displayName}
              image={user.photoURL}
              data={{ name: user.displayName, color: user.color }}
              key={user.handle + i}
            />
          );
        })}
    </div>
  );
  return (
    <Popover content={content} trigger="hover" placement="bottom">
      <div className="editor-icon noselect">
        <Avatar
          shape="circle"
          size={31}
          style={{
            backgroundColor: "#3AAFA9",
          }}
        >
          {"+" + data.length}
        </Avatar>
      </div>
    </Popover>
  );
};
