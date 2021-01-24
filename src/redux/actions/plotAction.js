import * as types from "../types";
import _ from "lodash";

export const fetchPlots = () => async (dispatch) => {
  //   const response = await api.get("/plots");
  const plots = getPlots;
  const newPlots = plots.map((plot) => {
    return { ...plot, simulations: getPlotStructures(getSimsT) };
  });
  const response = { data: newPlots };
  dispatch({ type: types.FETCH_PLOTS, payload: response.data });
};

let newPlotId = 1;

export const createPlot = (formValues) => async (dispatch, getState) => {
  //   const response = await api.get("/plots");
  const newPlot = {
    id: ++newPlotId,
    // id: _.size(getState().plots) + 1, // have bug => two chart with one 1
    // id: _.random(10, 16515), // change order of charts
    ...formValues,
    simulations: getPlotStructures(getSimsT),
  };
  const response = { data: newPlot };
  dispatch({ type: types.CREATE_PLOT, payload: response.data });
};

export const editPlot = (plotId, editObject) => async (dispatch, getState) => {
  //   const response = await api.patch(`/plots/$plotId`. editObject);

  const editPlot = Object.values(getState().plots).find(
    (plot) => plot.id === plotId
  );
  editPlot.simulations = {
    ...editPlot.simulations,
    ...editObject,
  };
  const response = { data: editPlot };

  dispatch({ type: types.UPDATE_PLOT, payload: response.data });
};

export const deletePlot = (id) => async (dispatch, getState) => {
  //   const response = await api.delete(`plots/id`);
  dispatch({ type: types.DELETE_PLOT, payload: id });
};

const initialState = {
  data: [],
  currentIds: [],
  variableId: null,
  pointId: null,
  lineId: null,
  isPoint: true,
};

const getPlotStructures = (payload) => {
  if (!payload) {
    return initialState;
  }

  const payloadData = payload[0]?.data;

  const payloadPoints = payloadData ? payloadData[0]?.points : null;
  const payloadLines = payloadData ? payloadData[0]?.lines : null;
  return {
    data: payload,
    currentIds: [payloadData[0]?.id],
    variableId: payloadData ? payloadData[0]?.id : null,
    pointId: payloadPoints ? payloadPoints[0]?.id : null,
    lineId: payloadLines ? payloadLines[0]?.id : null,
    isPoint: true,
  };
};

const getPlots = [
  { id: 1, name: "Line", type: "line" },
  // {id: 2, name: "Scatter", type: "Scatter" },
];

const pointsData = [
  154.6666666286,
  257.430274286,
  380.2811447286,
  402.202702286,
  519.7417865286,
  632.5593221286,
  741.0933068286,
  849.9505939286,
  955.6419668286,
  1061.4841470286,
  1165.8065843286,
  1269.4678051286,
  1372.0342567286,
  1475.808010286,
  1577.2955480286,
  1679.1527076286,
  1782.7988385286,
  1584.6647514286,
  1386.7939113286,
  1288.1742445286,
  1189.9633285286,
  991.2157286,
  1092.2845755286,
  1393.9226864286,
  1594.7514284286,
];

const pointsData1 = [
  1554.6666666286,
  1557.430274286,
  1580.2811447286,
  1502.202702286,
  1515.7417865286,
  1532.5593221286,
  1541.0933068286,
  1549.9505939286,
  1555.6415668286,
  1561.4841470286,
  1565.8065843286,
  1569.4678051286,
  1572.0342567286,
  1575.808010286,
  1577.2955480286,
  1579.1527076286,
  1582.7988385286,
  1584.6647514286,
  1586.7939113286,
  1588.1742445286,
  1589.9633285286,
  1591.2157286,
  1592.2845755286,
  1593.9226864286,
  1594.7514284286,
];

const pointsData2 = [
  754.8666666666666,
  1557.143027497194,
  880.1281144781146,
  302.820270253036,
  919.5741786552392,
  1732.2559322178006,
  241.9093306805426,
  249.5950593901985,
  755.7641966806104,
  461.4484147025812,
  1765.5806584362133,
  1969.4467805155932,
  1572.6034256708492,
  1375.180801066218,
  1277.6295548073324,
  1479.8152707631875,
  782.6798838553889,
  384.8664751470942,
  686.5793911335575,
  788.1174244549875,
  1189.5963328571909,
  591.0215711407,
  692.4284575553518,
  793.6922686460566,
  894.9751428425668,
];

const pointsData3 = [
  1804.6666666666,
  1857.027497194,
  1746.1144781146,
  1493.270253036,
  1349.1786552392,
  756.9322178006,
  1349.3306805426,
  1497.0593901985,
  1439.1966806104,
  1763.4147025812,
  685.6584362133,
  486.7805155932,
  749.4256708492,
  1863.801066218,
  354.5548073324,
  1796.2707631875,
  1357.8838553889,
  983.4751470942,
  567.3911335575,
  1816.4244549875,
  165.3328571909,
  758.5711407,
  725.4575553518,
  597.2686460566,
  1994.1428425668,
];

const getSimsT = [
  {
    id: 1,
    name: "simulation 1",
    data: [
      {
        id: 1,
        name: "pressure",
        unit: "PSI",
        points: [
          {
            id: 1,
            name: "Near Well 1 sim 1",
            data: pointsData,
          },
          {
            id: 2,
            name: "Right Bell sim 1",
            data: pointsData2,
          },
        ],
        lines: [
          {
            id: 1,
            name: "Near Well 1 sim 1",
            data: pointsData,
          },
        ],
      },

      {
        id: 2,
        name: "temperature",
        unit: "\u00b0C",
        points: [
          {
            id: 1,
            name: "Near Well 1",
            data: pointsData3,
          },
          {
            id: 2,
            name: "Right Bell",
            data: pointsData1,
          },
        ],
        lines: [
          {
            id: 1,
            name: "Near Well 1",
            data: pointsData2,
          },
        ],
      },

      {
        id: 3,
        name: "saturation",
        unit: "-",

        points: [
          {
            id: 1,
            name: "Near Well 1",
            data: pointsData3,
          },
          {
            id: 2,
            name: "Right Bell",
            data: pointsData1,
          },
        ],
        lines: [
          {
            id: 1,
            name: "Near Well 1",
            data: pointsData2,
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "simulation 2",
    data: [
      {
        id: 1,
        name: "pressure",
        unit: "PSI",
        points: [
          {
            id: 1,
            name: "Near Well 1 sim 2",
            data: pointsData3,
          },
          {
            id: 2,
            name: "Right Bell sim 2",
            data: pointsData1,
          },
        ],
        lines: [
          {
            id: 1,
            name: "Near Well 1 sim 2",
            data: pointsData2,
          },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "simulation 3",
    data: [
      {
        id: 1,
        name: "pressure",
        unit: "PSI",
        points: [
          {
            id: 1,
            name: "Near Well 1 sim 3",
            data: pointsData2,
          },
          {
            id: 2,
            name: "Right Bell sim 3",
            data: pointsData3,
          },
          {
            id: 3,
            name: "Left Bell sim 3",
            data: pointsData1,
          },
          {
            id: 4,
            name: "Top Bell sim 3",
            data: pointsData,
          },
        ],
        lines: [
          {
            id: 1,
            name: "Near Well 1 sim 3",
            data: pointsData3,
          },
        ],
      },
    ],
  },
];
