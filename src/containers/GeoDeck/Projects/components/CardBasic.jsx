import React from 'react';
import {
  Card, CardBody, Col, Button,
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const paperPlane = `${process.env.PUBLIC_URL}/img/co2.png`;

const CardBasic = () => (
  <Col md={6} xl={3} sm={12}>
    <Card style={{height: 'auto'}}>
      <CardBody className="pricing-card pricing-card--primary">
        <div className="pricing-card__body">
          <img className="pricing-card__img" src={paperPlane} alt="" style={{height: 'auto'}}/>
          <h3 className="pricing-card__plan">Toy Example</h3>
          <hr />
          <p className="pricing-card__price"><span>Shared (+7)</span></p>
          <p className="pricing-card__feature">Created: 23 Nov</p>
          <p className="pricing-card__feature">Modified: 1 Dec</p>
          <NavLink className="account__btn btn btn-primary" to="/main" style={{marginTop:"15px"}}>
             Load
          </NavLink>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default CardBasic;

{/*
  <p className="pricing-card__feature pricing-card__feature--inactive">Monthly update</p>
  <p className="pricing-card__feature pricing-card__feature--inactive">Free support</p>
  */}
