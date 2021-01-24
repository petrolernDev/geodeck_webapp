import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Col, Container, Row } from 'reactstrap';
import DataReactTable from './components/DataReactTable';
import CreateTableData from '../../Tables/CreateData';

const DataTable = ({ t }) => {
  const reactTableData = CreateTableData();

  return (
      <DataReactTable reactTableData={reactTableData} />
  )
};



export default withTranslation('common')(DataTable);
