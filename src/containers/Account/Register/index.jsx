import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import RegisterForm from "../../../shared/components/login_register/LoginRegisterForm";
import AccountHead from "../AccountHead";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
    };
  }

  registerFireBase = (user) => {
    const { history } = this.props;
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="account account--not-photo">
        <div className="account__wrapper">
          <div className="account__card">
            <AccountHead subhead="Create an account" />
            <RegisterForm
              onSubmit={this.registerFireBase}
              errorMessage={error}
            />
            <div className="account__have-account">
              <p>
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Register);
