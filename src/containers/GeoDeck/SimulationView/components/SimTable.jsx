import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Button, Input } from "reactstrap";
import { editSimulation } from "../../../../redux/actions/simulationAction";

const columns = [
  { id: "label", label: "Variables", color: "#87c1fc" },
  { id: "value", label: "Value", color: "#87c1fc" },
  { id: "unit", label: "Unit" },
  { id: "max", label: "Max" },
  { id: "min", label: "Min" },
  { id: "editable", label: "Editable" },
  { id: "other", label: "etc." },
];

const SimTable = ({ simulation, controlBar, editSimulation }) => {
  const { parameters } = simulation;
  const [newParameters, setNewParameters] = useState(parameters);

  // useEffect(() => setNewParameters(parameters), [parameters]);

  const onChangeValue = (value, index) => {
    let intValue = _.toNumber(value);
    const newParam = { ...newParameters[index], value: intValue }; // create new object with changed value
    const newParams = newParameters.map((p, ind) => {
      if (ind === index) return newParam;
      else return p;
    });
    setNewParameters(newParams);
  };

  const onSubmit = () => {
    if (!_.isEqual(parameters, newParameters)) {
      // for demo only
      const newSimulation = {
        ...simulation,
        parameters: newParameters,
        isLoaded: false,
        editable: false,
      };
      // after api implementation
      // const newSimulation = { ...simulation, parameters: newParameters };
      editSimulation(newSimulation);
    }
  };

  return (
    <React.Fragment>
      <TableContainer
        className="simulation__table full-height"
        style={{ maxHeight: "auto" }}
        // style={{ maxHeight: controlBar ? "70vh" : "51vh" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ color: column?.color }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newParameters.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return column.id === "value" && simulation.editable ? (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className="editable"
                      >
                        <Input
                          className="simulation__table__input"
                          defaultValue={value}
                          type="number"
                          onChange={(e) => onChangeValue(e.target.value, index)}
                        />
                      </TableCell>
                    ) : (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <button
          // color="primary"
          type="button"
          className={`geo-button ${!simulation.editable ? "disable" : ""}`}
          type="submit"
          onClick={onSubmit}
          disabled={_.isEqual(parameters, newParameters)}
        >
          Run
        </button>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { editSimulation })(SimTable);
