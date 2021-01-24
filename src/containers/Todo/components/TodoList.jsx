import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TodoItem from './TodoItem';
import todoCard from '../types';

const TodoList = ({
  todoElements,
  changeShowEditModal, editTodoElementAction, deleteTodoElementAction,
  isCompleted, isArchived,
}) => {
  const todoListClass = classNames({
    'todo__item-completed': isCompleted,
    'todo__item-archived': isArchived,
  });

  return (
    todoElements.map(todo => (
      <div key={todo.data.id} className={todoListClass}>
        <TodoItem
          todoItemData={todo}
          changeShowEditModal={changeShowEditModal}
          editTodoElement={editTodoElementAction}
          deleteTodoElement={deleteTodoElementAction}
        />
      </div>
    ))
  );
};

TodoList.propTypes = {
  todoElements: PropTypes.arrayOf(todoCard).isRequired,
  changeShowEditModal: PropTypes.func,
  editTodoElementAction: PropTypes.func,
  deleteTodoElementAction: PropTypes.func,
  isCompleted: PropTypes.bool,
  isArchived: PropTypes.bool,
};

TodoList.defaultProps = {
  deleteTodoElementAction: () => {},
  changeShowEditModal: () => {},
  editTodoElementAction: () => {},
  isCompleted: false,
  isArchived: false,
};

export default TodoList;
