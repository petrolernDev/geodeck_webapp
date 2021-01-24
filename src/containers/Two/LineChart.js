import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import pressData from "./pressure_point.json";
import tempData from "./temp_point.json";
import { ResponsiveLine } from "@nivo/line";

const activeGray = "#d5d5d5";
const inactiveGray = "#929292";
const theme = {
  textColor: activeGray,
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: activeGray,
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: activeGray,
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: inactiveGray,
      strokeWidth: 0.5,
    },
  },
};
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const norm = (m = 10) => {
  let out = Array(m).fill(1);
  return out.map((_, ind) => {
    if (ind < m / 2) {
      return 1805 + ind * 18 * Math.random();
    } else {
      return 1870 - (ind - 5) * 20 * Math.random();
    }
  });
};
const minMax = (p) => {
  if (p) return [1800, 1870];
  else return [120, 122];
};
const MyResponsiveLine = ({ three }) => {
  const [data, setData] = useState([pressData[0]]);

  useEffect(() => {
    document.addEventListener(
      "sample-update",
      (e) => {
        let tmp = data.map((d) => {
          return {
            id: d.id,
            color: d.color,
            data: d.data.map((p) => ({ ...p, y: p.y + 2 * Math.random() })),
          };
        });
        if (e.detail.addPoint) {
          tmp.push(pressData[1]);
        }
        setData(tmp);
      },
      false
    );
  }, [data, three]);

  useEffect(() => {
    if (three.activeWidget === "line") {
      const t = norm();
      let tmp = [
        {
          ...pressData[0],
          id: "line 1",
          data: Array(10)
            .fill(1)
            .map((_, ind) => ({
              x: ind,
              y: t[ind],
              Temprature: 120.2,
              Pressure: 1801,
              Saturation: 90,
            })),
        },
      ];
      setData(tmp);
    } else {
    }
  }, [three]);

  const m = minMax(three.sample.variable !== "Temprature");

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveLine
        data={three.sample.variable === "Temprature" ? tempData : data}
        // margin={{ top: 10, right: 0, bottom: 40, left: 50 }}
        // margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
        margin={{ top: 20, right: 25, bottom: 60, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: m[0],
          max: m[1],
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues : Array(12).fill(0).map((_, ind) => 2*ind),
          legend: three.activeWidget === "line" ? "Y (meter)" : "Timestep",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: three.sample.variable || "Pressure (Psi)",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={theme}
        colors={["#80D0FF", "#60d93780", "#ed220d80", "feae0080"]}
        // colors={["#00a1ff7a", "#60d9377a", "#ed220d7a", "feae00"]}
        // tooltip={({ point }) => {
        //   return (
        //     <div
        //       className="nivo-tooltop"
        //       style={{
        //         background: "#929292",
        //         padding: "12px 16px",
        //       }}
        //     >
        //       <span>{`T: ${point.data.Temprature.toFixed(2)}`}</span>
        //       <br />
        //       <span>{`P: ${point.data.Pressure.toFixed(2)}`}</span>
        //       <br />
        //       <span>{`Saturation: ${point.data.Saturation.toFixed(2)}`}</span>
        //     </div>
        //   );
        // }}
        legends={[
          {
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 10,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

function mapStateToProps({ three }) {
  return {
    three,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyResponsiveLine);
