import _ from "lodash";
import {
  FETCH_SIMULATIONS,
  FETCH_SIMULATION,
  CREATE_SIMULATION,
  UPDATE_SIMULATION,
  SET_SIMULATION_CUREENT,
} from "../types";

const initialState = {
  data: [],
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIMULATIONS:
      return {
        ...state,
        data: { ..._.mapKeys(action.payload, "id") },
        current: action.payload[0]?.id,
      };
    case FETCH_SIMULATION:
      return {
        ...state,
        current: action.payload.id,
        [action.payload.id]: action.payload,
      };

    case CREATE_SIMULATION: {
      let oldData = state.data;
      return {
        ...state,
        current: action.payload.id,
        data: { ...oldData, [action.payload.id]: action.payload },
      };
    }
    case UPDATE_SIMULATION: {
      let oldData = state.data;
      return {
        ...state,
        data: { ...oldData, [action.payload.id]: action.payload },
      };
    }
    case SET_SIMULATION_CUREENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

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
