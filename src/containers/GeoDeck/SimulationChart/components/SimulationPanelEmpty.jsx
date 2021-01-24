import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Input, InputGroup } from "reactstrap";
import { Collapse } from "@material-ui/core";
import { fetchSimulations } from "../../../../redux/actions/simulationAction";

const SimulationPanelEmpty = (props) => {
  const [simulationList, setSimulationList] = useState([]);

  const { simulations } = props;

  useEffect(() => {
    props.fetchSimulations();
  }, []);

  useEffect(() => {
    setSimulationList(simulations);
  }, [simulations]);

  const renderVariables = ({ name }, index) => (
    <div className="simulation__plot__input" key={index}>
      <InputGroup>
        <Input
          value={name}
          className="simulation__inputs__child"
          disabled={true}
        />
      </InputGroup>
      <Collapse
        in={false}
        className="simulation__plot__collapse"
        timeout="auto"
      ></Collapse>
    </div>
  );

  return (
    <React.Fragment>
      <div className="simulation__plot__panel__variables simulation__inputs">
        {simulationList?.map((simulation, index) => {
          return renderVariables(simulation, index);
        })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.simulations;

  return { simulations: Object.values(data) };
};

export default connect(mapStateToProps, { fetchSimulations })(
  SimulationPanelEmpty
);
