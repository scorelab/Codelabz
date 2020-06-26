import React from "react";
import { Form, Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import countryList from "./countryList";
const { Option } = Select;

const CountryDropdown = (props) => {
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <Option key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </Option>
    );
  }

  return (
    <Form.Item
      name="org_country"
      rules={[
        {
          required: true,
          message: "Please select the country of the organization",
        },
      ]}
    >
      <Select
        style={{ width: "100%" }}
        placeholder={
          <div style={{ textAlign: "left" }}>
            <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} /> Country of
            the organization
          </div>
        }
        showSearch={true}
        defaultValue={props.defaultValue}
      >
        {children}
      </Select>
    </Form.Item>
  );
};

export default CountryDropdown;
