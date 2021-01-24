import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import BaseReactTable from '../../../../shared/components/table/BaseReactTable';
import TableCustomizer from '../../../../shared/components/table/components/ReactTableCustomizer';

const DataTable = ({ reactTableData }) => {
  const [isSortable, setIsSortable] = useState(false);
  const [withPagination, setWithPaginationTable] = useState(false);
  const [withSearchEngine, setWithSearchEngine] = useState(true);

  const handleClickIsSortable = () => {
    setIsSortable(!isSortable);
  };

  const handleClickWithPagination = () => {
    setWithPaginationTable(!withPagination);
  };

  const handleClickWithSearchEngine = () => {
    setWithSearchEngine(!withSearchEngine);
  };

  const tableConfig = {
    isEditable: false,
    isResizable: false,
    isSortable,
    withPagination,
    withSearchEngine,
    manualPageSize: [10, 20, 30, 40],
    placeholder: 'Search variable...',
  };

  return (
          <BaseReactTable
            columns={reactTableData.tableHeaderData}
            data={reactTableData.tableRowsData}
            tableConfig={tableConfig}
          />
  );
};

DataTable.propTypes = {
  reactTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableHeaderData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableRowData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default DataTable;
