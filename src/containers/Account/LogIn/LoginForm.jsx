import React from "react";
import { Field, reduxForm, Form } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
import renderCheckBoxField from "../../../shared/components/form/CheckBox";
import InputField from "../../../shared/components/form/InputField";
import validate from "./validateLogin";
import PasswordField from "../../../shared/components/form/PasswordField";

const LoginForm = ({
  handleSubmit,
  submitting,
  errorMessage,
  errorMsg,
  fieldUser,
  typeFieldUser,
  form,
}) => {
  let history = useHistory();

  const onSubmit = (formValues) => {
    // redirect to dashboard
    history.push("/projects");
  };

  return (
    <Form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
      <Alert color="danger" isOpen={!!errorMessage || !!errorMsg}>
        {errorMessage}
        {errorMsg}
      </Alert>
      <div className="form__form-group">
        <span className="form__form-group-label">{fieldUser}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="username"
            component={InputField}
            type={typeFieldUser}
            placeholder={fieldUser}
            className="input-without-border-radius"
          />
        </div>
      </div>
      <PasswordField>
        <div className="account__forgot-password">
          <NavLink to="/reset_password">Forgot a password?</NavLink>
        </div>
      </PasswordField>
      <div className="form__form-group">
        <div className="form__form-group form__form-group-field">
          <Field
            name={`remember_me`}
            component={renderCheckBoxField}
            label="Remember me"
          />
        </div>
      </div>
      <div className="account__btns">
        <button
          className="geo-button selected full-width"
          type="submit"
          color="primary"
          disabled={submitting}
        >
          Sign In
        </button>

        <NavLink
          disabled
          className="geo-button full-width"
          to="/register"
        >
          Create Account
        </NavLink>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorMsg: PropTypes.string,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
  form: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  errorMessage: "",
  errorMsg: "",
  fieldUser: "Username",
  typeFieldUser: "text",
};

let wrappedComponent = reduxForm({
  form: "geoDeckLoginForm", // a unique identifier for this form
  validate,
  asyncChangeFields: [],
  // asyncBlurFields: [], // this seems to prevent the error
})(withTranslation("common")(LoginForm));

export default connect((state) => ({
  errorMsg: state.user.error,
}))(reduxForm()(wrappedComponent));
