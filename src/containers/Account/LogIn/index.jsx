import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import FirebaseIcon from "mdi-react/FirebaseIcon";
import withAuthFirebase from "../../../shared/components/auth/withAuthFirebase";
import { useAuth0 } from "../../../shared/components/auth/withAuth0";
import Loading from "../../../shared/components/Loading";
import LogInForm from "./LoginForm";
import GoogleAuthBtn from "../AuthBtn/googleAuthBtn";
import FacebookAuthBtn from "../AuthBtn/fbAuthBtn";
import AccountHead from "../AccountHead";

const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;

const LogIn = ({ changeIsOpenModalFireBase }) => {
  const { loginWithRedirect, loading } = useAuth0();
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <AccountHead subhead="Immerse yourself in Geo data" />
          <LogInForm onSubmit form="log_in_form" />
          <div className="account__or">
            <p>Product of </p>
          </div>
          <div className="account__social">
            <img
              src="https://www.petrolern.com/wp-content/uploads/2018/09/PETROLERN-logo-PNG-HQ-1.png"
              alt="Petrolern"
              id="logo"
              data-height-percentage="54"
              data-actual-width="1000"
              data-actual-height="203"
            />
            {/*
                <FacebookAuthBtn />
              <GoogleAuthBtn />
              <Button
                className="account__social-btn account__social-btn--firebase"
                onClick={changeIsOpenModalFireBase}
              >
                <FirebaseIcon />
              </Button>
              <Button className="account__social-btn account__social-btn--auth0" onClick={() => loginWithRedirect({})}>
                <img className="customizer__btn-icon" src={auth0Icon} alt="icon" />
              </Button>
                */}
          </div>
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LogIn);
