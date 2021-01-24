import React, { useState } from "react";
import { CheckCircleFilled, CheckSquareFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { changeSample } from "../../../redux/actions/threeActions";

const V = [
  "Pressure",
  "Temprature",
  "Saturation",
  "Porosity",
  "Permeability",
  "",
  "",
  "",
];
const Variables = ({ changeSample, three }) => {
  const [vs, setVs] = useState(0);
  const clickHandler = (ind) => {
    if (vs === ind) {
      return;
    }
    changeSample({
      method: three.sample.method,
      variable: V[ind],
      time:three.sample.time
    });
    setVs(ind);
  };

  return (
    <div className="variables">
      {V.map((v, index) => {
        if (index % 2 === 1) return null;
        let l = V[index + 1].length;
        let filler = Array(12 - l).fill(1);
        return (
          <div key={index}>
            <div
              className={V[index] ? "variable" : "variable disabled"}
              onClick={() => (V[index] ? clickHandler(index) : null)}
            >
              <CheckSquareFilled className={vs === index ? "selected" : ""} />
              <span>
                &nbsp; {V[index] ? V[index] : `Variable ${index + 1}`}
              </span>
            </div>

            <div
              className={V[index + 1] ? "variable" : "variable disabled"}
              onClick={() => (V[index + 1] ? clickHandler(index + 1) : null)}
            >
              <CheckSquareFilled
                className={vs === index + 1 ? "selected" : ""}
              />
              <span>
                &nbsp; {V[index + 1] ? V[index + 1] : `Variable ${index + 2}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps({ three }) {
  return {
    three,
  };
}

const mapDispatchToProps = {
  changeSample,
};

export default connect(mapStateToProps, mapDispatchToProps)(Variables);
