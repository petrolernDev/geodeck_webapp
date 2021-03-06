import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import BaseReactTable from '../../../../shared/components/table/BaseReactTable';
import CustomizerTable from '../../../../shared/components/table/components/ReactTableCustomizer';

const ResizableDataTable = ({ reactTableData }) => {
  const [isSortable, setIsSortable] = useState(false);
  const [withPagination, setWithPaginationTable] = useState(true);
  const [withSearchEngine, setWithSearchEngine] = useState(false);

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
    isResizable: true,
    isSortable,
    withPagination,
    withSearchEngine,
    manualPageSize: [10, 20, 30, 40],
    placeholder: 'Search by First name...',
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="react-table__wrapper">
            <div className="card__title">
              <h5 className="bold-text">resizable react-table</h5>
              <h5 className="subhead">Use table with&nbsp;
                <span className="red-text">resizable</span>
              </h5>
            </div>
            <CustomizerTable
              handleClickIsSortable={handleClickIsSortable}
              handleClickWithPagination={handleClickWithPagination}
              handleClickWithSearchEngine={handleClickWithSearchEngine}
              isSortable={isSortable}
              withPagination={withPagination}
              withSearchEngine={withSearchEngine}
            />
          </div>
          <BaseReactTable
            columns={reactTableData.tableHeaderData}
            data={reactTableData.tableRowsData}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

ResizableDataTable.propTypes = {
  reactTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default ResizableDataTable;
