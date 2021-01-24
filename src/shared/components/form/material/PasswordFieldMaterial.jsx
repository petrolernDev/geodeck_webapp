import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import EyeIcon from "mdi-react/EyeIcon";
import EyeOffIcon from "mdi-react/EyeOffIcon";
import MaterialTextField from "./MaterialTextField";
import { Field } from "redux-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function PasswordFieldMaterial() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Field
        component={MaterialTextField}
        id="standard-adornment-password"
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{margin:0}}>
              <IconButton
                aria-label="toggle password visibility"
                // className={
                //   showPassword ? "material-icon" : "material-icon__active"
                // }
                className={` button icon-button-material form__form-group-button${
                    showPassword ? " active" : ""
                  }`}
                onClick={showPasswordToggle}
                style={{borderRadius: 0}}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        // endAdornment={
        //   <InputAdornment position="end">
        //     <IconButton
        //       aria-label="toggle password visibility"
        //       onClick={showPasswordToggle}
        //       // onMouseDown={handleMouseDownPassword}
        //     >
        //       {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        //     </IconButton>
        //   </InputAdornment>
        // }
      />
    </React.Fragment>
  );
}
