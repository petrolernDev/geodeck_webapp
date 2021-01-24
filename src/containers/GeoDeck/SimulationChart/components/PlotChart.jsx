import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ChartLine from "./ChartLine";
import ChartSample from "./ChartSample";
import ChartScatter from "./ChartScatter";
import { getVariableUnit, increaseLegend } from "./hepler";

// const backgroundColor = ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"];
// const backgroundColor = ["#00a1ff7a", "#60d937", "#ed220d", "36A2EB"];
const backgroundColor = ["#80D0FF", "#B0EC9B", "#F69186", "#FFD780"];
const activeGray = "#d5d5d5";
const inactiveGray = "#929292";

const plugins = [
  {
    beforeInit: increaseLegend,
  },
];

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
          labelString: `variable`,
          // labelString: `${variableName} (${variableUnit})`,
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

class PlotChart extends React.Component {
  constructor(props) {
    super(props);
    // this.chartRef = React.createRef();
    // this.imgRef = React.createRef();
  }

  // componentDidMount () {
  //   this.chartRef = React.createRef();
  //   this.imgRef = React.createRef();
  // }

  getData = (simulations) => {
    const {
      data,
      currentIds,
      variableId,
      pointId,
      lineId,
      isPoint,
    } = simulations;

    const selectedSimulations = data.filter((sim) =>
      _.includes(currentIds, sim.id)
    ); // select simulations based on id of active simulations [active simulation set in simulation panel]

    let variableName = "variable"; // label for selected variable
    let variableUnit = "-"; // unit for selected variable
    const dataList = selectedSimulations.map((simulation, index) => {
      const name = simulation.name;
      const variable = simulation?.data.find(
        (variable) => variable.id === variableId
      ); // select active variable
      const pointLine = isPoint
        ? variable?.points.find((point) => point.id === pointId)
        : variable?.lines.find((line) => line.id === lineId); // select active points/lines

      const rawData = pointLine?.data; //initial data
      const xYData = pointLine?.data.map((data, index) => {
        return { x: index, y: data };
      }); // x/y data

      let color = "";
      if (index < 4) {
        color = backgroundColor[index];
      } else {
        let rColor = Math.floor(Math.random() * 16777215).toString(16);
        color = `#${rColor}`;
      }

      variableName = variable.name;
      variableUnit = variable.unit;

      return { name, xYData: xYData, rawData, color };
    });

    return {
      variableName,
      variableUnit,
      dataList,
    };
  };

  renderChart = (variableName, variableUnit, dataList) => {
    const { plot } = this.props;
    options.scales.yAxes.map((yAxes) => {
      yAxes.scaleLabel.labelString = _.capitalize(
        `${variableName} (${variableUnit})`
      );
    });

    switch (plot.type) {
      case "line":
        return (
          <ChartLine
            dataList={dataList}
            options={options}
            plugins={plugins}
            // ref={this.chartRef}
          />
        );
      case "scatter":
        // return null;
        return (
          <ChartScatter
            options={options}
            dataList={dataList}
            variableName={variableName}
            variableUnit={variableUnit}
            plugins={plugins}
            // ref={ref}
          />
        );

      default:
        // return null;
        return <ChartSample />;
    }
  };

  render() {
    // if (chartInstance) {
    //   const ctx = chartInstance.chartInstance.ctx;
    //   const canvas = ctx?.canvas;
    //   imgRef.current.download = "download.png";
    //   imgRef.current.innerText = "download";
    //   imgRef.current.href = canvas?.toDataURL("image/png");
    //   imgRef.current.target = "_blank";
    // }

    const { plot } = this.props;
    const { simulations } = plot; // get simulations for each plot
    if (_.isEmpty(simulations)) {
      return null;
    }
    const { variableName, variableUnit, dataList } = this.getData(simulations);

    // if(this.chartRef.current) {
    //   const chartInstance = this.chartRef.current.chartInstance ;
    //   if(!!chartInstance) {
    //     const ctx = chartInstance.ctx;
    //     const canvas = ctx?.canvas;

    //     this.imgRef.current.download = "download.png";
    //     this.imgRef.current.innerText = "download";
    //     this.imgRef.current.href = canvas?.toDataURL("image/png");
    //     this.imgRef.current.target="_blank"
    //   }
    // }

    return (
      <React.Fragment>
        {this.renderChart(variableName, variableUnit, dataList)}
        {/* <FancyButton ref={this.chartRef}>Click me!</FancyButton>; */}
        {/* <a ref={this.imgRef} /> */}
      </React.Fragment>
    );
  }
}

export default PlotChart;

// const FancyButton = React.forwardRef((props, ref) => {
//   return (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// )});
