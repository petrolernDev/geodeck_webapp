import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import SimTable from "./components/SimTable";
import SimulationInput from "./components/SimulationInput";
import SimulationNew from "./components/SimulationNew";
import {
  fetchSimulations,
  setCurrent,
} from "../../../redux/actions/simulationAction";
import { connect } from "react-redux";

const SimulationView = (props) => {
  const [currentSimulation, setCurrentSimulation] = useState(null);
  const { simulations, current, fetchSimulations, setCurrent } = props;

  useEffect(() => {
    fetchSimulations();
  }, []);

  useEffect(() => {
    const currentSim = simulations.find((sim) => sim.id === current);
    setCurrentSimulation(currentSim);
  }, [simulations]);

  const onSelectSim = (id) => {
    setCurrent(id);
    // const { simulations } = props;
    // const currentSim = simulations.find((sim) => sim.id === id);
    // console.log(currentSim);
    // setCurrentSimulation(currentSim);
  };

  const { controlBar } = props;
  if (!simulations) return null;
  return (
    <Container className="simulation">
      <Row className="simulation__container">
        <Col md="2" className="simulation__sidebar">
          <div
            className="simulation__inputs full-height"
            // style={{ maxHeight: controlBar ? "72vh" : "56vh" }}
          >
            {simulations?.map((simulation, index) => {
              return (
                <SimulationInput
                  onSelect={onSelectSim}
                  key={index}
                  selected={simulation.id === current}
                  simulation={simulation}
                />
              );
            })}
          </div>
          <SimulationNew />
        </Col>

        <Col md="10" className="simulation__view">
          {currentSimulation ? (
            <React.Fragment>
              <h4>API exposed variables - {currentSimulation.name}</h4>

              <SimTable
                key={currentSimulation.id}
                simulation={currentSimulation}
                controlBar={controlBar}
              />
            </React.Fragment>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ flex: "1" }}
            >
              <h6 className="simulation__alert--none">
                Please select a simulation or create new one
              </h6>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

// export default SimulationView;

const mapStateToProps = (state) => {
  const { current, data } = state.simulations;
  return { current, simulations: Object.values(data) };
};

export default connect(mapStateToProps, { fetchSimulations, setCurrent })(
  SimulationView
);
