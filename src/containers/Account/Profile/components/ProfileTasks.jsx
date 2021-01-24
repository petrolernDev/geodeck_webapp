import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
import { editTodoElement, fetchTodoListData } from '../../../Todo/redux/actions';
import todoCard from '../../../Todo/types';

// eslint-disable-next-line no-shadow
const ProfileTasks = ({ fetchTodoListData, editTodoElement, todoElements }) => {
  useEffect(() => {
    if (todoElements.length === 0) { // You can delete it if you need
      fetchTodoListData();
    }
  }, [fetchTodoListData, todoElements.length]);

  const editTodoElementData = (e) => {
    const todoId = e.target.id;
    const elementData = todoElements.find(item => Number(item.data.id) === Number(todoId)).data;
    elementData.completed = !elementData.completed;
    editTodoElement(elementData);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody className="profile__card">
          <p className="profile__current-tasks-title">Current tasks <span>{todoElements.length}</span></p>
          <div className="profile__current-tasks">
            {todoElements.map(element => (
              <div className="profile__current-task">
                <label htmlFor={element.data.id} className="checkbox-btn profile__current-task-checkbox">
                  <input
                    id={element.data.id}
                    className="checkbox-btn__checkbox"
                    type="checkbox"
                    checked={element.data.completed}
                    onChange={editTodoElementData}
                  />
                  <span className="checkbox-btn__checkbox-custom">
                    <CheckIcon />
                  </span>
                </label>
                {element.data.title}
              </div>
            ))}
            <Link to="/todo" className="profile__see-all-tasks">See all tasks</Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

ProfileTasks.propTypes = {
  fetchTodoListData: PropTypes.func.isRequired,
  editTodoElement: PropTypes.func.isRequired,
  todoElements: PropTypes.arrayOf(todoCard).isRequired,
};

const mapStateToProps = (state) => {
  const todoElements = state.todo && state.todo.data && state.todo.data.elements
  && state.todo.data.elements.length > 0 ? [...state.todo.data.elements] : [];
  return ({
    todoElements,
  });
};

const mapDispatchToProps = {
  fetchTodoListData,
  editTodoElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTasks);
