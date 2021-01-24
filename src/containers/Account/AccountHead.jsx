import React from "react";

const AccountHead = ({ subhead }) => {
  return (
    <div className="account__head">
      <div>
        <h3 className="account__title">
          Welcome to
          <span className="account__logo">
            {" "}
            Geo
            <span className="account__logo-accent">Deck</span>
          </span>
        </h3>
        <h4 className="account__subhead subhead">{subhead}</h4>
      </div>
    </div>
  );
};

export default AccountHead;
