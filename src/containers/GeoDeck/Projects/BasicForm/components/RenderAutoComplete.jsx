import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// const options = [
//   {title: "option1", value: 1},
//   {title: "option2", value: 2},
//   {title: "option3", value: 3},
// ];

const RenderAutoComplete = ({
  input,
  label,
  options,
  onSelectChange,
  meta: { touched, error, invalid },
  children,

  ...custom
}) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      label={label}
      id="collaboration-group"
      options={options}
      // fullWidth
      value={value}
      onChange={(event, newValue) => {
        // console.log(newValue);
        setValue(newValue);
        onSelectChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        console.log(newInputValue);
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.title}
      renderOption={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className="material-form__field"
          variant="standard"
          InputLabelProps={{
            style: { color: "#929292" },
          }}
          error={touched && invalid}
          helperText={touched && error}
        />
      )}
      {...custom}
    />
  );
};

RenderAutoComplete.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  select: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

RenderAutoComplete.defaultProps = {
  meta: null,
  options: [],
  children: [],
};

export default RenderAutoComplete;
