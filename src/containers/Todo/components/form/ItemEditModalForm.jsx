import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection, reduxForm } from 'redux-form';
import Select from 'react-select';
import { Button, ButtonToolbar } from 'reactstrap';
import DatePicker from 'react-datepicker';
import validate from './validate';

const renderFieldTodo = ({
  input, placeholder, type, meta: { touched, error },
}) => (
  <div className="form__form-group-input-wrap">
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && <span className="form__form-group-error">{error}</span>}
  </div>
);

renderFieldTodo.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderFieldTodo.defaultProps = {
  placeholder: '',
  meta: null,
  type: 'text',
};

const renderDatePicker = ({ dueDate, handleDateChange }) => (
  <DatePicker
    dateFormat="MM/dd/yyyy"
    selected={dueDate}
    onChange={handleDateChange}
    minDate={new Date()}
  />
);

renderDatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  dueDate: PropTypes.shape().isRequired,
};

const ItemEditModalForm = ({
  handleSubmit, dueDate, handlePriorityChange, priority,
  handleDateChange, currentEditItem, changeShowEditModal, priorityOptions,
}) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="form__form-group">
      <span className="form__form-group-label typography-message">Title</span>
      <div className="form__form-group-field">
        <Field
          name="title"
          type="text"
          component={renderFieldTodo}
          placeholder="Title.."
          required
        />
      </div>
    </div>
    <div className="form__form-group">
      <span className="form__form-group-label">Description</span>
      <div className="form__form-group-field">
        <Field
          component="textarea"
          name="description"
          placeholder="What to do.."
        />
      </div>
    </div>
    <div className="form__form-group">
      <span className="form__form-group-label">Due Date</span>
      <div className="form__form-group-field priority">
        <Field
          name="dueDate"
          type="text"
          dueDate={dueDate}
          handleDateChange={handleDateChange}
          component={renderDatePicker}
          required
        />
      </div>
    </div>
    <FormSection className="form__form-group">
      <span className="form__form-group-label">Priority</span>
      <div className="form__form-group-field priority">
        <Select
          options={priorityOptions}
          onChange={handlePriorityChange}
          defaultValue={priority}
        />
      </div>
    </FormSection>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit">
        {!currentEditItem ? 'Add' : 'Edit'}
      </Button>
      <Button type="button" onClick={changeShowEditModal}>Cancel</Button>
    </ButtonToolbar>
  </form>
);

ItemEditModalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  changeShowEditModal: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handlePriorityChange: PropTypes.func.isRequired,
  currentEditItem: PropTypes.shape().isRequired,
  dueDate: PropTypes.shape().isRequired,
  priority: PropTypes.arrayOf().isRequired,
  priorityOptions: PropTypes.arrayOf().isRequired,
};

export default reduxForm({
  form: 'todoItemEditModal',
  validate,
})(ItemEditModalForm);
