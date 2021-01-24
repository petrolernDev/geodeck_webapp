import React from "react";
import { EditOutlined } from "@ant-design/icons";

const SimulationHeader = ({ simulation }) => {
  return (
    <div className="simulation__header">
      <h4>API exposed variables</h4>
      <p>
        <span>{simulation.name}</span> <EditOutlined />
      </p>
    </div>
  );
};

export default SimulationHeader;
