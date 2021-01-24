import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import todoCard from '../../../Todo/types';
import Panel from '../../../../shared/components/Panel';
import ToDo from './ToDo';

const editTodoElementData = ({ todoElements, editTodoElement }) => (e) => {
  const todoId = e.target.id;
  const elementData = todoElements.find(item => Number(item.data.id) === Number(todoId)).data;
  elementData.completed = !elementData.completed;
  editTodoElement(elementData);
};

const MyTodos = ({ t, todoElements, editTodoElement }) => (
  <Panel
    md={12}
    lg={5}
    xl={3}
    xs={12}
    title={t('dashboard_commerce.my_todos')}
    subhead="Do not forget to do everything"
  >
    {
      todoElements.map(todo => (
        <ToDo
          key={todo.data.id}
          id={todo.data.id}
          label={todo.data.title}
          checked={todo.data.completed}
          onChange={editTodoElementData({ todoElements, editTodoElement })}
        />
      ))
    }
  </Panel>
);

MyTodos.propTypes = {
  t: PropTypes.func.isRequired,
  editTodoElement: PropTypes.func.isRequired,
  todoElements: PropTypes.arrayOf(todoCard).isRequired,
};

export default withTranslation('common')(MyTodos);
