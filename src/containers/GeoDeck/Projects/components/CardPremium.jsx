import React, {useState} from 'react';
import {
  Card, CardBody, Col, Button, Modal, ButtonToolbar
} from 'reactstrap';
import classNames from 'classnames';
import CreateForm from '../BasicForm'
const rocket = `${process.env.PUBLIC_URL}/img/plus.png`;

const CardPremium = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(prevState => !prevState);
  };

  let Icon;
  const color = 'primary'
  const colored = false
  const header = true

  switch (color) {
    case 'primary':
      Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
      break;
    case 'success':
      Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
      break;
    case 'warning':
      Icon = <span className="lnr lnr-flag modal__title-icon" />;
      break;
    case 'danger':
      Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
      break;
    default:
      break;
  }
  const modalClass = classNames({
    'modal-dialog--colored': colored,
    'modal-dialog--header': header,
  });
  return (
    <Col md={6} xl={3} sm={12} >
      <Card>
        <CardBody className="pricing-card pricing-card--danger">
          <div className="new-project">
            <img onClick={toggle} className="pricing-card__img" src={rocket} alt="" style={{height: '100px', width:"auto", cursor: "pointer"}}/>
            <Modal
              isOpen={modal}
              toggle={toggle}
              modalClassName={`ltr-support`}
              className={`modal-dialog--${color} ${modalClass}`}
            >
              <div className="modal__header">
                <button className="lnr lnr-cross modal__close-btn" type="button" onClick={toggle} />
                {header ? '' : Icon}
                <h4 className="text-modal  modal__title">Create New Project</h4>
              </div>
              <div className="modal__body" style={{backgroundColor:'#232329'}}>
                <CreateForm />
              </div>
              <ButtonToolbar className="modal__footer" style={{backgroundColor:'#232329'}}>
                <Button className="modal_cancel" onClick={toggle}>Cancel</Button>{' '}
                <Button className="modal_ok" outline={colored} color={color} onClick={toggle}>Create</Button>
              </ButtonToolbar>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </Col>
  )

};

export default CardPremium;
