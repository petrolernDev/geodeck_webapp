import React, { useEffect, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";

const ChartScatter = (props) => {
  // const ChartScatter = React.forwardRef((props, ref) => {
  // const chartRef = ref;
  // const imgRef = useRef(null);

  // const [chartInstance, setChartInstance] = useState(null);

  // useEffect(() => {
  //   setChartInstance(chartRef.current);
  // }, []);

  const { dataList, options, plugins } = props;

  const datasets = dataList.map(({ name, xYData, color }) => {
    return {
      label: name,
      fill: false,
      lineTension: 0.3,
      backgroundColor: color,
      borderColor: color,
      // borderWidth: 1,
      // borderDash: [3, 3],
      pointBackgroundColor: color,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      pointHitRadius: 10,
      data: xYData,
    };
  });

  const scatterData = {
    labels: [],
    datasets: datasets,
  };
  // const onClick = () => {
  //   imgRef.current.click();
  // }

  // imgRef = chartRef.current.chartInstance.toBase64Image();
  // console.log(chartRef.current.chartInstance.toBase64Image());
  // console.log(chartRef);
  // if (chartInstance) {
  //   // imgRef.current.href = chartInstance.chartInstance.toBase64Image();
  //   const ctx = chartInstance.chartInstance.ctx;
  //   const canvas = ctx?.canvas;
  //   // console.log(ctx);
  //   // console.log(canvas);
  //   // canvas.toBlob(function (blob) {
  //   //   saveAs(blob, "");
  //   // })
  //   // imgRef.current.innerText = "download";
  //   // imgRef.current.download = "download.png";
  //   // imgRef.current.href = canvas
  //   //   ? canvas.toBlob(function (blob) {
  //   //       saveAs(blob, "pretty image.png");
  //   //     })
  //   //   : "#";
  //   // imgRef.current.href = canvas ? canvas.toDataURL("image/png") : "#";
  //   // window.open(canvas);

  //   imgRef.current.download = "download.png";
  //   imgRef.current.innerText = "download";
  //   imgRef.current.href = canvas?.toDataURL("image/png");
  //   imgRef.current.target="_blank"
  //   // imgRef.current.href = chartRef.current.chartInstance.toBase64Image();
  //   // imgRef.current.click();

  //   // }
  // // }

  // console.log(chartInstance);

  // };
  return (
    <React.Fragment>
      <Scatter
        // ref={chartRef}
        // onElementsClick={onClick}
        data={scatterData}
        options={options}
        plugins={plugins}
      />
      {/* <a ref={imgRef} /> */}
    </React.Fragment>
  );
};

export default ChartScatter;

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

//----------------------------------------------

// const options = {
//   scales: {
//     xAxes: [
//       {
//         scaleLabel: {
//           display: true,
//           labelString: "time",
//         },
//         type: "linear",
//         position: "bottom",
//       },
//     ],

//     yAxes: [
//       {
//         scaleLabel: {
//           display: true,
//           labelString: `${variableName} (${variableUnit})`,
//         },
//       },
//     ],
//   },
// };
