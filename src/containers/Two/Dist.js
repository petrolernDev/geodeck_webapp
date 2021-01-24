import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { connect } from "react-redux";

const theme = {
  textColor: "#d5d5d5",
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: "#d5d5d5",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#d5d5d5",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "#d5d5d5",
      strokeWidth: 0,
    },
  },
};
const data = [
  {
    country: "1.6k",
    pressure: 53,
    pressureColor: "#FFCE56",
  },
  {
    country: "1.7k",
    pressure: 100,
    pressureColor: "#FFCE56",
  },
  {
    country: "1.8k",
    pressure: 153,
    pressureColor: "#FFCE56",
  },
  {
    country: "1.9k",
    pressure: 43,
    pressureColor: "#FFCE56",
  },
  {
    country: "2.0k",
    pressure: 11,
    pressureColor: "#FFCE56",
  },
];

const dataT = [
  {
    country: "100",
    pressure: 23,
    pressureColor: "#FFCE56",
  },
  {
    country: "110",
    pressure: 89,
    pressureColor: "#FFCE56",
  },
  {
    country: "120",
    pressure: 93,
    pressureColor: "#FFCE56",
  },
  {
    country: "130",
    pressure: 9,
    pressureColor: "#FFCE56",
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Dist = ({ three }) => (
  <div style={{ height: "300px" }}>
    <ResponsiveBar
      data={three.sample.variable === "Temprature" ? dataT : data}
      theme={theme}
      keys={["pressure"]}
      indexBy="country"
      margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
      // margin={{ top: 40, right: 40, bottom: 60, left: 65 }}

      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#80D0FF", "#B0EC9B", "#F69186", "#FFD780"]}
      // colors={["#00a1ff7a", "#60d9377a", "#ed220d7a", "feae00"]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: three.sample.variable + (three.sample.variable.search(/pre/i)>=0? ' (Psi)' : ' (°F)'),
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Distribution",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

function mapStateToProps({ three }) {
  return {
    three,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dist);
