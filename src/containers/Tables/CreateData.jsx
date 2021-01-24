import React, { useMemo } from 'react';

const data = [
  {
    name: 'Number of wells',
    value: 4
  },
  {
    name: 'Avg Pressures',
    value: 1869.6
  },
  {
    name: 'Avg Temperature',
    value: 123.63
  },
  {
    name: 'Avg Porosity',
    value: 0.11250
  }
]
const CreateTableData = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Variable',
        accessor: 'name',
      },
      {
        Header: 'Value',
        accessor: 'value',
        disableGlobalFilter: true,
      }
    ],
    [],
  );

  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};

export default CreateTableData;
