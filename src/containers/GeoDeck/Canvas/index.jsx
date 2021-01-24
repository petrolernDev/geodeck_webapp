import React from "react";
import { withTranslation } from "react-i18next";
import Cube from "../../Three";
import VRScene from "../../Aframe";
import MultipleYAxesScatterChart from "../../Charts/Recharts/components/MultipleYAxesScatterChart";
import jet from "./jet.png";
import SimulationView from "../SimulationView";
import SimulationChart from "../SimulationChart";
import Icon from "@ant-design/icons";

const MainContainer = ({
  isTabsDisable,
  detailBar,
  controlBar,
  xy,
  toggleDetailBar,
  toggleControlBar,
  toggleXY,
  tab,
  setTab,
}) => {
  const renderGraph = () => {
    switch (tab) {
      case 0:
        return <Cube />;
      case 1:
        return <SimulationChart controlBar={controlBar} />;
      // return <MultipleYAxesScatterChart />;
      case 2:
        return <VRScene />;
      case 3:
        return <SimulationView controlBar={controlBar} />;
      default:
        return <Cube />;
    }
  };

  const renderPageSetting = () => {
    return (
      <div className="d-flex page-setting">
        <div
          className={` setting icon__toggle--bottom-bar ${
            !isTabsDisable && !controlBar ? "active" : ""
          }`}
          onClick={!isTabsDisable ? toggleControlBar : undefined}
        />
        <div
          className={` setting icon__toggle--side-bar ${
            !isTabsDisable && !detailBar ? "active" : ""
          }`}
          onClick={!isTabsDisable ? toggleDetailBar : undefined}
        />
      </div>
    );
  };

  return (
    <>
      {renderGraph()}
      <div>
        <div className="d-flex">
          <div
            className={`icon__button ${tab === 0 ? "selected" : ""}`}
            onClick={() => setTab(0)}
          >
            3D
          </div>
          <div
            className={`icon__button ${tab === 1 ? "selected" : ""}`}
            onClick={() => setTab(1)}
          >
            ST
          </div>
          <div
            className={`icon__button ${tab === 2 ? "selected" : ""}`}
            onClick={() => setTab(2)}
          >
            VR
          </div>
        </div>
        {/* <div style={{ width: "300px" }}>
          <img width="300" src={jet} alt="jet-color-map" />
        </div> */}
        {renderPageSetting()}
      </div>
    </>
  );
};

export default withTranslation("common")(MainContainer);
