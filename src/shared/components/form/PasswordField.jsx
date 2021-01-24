import React, { useState } from "react";
import { Field } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import InputField from "../../../shared/components/form/InputField";

const PasswordField = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form__form-group">
      <span className="form__form-group-label">Password</span>
      <div className="form__form-group-field">
        <div className="form__form-group-icon">
          <KeyVariantIcon />
        </div>
        <Field
          name="password"
          component={InputField}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input-without-border-radius"
        />
        <button
          type="button"
          className={`form__form-group-button${showPassword ? " active" : ""}`}
          onClick={showPasswordToggle}
        >
          <EyeIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PasswordField;
