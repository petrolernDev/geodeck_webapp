import React from "react";
import {
  AreaChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartFilled,
  PieChartOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { createPlot } from "../../../../redux/actions/plotAction";
import { connect } from "react-redux";
import { baseUrl } from "../../../../baseUrl";

// const icons = [
//   { name: "pie", type: "pie", element: <PieChartFilled /> },
//   { name: "area", type: "area", element: <AreaChartOutlined /> },
//   { name: "bar", type: "bar", element: <BarChartOutlined /> },
//   { name: "radar", type: "radar", element: <RadarChartOutlined /> },
//   { name: "scatter", type: "scatter", element: <DotChartOutlined /> },
//   { name: "line", type: "line", element: <LineChartOutlined /> },
// ];

const icons = [
  { name: "bar", type: "bar", img: "1H.png" },
  { name: "pie", type: "pie", img: "2H.png" },
  { name: "radar", type: "radar", img: "3H.png" },
  { name: "area", type: "area", img: "4H.png" },
  { name: "line", type: "line", img: "5H.png" },
  { name: "scatter", type: "scatter", img: "6H.png" },
];

const PlotCreate = (props) => {
  const onCreate = (type) => {
    // template => {id: 2, name: "Scatter", type: "scatter" },
    switch (type) {
      case "scatter": {
        props.createPlot({ name: "Scatter", type: "scatter" });
        break;
      }

      case "line": {
        props.createPlot({ name: "Line", type: "line" });
        break;
      }
    }
  };

  return (
    <div className="simulation__plot__card new">
      <p>Add New Plot</p>
      <div className="simulation__plot__chart new">
        {icons.map(({ name, type, img }, index) => (
          <figure key={index} onClick={() => onCreate(type)}>
            <img
              src={`${baseUrl}/plotIcon/${img}`}
              alt={name}
              className="icon__img"
            />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { createPlot })(PlotCreate);
