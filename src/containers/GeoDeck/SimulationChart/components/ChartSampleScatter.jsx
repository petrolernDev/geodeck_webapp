import React, { Component } from "react";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
import { Scatter } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import { increaseLegend } from "./hepler";

const tooltipColor = {
  color: "#70bbfd",
};

// const data = {
//   labels: ["January", "February", "March", "April", "May"],
//   datasets: [
//     {
//       label: "Blue",
//       fill: false,
//       lineTension: 0.3,
//       backgroundColor: "#36A2EB",
//       borderColor: "#36A2EB",
//       borderWidth: 1,
//       borderDash: [5, 3],
//       pointBackgroundColor: "#36A2EB",
//       pointHoverRadius: 3,
//       pointHoverBorderWidth: 1,
//       pointRadius: 2,
//       pointHitRadius: 10,
//       data: [
//         { x: 0, y: 65 },
//         { x: 1, y: 68 },
//         { x: 2, y: 98 },
//         { x: 3, y: 85 },
//         { x: 4, y: 34 },
//       ],
//     },
//     {
//       label: "Red",
//       fill: false,
//       lineTension: 0.3,
//       backgroundColor: "#FF6384",
//       borderColor: "#FF6384",
//       borderWidth: 1,
//       borderDash: [3, 3],
//       pointBackgroundColor: "#FF6384",
//       pointHoverRadius: 2,
//       pointHoverBorderWidth: 1,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [
//         { x: 0, y: 75 },
//         { x: 1, y: 34 },
//         { x: 2, y: 49 },
//         { x: 3, y: 78 },
//         { x: 4, y: 18 },
//       ],
//     },
//   ],
// };

const rawData = [
  { x: 0, y: 754.6666666286 },
  { x: 1, y: 1147.430274286 },
  { x: 2, y: 880.2811447286 },
  { x: 3, y: 302.202702286 },
  { x: 4, y: 919.7417865286 },
  { x: 5, y: 1732.5593221286 },
  { x: 6, y: 241.0933068286 },
  { x: 7, y: 249.9505939286 },
  { x: 8, y: 755.6415668286 },
  { x: 9, y: 461.4841470286 },
  { x: 10, y: 1765.8065843286 },
  { x: 11, y: 1986.4678051286 },
  { x: 12, y: 1572.0342567286 },
  { x: 13, y: 1395.808010286 },
  { x: 14, y: 1277.2955480286 },
  { x: 15, y: 1479.1527076286 },
  { x: 16, y: 1582.7988385286 },
  { x: 17, y: 782.6647514286 },
  { x: 18, y: 384.7939113286 },
  { x: 19, y: 686.1742445286 },
  { x: 20, y: 788.9633285286 },
  { x: 21, y: 1189.2157286 },
  { x: 22, y: 589.2845755286 },
  { x: 23, y: 648.9226864286 },
  { x: 24, y: 789.7514284286 },
];
// ["#80D0FF", "#B0EC9B", "#F69186", "#FFD780"]
class ChartSampleScatter extends Component {
  render() {
    const datasets = [
      {
        label: "Simulation",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#80D0FF",
        borderColor: "#80D0FF",
        // borderWidth: 1,
        // borderDash: [3, 3],
        pointBackgroundColor: "#80D0FF",
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 10,
        data: rawData,
      },
    ];

    const scatterData = {
      labels: [],
      datasets: datasets,
    };

    const activeGray = "#d5d5d5";
    const inactiveGray = "#929292";

    const options = {
      legend: {
        labels: {
          fontColor: activeGray,
        },
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Timestep",
              fontColor: activeGray,
            },
            type: "linear",
            position: "bottom",
            gridLines: {
              color: inactiveGray,
              borderDash: [1, 1],
            },
            ticks: {
              fontColor: activeGray,
            },
          },
        ],

        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Temperature (\u00b0C)",
              fontColor: activeGray,
            },
            gridLines: {
              color: inactiveGray,
              borderDash: [1, 1],
            },
            ticks: {
              fontColor: activeGray,
            },
          },
        ],
      },
    };

    return (
      <React.Fragment>
        <Scatter
          data={scatterData}
          options={options}
          plugins={[
            {
              beforeInit: increaseLegend,
            },
          ]}
        />

        {/* <ResponsiveContainer>
              <ScatterChart
                // height={400}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis type="number" dataKey="x" reversed={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis type="number" dataKey="y" stroke="#70bbfd" />
                <Tooltip itemStyle={tooltipColor} />

                {data.map((d) => {
                  let rColor = Math.floor(Math.random() * 16777215).toString(
                    16
                  );
                  return <Scatter name={name} data={d} fill={`#${rColor}`} />;
                })}
              </ScatterChart>
            </ResponsiveContainer> */}

        {/* <ResponsiveContainer> */}
        {/* <ScatterChart
          //   height={400}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis type="number" dataKey="x" reversed={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" dataKey="y" stroke="#70bbfd" />
          <Tooltip itemStyle={tooltipColor} />

          {data.map((d) => {
            let rColor = Math.floor(Math.random() * 16777215).toString(16);
            return <Scatter name={name} data={d} fill={`#${rColor}`} />;
          })}
        </ScatterChart> */}
        {/* </ResponsiveContainer> */}
      </React.Fragment>
    );
  }
}

export default ChartSampleScatter;
