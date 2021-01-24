import React from "react";
import TimeFrame from "./TimeFrame";

const SimulationLine = (props) => {
  const { lines } = props;
  // console.log(lines);

  const onChangeTime = () => {
    // console.log("time changed!");
  };
  return (
    <React.Fragment>
      <div>
        {!!lines &&
          lines.map((line) => {
            return <p key={line.id}>{line.name}</p>;
          })}
      </div>
      <div className="time-frame">
        <h5 className="time-frame__title" style={{ fontWeight: "bold" }}>
          Time Frame
        </h5>
        <TimeFrame
          title="At"
          current={10}
          onChangeTime={onChangeTime}
        />
      </div>
    </React.Fragment>
  );
};

export default SimulationLine;
