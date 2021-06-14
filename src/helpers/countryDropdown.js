import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountryDropDown = (props) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  return <Select options={options} value={value} onChange={changeHandler} />;
};

export default CountryDropDown;
