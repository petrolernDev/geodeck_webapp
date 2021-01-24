/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import validate from "../../validateNewProject";
import MaterialTextField from "../../../../../shared/components/form/material/MaterialTextField";
import PasswordFieldMaterial from "../../../../../shared/components/form/material/PasswordFieldMaterial";
import { createProject } from "../../../../../redux/actions/projectAction";
import RenderAutoComplete from "./RenderAutoComplete";

const AnimatedLineFormWithLabels = (props) => {
  const [selectValue, setSelectValue] = useState(null);

  const onSubmit = (formValues) => {
    // if (!selectValue) {
    //   return;
    // }
    formValues.time = moment().format("l");
    formValues.collaborationGroup = selectValue;
    props.createProject(formValues);
    props.toggle(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); //<===== This stops the form from being submitted
    }
  };

  const onSelectChange = (value) => {
    setSelectValue(value);
  };

  const { handleSubmit } = props;

  const autoCompleteOptions = [
    { title: "Lab Internal", value: 1 },
    { title: "SMART Group", value: 2 },
    { title: "Default Group", value: 3 },
  ];

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <form
            className="material-form"
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={onKeyPress}
            id="new-project-form"
          >
            <div>
              <Field
                name="title"
                component={MaterialTextField}
                placeholder="title"
                label="Project Title"
              />
            </div>
            <div>
              <Field
                name="url"
                component={MaterialTextField}
                placeholder="https://petrolern.com"
                label="Data Endpoint URL"
                type="url"
              />
            </div>
            <div>
              <PasswordFieldMaterial />
            </div>
            <div>
              <Field
                name="collaboration-group"
                component={RenderAutoComplete}
                label="Collaboration Group"
                fullWidth
                options={autoCompleteOptions}
                onSelectChange={onSelectChange}
              />
            </div>
            {/* <div>
              <Field
                name="select"
                // type="select"
                // component={MaterialSelectField}
                component={MaterialTextField}
                select
                label="Collaboration Group"
              >
                <MenuItem className="material-form__option" value="one">
                  Lab Internal
                </MenuItem>
                <MenuItem className="material-form__option" value="two">
                  SMART Group
                </MenuItem>
              </Field>
            </div> */}
            <div>
              <Field
                name="description"
                component={MaterialTextField}
                placeholder="Type description here"
                multiline
                rowsMax="4"
                label="Description"
              />
            </div>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
};

AnimatedLineFormWithLabels.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

let wrapper = reduxForm({
  form: "newProjectForm", // a unique identifier for this form
  validate,
})(withTranslation("common")(AnimatedLineFormWithLabels));

export default connect(null, { createProject })(wrapper);
