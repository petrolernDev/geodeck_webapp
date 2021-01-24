import React from "react";
import { Card, CardBody } from "reactstrap";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ChartSetting from "./ChartSetting";

const PlotCard = ({
  t,
  index,
  plotId,
  currentPlotId,
  selectedPlot,
  setSelectedPlot,
  children,
  number,
  disable,
}) => (
  <div
    className="simulation__plot__card"
    onClick={() => (!disable ? setSelectedPlot(index) : "")} // disable: for two first charts
  >
    <div
      className={`simulation__plot__chart ${
        selectedPlot === index ? "selected" : ""
      }`}
    >
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <h5 className="bold-text d-flex align-items-center">{`Plot ${number}`}</h5>
            <h5 className="bold-text">
              <ChartSetting
                plotId={plotId}
                currentPlotId={currentPlotId}
                setSelectedPlot={setSelectedPlot}
              />
            </h5>
          </div>
          {children}
        </CardBody>
      </Card>
    </div>
  </div>
);

PlotCard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(PlotCard);

// {plot.type === "scatter" ? (
//   <React.Fragment>
//     <p>{`${name} Export`}</p>
//     <div className="simulation__plot__chart" style={{ height: 400 }}>
//       <PlotChart name={name} data={dataArray} />
//     </div>
//   </React.Fragment>
// ) : (
//   <React.Fragment>
//     <p>{`${plot.name} Export`}</p>
//     <div className="simulation__plot__chart">
//       <img height="250px" src={`${process.env.PUBLIC_URL}/img/co2.png`} />
//     </div>
//   </React.Fragment>
// )}
