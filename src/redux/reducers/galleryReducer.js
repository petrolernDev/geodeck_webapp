import _ from "lodash";
import * as types from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GALLERIES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};