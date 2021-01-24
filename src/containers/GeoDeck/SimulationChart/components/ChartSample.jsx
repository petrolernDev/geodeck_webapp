import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Polar } from "react-chartjs-2";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { increaseLegend } from "./hepler";

const data = {
  datasets: [
    {
      data: [11, 18, 7, 14],

      backgroundColor: ["#80D0FF", "#B0EC9B", "#F69186", "#FFD780"],
      borderColor: "rgba(255,255,255,0.54)",
    },
  ],
  labels: ["Simulation 1", "Simulation 2", "Simulation 3", "Simulation 4"],
};

const activeGray = "#d5d5d5";
const inactiveGray = "#929292";

const options = {
  legend: {
    labels: {
      fontColor: activeGray,
    },
  },
  // layout: {
  //   padding: {
  //     top: 20,
  //   },
  // },
  scale: {
    gridLines: {
      color: inactiveGray,
      borderDash: [3, 3],
    },
    ticks: {
      fontColor: activeGray,
    },
  },
};

const ChartSample = ({ t }) => (
  <Polar
    data={data}
    options={options}
    plugins={[
      {
        beforeInit: increaseLegend,
      },
    ]}
  />
);

ChartSample.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(ChartSample);
