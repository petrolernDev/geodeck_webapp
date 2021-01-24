import * as types from "../types";
import _ from "lodash";

export const fetchSimulations = () => async (dispatch) => {
  //   const response = await api.get("/sims");
  const response = getSims;
  dispatch({
    type: types.FETCH_SIMULATIONS,
    payload: response.data,
  });
};

export const fetchSimulation = (id) => async (dispatch, getState) => {
  //   const response = await api.get("`/sims/${id}`);
  const state = getState();
  const simulations = { state };
  const response = { data: simulations.data.filter((sim) => sim.id === id) };
  dispatch({
    type: types.FETCH_SIMULATION,
    payload: response.data,
  });
};

export const createSimulation = (formValues) => async (dispatch, getState) => {
  // const response = await api.post("/sims", formValues);
  const state = getState();
  const { data } = state.simulations;
  const size = _.size(data) + 1;

  const response = {
    data: {
      id: size,
      name: `simulation ${size}`,
      color: "#1f8705",
      isLoaded: true,
      editable: true,
      parameters: getParameters,
    },
  };
  dispatch({
    type: types.CREATE_SIMULATION,
    payload: response.data,
  });
};

export const editSimulation = (newSimulation) => async (dispatch) => {
  // const response = await api.patch(`/sims/${id}`, newParameters); // return updated simulation object
  dispatch({ type: types.UPDATE_SIMULATION, payload: newSimulation });
};

export const setCurrent = (id) => async (dispatch) => {
  dispatch({
    type: types.SET_SIMULATION_CUREENT,
    payload: id,
  });
};



const getParameters = [
  {
    label: "Grid Blocks",
    value: 652620,
    unit: "number",
    max: "infinity",
    min: 1000,
    editable: "yes",
  },
  {
    label: "Time Step Size",
    value: 1,
    unit: "second",
    max: "infinity",
    min: 0.001,
    editable: "yes",
  },
  {
    label: "Time Duration",
    value: 1,
    unit: "second",
    max: "infinity",
    min: 86400,
    editable: "yes",
  },
  {
    label: "Number of wells",
    value: 4,
    unit: "number",
    max: 100,
    min: 1,
    editable: "yes",
  },
  {
    label: "Gas Injection Rate",
    value: 35,
    unit: "SCF/day",
    max: "infinity",
    min: 0,
    editable: "yes",
  },
  {
    label: "Water Injection Rate",
    value: 35,
    unit: "STB/day",
    max: "infinity",
    min: 0,
    editable: "yes",
  },
  {
    label: "Rock Heat Capacity",
    value: 0.21,
    unit: "BTU/(lb degF)",
    max: 0.6,
    min: 0.1,
    editable: "yes",
  },
  {
    label: "Rock Thermal Conductivity",
    value: 1,
    unit: "BTU/(hr ft degF)",
    max: 2,
    min: 0.5,
    editable: "yes",
  },
];
const getSims = {
  data: [
    {
      id: 1,
      name: "simulation 1",
      color: "#1f8705",
      isLoaded: true,
      editable: false,
      parameters: getParameters,
    },
    {
      id: 2,
      name: "simulation 2",
      color: "#2d9dbe",
      isLoaded: true,
      editable: false,
      parameters: getParameters,
    },
    {
      id: 3,
      name: "simulation 3",
      color: "#b81350",
      isLoaded: true,
      editable: false,
      parameters: getParameters,
    },
  ],
};
