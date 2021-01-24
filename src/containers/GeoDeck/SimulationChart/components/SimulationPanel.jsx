import React from "react";
import _ from "lodash";
import SimulationLinePoint from "./SimulationLinePoint";
import SimulationVariable from "./SimulationVariable";

const SimulationPanel = (props) => {
  const { currentPlot } = props;
  const { id, simulations } = currentPlot;

  if (_.isEmpty(simulations)) {
    return null;
  }

  const { data, currentIds, variableId, pointId, lineId } = simulations;

  const firstId = currentIds[0]; // always current simulation have first index
  const currentSimulation = data.find((d) => d.id === firstId);
  const currentVariable = currentSimulation?.data.find(
    (sim) => sim.id === variableId
  );

  return (
    <React.Fragment>
      <div className="simulation__plot__panel__variables simulation__inputs">
        {data.map((simulation, index) => {
          return (
            <SimulationVariable
              simulation={simulation}
              currentIds={currentIds}
              variableId={variableId}
              key={index}
              plotId={id}
            />
          );
        })}
      </div>
      <div className="simulation__plot__panel__divider" />
      <div className="simulation__plot__panel__setting">
        <SimulationLinePoint
          currentVariable={currentVariable}
          pointId={pointId}
          lineId={lineId}
          plotId={id}
        />
      </div>
    </React.Fragment>
  );
};

export default SimulationPanel;
