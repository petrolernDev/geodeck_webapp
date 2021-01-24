import React, { Component } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../../shared/components/form/Select';

class VerticalForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };


  render() {
    const { handleSubmit, reset, t } = this.props;
    const { showPassword } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="project title"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Data Endpoint</span>
                <div className="form__form-group-field">
                  <Field
                    name="url"
                    component="input"
                    type="text"
                    placeholder="URL for Data API"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Collaboration Group</span>
                <div className="form__form-group-field">
                  <Field
                    name="select"
                    component={renderSelectField}
                    options={[
                      { value: 'one', label: 'University Group' },
                      { value: 'two', label: 'Lab 1' },
                    ]}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                  <Field
                    name="password"
                    component="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="authentication password"
                  />
                  <button
                    type="button"
                    className={`form__form-group-button${showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(VerticalForm));
