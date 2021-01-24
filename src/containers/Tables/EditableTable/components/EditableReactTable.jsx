import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, Col, Input,
} from 'reactstrap';
import BaseReactTable from '../../../../shared/components/table/BaseReactTable';
import CustomizerTable from '../../../../shared/components/table/components/ReactTableCustomizer';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
  isEditable,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="table__editable-table">
      {isEditable
        ? <Input className="table__edit-form" value={value} onChange={onChange} onBlur={onBlur} />
        : <div>{value}</div>
      }
    </div>
  );
};

EditableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  row: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  column: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

const defaultColumn = {
  Cell: EditableCell,
};

const EditableTable = ({ reactTableData }) => {
  const [rows, setData] = useState(reactTableData.tableRowsData);
  const [withPagination, setWithPaginationTable] = useState(true);
  const [isSortable, setIsSortable] = useState(false);
  const [withSearchEngine, setWithSearchEngine] = useState(false);

  const updateData = (rowIndex, columnId, value) => {
    setData(old => old.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return item;
    }));
  };

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
    isEditable: true,
    isSortable,
    isResizable: false,
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
              <h5 className="bold-text">editable react-table</h5>
              <h5 className="subhead">Use table with&nbsp;
                <span className="red-text">editable</span>
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
            data={rows}
            updateData={updateData}
            defaultColumn={defaultColumn}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

EditableTable.propTypes = {
  reactTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default EditableTable;
