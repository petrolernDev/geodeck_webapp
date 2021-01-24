import React from 'react';
import PropTypes from 'prop-types';
import { useResizeColumns, useFlexLayout } from 'react-table';
import ReactTable from './components/ReactTable';

const BaseReactTable = ({
  tableConfig,
  columns,
  data,
  defaultColumn,
  updateData,
}) => {
  const {
    isEditable,
    isResizable,
    isSortable,
    withDragAndDrop,
    withPagination,
    withSearchEngine,
    manualPageSize,
  } = tableConfig;
  const arrayForTable = [
    {
      columns,
      data,
      updateData,
      defaultColumn,
      isEditable,
      withDragAndDrop: withDragAndDrop || false,
      dataLength: data.length,
      autoResetPage: false,
      disableSortBy: !isSortable,
      manualSortBy: !isSortable,
      manualGlobalFilter: !withSearchEngine,
      manualPagination: !withPagination,
      initialState: {
        pageIndex: 0,
        pageSize: manualPageSize ? manualPageSize[0] : 10,
      },
    },
  ];

  if (isResizable && !withDragAndDrop) {
    arrayForTable.push(useFlexLayout, useResizeColumns);
  }

  return (
    <ReactTable
      tableConfig={tableConfig}
      arrayForTable={arrayForTable}
    />
  );
};

BaseReactTable.propTypes = {
  tableConfig: PropTypes.shape({
    isEditable: PropTypes.bool,
    isResizable: PropTypes.bool,
    isSortable: PropTypes.bool,
    withDragAndDrop: PropTypes.bool,
    withPagination: PropTypes.bool,
    withSearchEngine: PropTypes.bool,
    manualPageSize: PropTypes.arrayOf(PropTypes.number),
  }),
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  data: PropTypes.arrayOf(PropTypes.shape()),
  updateData: PropTypes.func,
  defaultColumn: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.shape({
      Cell: PropTypes.func,
    }).isRequired,
  ]),
};

BaseReactTable.defaultProps = {
  tableConfig: {
    isEditable: false,
    isResizable: false,
    isSortable: false,
    withDragAndDrop: false,
    withPagination: false,
    withSearchEngine: false,
    manualPageSize: [],
  },
  columns: [
    { Header: '#', accessor: 'id' },
    { Header: 'Header Example Title one', accessor: 'first' },
    { Header: 'Header Example Title two', accessor: 'last' },
  ],
  data: [
    { id: 1, first: 'Cell Example Data one', last: 'Cell Example Data two' },
    { id: 2, first: 'Cell Example Data three', last: 'Cell Example Data four' },
  ],
  updateData: () => {},
  defaultColumn: [],
};

export default BaseReactTable;
