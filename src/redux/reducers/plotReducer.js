import _ from "lodash";
import { FETCH_PLOTS, CREATE_PLOT, UPDATE_PLOT, DELETE_PLOT } from "../types";

const initialState = [
  {
    name: "",
    type: "",
    simulations: {
      data: [],
      currentIds: [],
      variableId: null,
      pointId: null,
      lineId: null,
      isPoint: true,
    },
  },
];

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PLOTS: {
      return {
        ...state,
        ..._.mapKeys(action.payload, "id"),
      };
    }
    case CREATE_PLOT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case UPDATE_PLOT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_PLOT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

// const getPlots = (payload) => {
//   if (!payload) {
//     return initialState;
//   }

//   const payloadData = payload[0]?.data;

//   const payloadPoints = payloadData ? payloadData[0]?.points : null;
//   const payloadLines = payloadData ? payloadData[0]?.lines : null;
//   return {
//     data: payload,
//     currentIds: [payloadData[0]?.id],
//     variableId: payloadData ? payloadData[0]?.id : null,
//     pointId: payloadPoints ? payloadPoints[0]?.id : null,
//     lineId: payloadLines ? payloadLines[0]?.id : null,
//     isPoint: true,
//   };
// };

// import _ from 'lodash';
// import {
//   FETCH_STREAM,
//   FETCH_STREAMS,
//   CREATE_STREAM,
//   EDIT_STREAM,
//   DELETE_STREAM
// } from '../actions/types';

// export default (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_STREAMS:
//       return { ...state, ..._.mapKeys(action.payload, 'id') };
//     case FETCH_STREAM:
//       return { ...state, [action.payload.id]: action.payload };
//     case CREATE_STREAM:
//       return { ...state, [action.payload.id]: action.payload };
//     case EDIT_STREAM:
//       return { ...state, [action.payload.id]: action.payload };
//     case DELETE_STREAM:
//       return _.omit(state, action.payload);
//     default:
//       return state;
//   }
// };
