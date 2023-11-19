import React from "react";
import Avatar from "@mui/material/Avatar";
import { avatarName } from "../../../helpers/avatarName";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
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
  isDesktop
}) => {
  let tooltipProps = {
    placement: "right",
    title: data ? data.name : null,
    color: data ? data.color : null
  };
  if (isDesktop === false) {
    tooltipProps.visible = false;
  }

  return (
    <Grid type="flex" align="middle" justify="space-around">
      <Grid xs={24}>
        <Tooltip {...tooltipProps}>
          <Grid
            align="middle"
            justify={isDesktop ? "space-around" : null}
            onClick={onClick && data ? () => onClick(data) : null}
          >
            <Grid>
              <div
                style={{
                  borderColor: "black",
                  display: "flex",
                  justifyItems: "center",
                  justifyContent: "center",
                  height: "10vh"
                }}
              >
                <Avatar
                  icon={icon ? icon : null}
                  src={image ? image : null}
                  style={{
                    backgroundColor: image ? "#ffffff" : "#3AAFA9",
                    ...style
                  }}
                >
                  {text ? avatarName(text) : ""}
                </Avatar>
              </div>
            </Grid>
            {isDesktop === false && (
              <Grid className="ml-8" style={{ marginTop: "12px" }}>
                {data ? data.name : null}
              </Grid>
            )}
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
