import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import MaterialTextField from "../../../shared/components/form/material/MaterialTextField";
import { Grid } from "@material-ui/core";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  children,
  select,
  type,
  multiline,
}) => (
  <TextField
    className="material-form__field"
    label={label}
    type={type}
    error={touched && error}
    value={input.value}
    children={children}
    select={select}
    multiline={multiline}
    onChange={(e) => {
      e.preventDefault();
      input.onChange(e.target.value);
    }}
    InputLabelProps={{
      style: { color: "#999" },
    }}
  />
);

renderTextField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  select: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  type: PropTypes.string,
  multiline: PropTypes.bool,
};

renderTextField.defaultProps = {
  meta: null,
  select: false,
  children: [],
  type: "text",
  multiline: false,
};

const AnimatedLineFormWithLabels = ({ handleSubmit, reset, t }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <form className="material-form" onSubmit={handleSubmit}>
          <div>
            <Field
              name="username"
              component={MaterialTextField}
              placeholder="title"
              label="File name"
            />
          </div>
          <div>
            <Field
              name="url"
              component={MaterialTextField}
              placeholder="text..."
              label="Description"
            />
          </div>
          <div>
            <Field
              name="select"
              component={MaterialTextField}
              select
              label="File type"
            >
              <MenuItem className="material-form__option" value="one">
                JPG
              </MenuItem>
              <MenuItem className="material-form__option" value="two">
                PNG
              </MenuItem>
              <MenuItem className="material-form__option" value="three">
                TIFF
              </MenuItem>
              <MenuItem className="material-form__option" value="four">
                PDF
              </MenuItem>
              <MenuItem className="material-form__option" value="five">
                MP4
              </MenuItem>
            </Field>
          </div>
          <div>
            <Field
              name="textarea"
              component={MaterialTextField}
              placeholder="Type gallery note here"
              multiline
              rowsMax="4"
              label="Gallery note"
            />
          </div>
        </form>
        <div className="export__buttons">
          <button className="geo-button full-width">Export</button>
          <button className="geo-button full-width ">Add to Gallery</button>
        </div>
      </CardBody>
    </Card>
  </Col>
);

AnimatedLineFormWithLabels.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "floating_labels_form", // a unique identifier for this form
})(withTranslation("common")(AnimatedLineFormWithLabels));
