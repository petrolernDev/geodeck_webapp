import React from "react";
import { NavLink } from "react-router-dom";
import ResetPasswordForm from "../../../shared/components/reset_password/ResetPasswordForm";
import AccountHead from "../AccountHead";

const ResetPassword = (props) => {
  const onSubmit = (item) => {
    console.log(item);
  };

  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <AccountHead subhead="Password reset" />
          <ResetPasswordForm
            {...props}
            onSubmit={onSubmit}
            form="reset_password_form"
          />
          <div className="account__have-account">
            <p>
              Remember your password? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
