import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import { editSimulation } from "../../../../redux/actions/simulationAction";

const SimulationInput = (props) => {
  const { simulation, selected, onSelect } = props;
  const { id, name, color, isLoaded } = simulation;
  const [value, setValue] = useState(name);

  useEffect(() => {
    // reset changes after generate parameters
    setValue(name);
  }, [isLoaded]);

  const onSelectSimulation = () => {
    onSelect(id);
  };

  const onChangeName = (value) => {
    setValue(value);
  };

  const editName = () => {
    const newSimulation = { ...simulation, name: value };
    props.editSimulation(newSimulation);
  };

  return (
    <InputGroup onClick={onSelectSimulation}>
      <Input
        value={value}
        onChange={(e) => onChangeName(e.target.value)}
        className={`simulation__inputs__child ${selected ? "selected" : ""}`}
        style={{
          // background: selected ? color : "transparent",
          // borderColor: color,
          paddingRight: !isLoaded ? "24px" : "",
        }}
        disabled={!isLoaded}
      />
      {simulation.name !== value && (
        <div
          className={`simulation__inputs__icons check  ${
            selected ? "selected" : ""
          }`}
        >
          <CheckOutlined onClick={editName} />
        </div>
      )}

      {!isLoaded && (
        <div
          className={`simulation__inputs__icons loading  ${
            selected ? "selected" : ""
          }`}
        >
          <SyncOutlined spin />
        </div>
      )}
    </InputGroup>
  );
};

export default connect(null, { editSimulation })(SimulationInput);
