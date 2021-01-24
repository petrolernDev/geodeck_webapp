import React from "react";
import { FormControl, Select } from "@material-ui/core";


const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom },
) => (
    <Select 
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}

      {...custom}
    >
      {children}
    </Select>
);

export default renderSelectField;
