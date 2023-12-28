import React from "react";
import Select from "@mui/material/Select";
import { GlobalOutlined } from "@ant-design/icons";
import countryList from "./countryList";
import MenuItem from "@mui/material/MenuItem";

const CountryDropdown = props => {
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
    );
  }

  return (
    <form
      name="org_country"
      rules={[
        {
          required: true,
          message: "Please select the country"
        }
      ]}
    >
      <Select
        style={{ width: "100%" }}
        placeholder={
          <div style={{ textAlign: "left" }}>
            <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} /> Country
          </div>
        }
        onChange={e => props.handleChange(e)}
        showSearch={true}
        defaultValue={props.defaultValue}
      >
        {children}
      </Select>
    </form>
  );
};

export default CountryDropdown;
