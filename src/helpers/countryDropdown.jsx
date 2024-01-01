import React from "react";
import Select from "@mui/material/Select";
import { InputLabel, FormControl, MenuItem, InputAdornment } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import countryList from "./countryList";

const CountryDropdown = (props) => {
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
    );
  }

  return (
    <FormControl fullWidth>
      <InputLabel style={{display:'flex', alignItems:'center', color:'rgba(0,0,0,.35)'}}>
        <PublicIcon style={{ marginRight: '8px' }}/> {props.label}
      </InputLabel>
      <Select
        labelId="country-select"
        label= {<> <PublicIcon/> {props.label} </>}
        placeholder="Country"
        onChange={props.onChange}
        showSearch={true}
        value={props.value}
        defaultValue={props.defaultValue}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;
