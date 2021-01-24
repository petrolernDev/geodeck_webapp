import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Input, InputGroup } from "reactstrap";
import {Collapse} from '@material-ui/core';
import { editPlot } from "../../../../redux/actions/plotAction";

const SimulationVariable = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [offSet, setOffSet] = useState(1);
  const perPage = 3;

  const { plotId, currentIds, variableId, simulation } = props;
  const { id, name, data } = simulation;
  const visibleVariables = data.slice(0, offSet * perPage);

  const onInputClick = () => {
    setIsOpen(!isOpen);
    setOffSet(1);
  };

  const onChangeOffSet = () => setOffSet(offSet + 1);

  const onSelectVariable = (newVariableId) => {
    let newCurrentIds = [];

    if (isVariableChanged(newVariableId)) {
      newCurrentIds = refreshCurrentIds();
    } else {
      newCurrentIds = [id];
    }

    const editObject = { variableId: newVariableId, currentIds: newCurrentIds };
    props.editPlot(plotId, editObject);
  };

  const isVariableChanged = (newId) => {
    return variableId === newId;
  };

  const refreshCurrentIds = () => {
    if (!currentIds.find((cId) => cId === id)) {
      return [id, ...currentIds];
    } else {
      // change active simulation with change index of currentIds
      let newIds = currentIds.filter((cId) => cId !== id); // pop active id
      return [id, ...newIds]; // push active id again
    }
  };

  const getClassName = (vId) => {
    // variable id
    let pClassName = "";
    if (variableId === vId) {
      pClassName = `${pClassName} light`;
      if (currentIds.find((cId) => cId === id)) {
        //simulation selectted
        pClassName = `${pClassName} selected`;
      }
    }
    return pClassName;
  };

  const inputStyles = () => {
    let styles = {
      width: "100%",
      background: "transparent",
      borderColor: "#1f8705",
    };
    if (_.includes(currentIds, simulation.id)) {
      styles = { ...styles, background: "#1f8705" };
    }
    return styles;
  };

  const inputClassName = () => {
    let className = "simulation__inputs__child";
    if (_.includes(currentIds, simulation.id)) {
      className = `${className} selected`;
    }
    return className;
  };

  return (
    <div className="simulation__plot__input">
      <InputGroup onClick={onInputClick}>
        <Input
          value={name}
          className={inputClassName()}
          // style={inputStyles()}
          disabled={true}
        />
      </InputGroup>

      <Collapse in={isOpen} className="simulation__plot__collapse" timeout="auto">
 
        {visibleVariables.map(({ name, id }) => {
          const pClassName = getClassName(id);

          return (
            <p
              key={id}
              onClick={() => onSelectVariable(id)}
              className={pClassName}
            >
              {name}
            </p>
          );
        })}
        {offSet * perPage < _.size(data) && (
          <p onClick={onChangeOffSet}>More...</p>
        )}
      </Collapse>
    </div>
  );
};

export default connect(null, { editPlot })(SimulationVariable);
