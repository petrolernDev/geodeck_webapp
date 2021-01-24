import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const renderTextField = ({
    input,
    label,
    meta: { touched, error, invalid },
    children,
    select,
    type,
    multiline,
    ...custom

  }) => (
    <TextField
      className="material-form__field"
      label={label}
      type={type}
      error={touched && invalid}
      helperText={touched && error}
      value={input.value}
      children={children}
      select={select}
      multiline={multiline}
      onChange={(e) => {
        e.preventDefault();
        input.onChange(e.target.value);
      }}
      InputLabelProps={{
        style: { color: "#929292" },
      }}
      {...custom}
    />
  );
  
  renderTextField.propTypes = {
    input: PropTypes.shape().isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    select: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
    type: PropTypes.string,
    multiline: PropTypes.bool,
  };
  
  renderTextField.defaultProps = {
    meta: null,
    select: false,
    children: [],
    type: "text",
    multiline: false,
  };

  export default renderTextField;