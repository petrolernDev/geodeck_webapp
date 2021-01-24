import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import themeReducer from "./themeReducer";
import rtlReducer from "./rtlReducer";
import sidebarReducer from "./sidebarReducer";
import cryptoTableReducer from "./cryptoTableReducer";
import newOrderTableReducer from "./newOrderTableReducer";
import customizerReducer from "./customizerReducer";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import appConfigReducer from "./appConfigReducer";
import covidReducer from "../../containers/Maps/VectorMapWithRequestData/redux/covidReducer";

import threeReducer from "./threeReducer";
import projectReducer from "./projectReducer";
import galleryReducer from "./galleryReducer";
import simulationReducer from "./simulationReducer";
import plotReducer from "./plotReducer";

export default combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  appConfig: appConfigReducer,
  sidebar: sidebarReducer,
  cryptoTable: cryptoTableReducer,
  newOrder: newOrderTableReducer,
  customizer: customizerReducer,
  user: authReducer,
  covid: covidReducer,
  todo: todoReducer,
  three: threeReducer,
  // user defined reducers
  projects: projectReducer,
  galleries: galleryReducer,
  simulations: simulationReducer,
  plots: plotReducer,
});
