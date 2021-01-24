import React, { useState } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import {
  CheckCircleOutlined,
  CheckCircleFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import MainContainer from "../GeoDeck/Canvas";
import Toolbar from "../GeoDeck/Toolbar";
import InfoExport from "../GeoDeck/InfoExport";
import DetailChart from "../GeoDeck/DetailChart";
import Variables from "../GeoDeck/Variables";
import Player from "../GeoDeck/Player";
import SimulationLoader from "../GeoDeck/SimulationLoader";
// import { withTranslation } from 'react-i18next';

const VisDash = () => {
  const [tab, setTab] = useState(0);

  const isTabsDisable = tab !== 0;
  const isToolbarEnable = tab === 0 || tab === 2;
  const [toggleDetailBar, setToggleDetailBar] = useState(false);
  const [toggleControlBar, setToggleControlBar] = useState(false);
  const [toggleXY, setToggleXY] = useState(false);

  const onToggleDetailBar = () => setToggleDetailBar(!toggleDetailBar);
  const onToggleControlBar = () => setToggleControlBar(!toggleControlBar);
  const onToggleXY = () => setToggleXY(!toggleXY);

  // console.log(`tab: ${tab}`);
  // console.log(`detail: ${toggleDetailBar}`);
  // console.log(`control: ${toggleControlBar}`);
  return (
    <div className="geodeck-app">
      <div className="tool-bar">
        <Toolbar isToolbarEnable={isToolbarEnable} />
      </div>
      <div className="geodeck-canvas">
        <div className="chart-container">
          <MainContainer
            tab={tab}
            setTab={setTab}
            detailBar={toggleDetailBar}
            controlBar={toggleControlBar}
            xy={toggleXY}
            isTabsDisable={isTabsDisable}
            toggleDetailBar={onToggleDetailBar}
            toggleControlBar={onToggleControlBar}
            toggleXY={onToggleXY}
            style={{ width: "100%" }}
          />
        </div>
        <div
          className={`control-bar ${
            toggleControlBar || isTabsDisable ? "hide" : ""
          }`}
        >
          <Variables />
          <div>&nbsp;</div>
          <Player />
          <div>&nbsp;</div>
          <SimulationLoader tab={tab} setTab={setTab} />
        </div>
      </div>
      <div
        className={`detail-bar ${
          toggleDetailBar || isTabsDisable ? "hide" : ""
        }`}
      >
        <DetailChart />
        <InfoExport />
      </div>
    </div>
  );
};

// const VisDash = () => (
//   <Container className="dashboard">
//     <Row>
//       <Col md={2}>
//         <Card>
//           <CardBody>
//             <div className="card__title">
//               <h5 className="bold-text">Variable Picker</h5>
//               <h5 className="subhead">Select Variable to Visualize</h5>
//             </div>
//             <div style={{height: '500px'}}>test</div>
//           </CardBody>
//         </Card>
//       </Col>
//       <Col md={7}>
//         <Row>
//           <MainContainer style={{width:'100%'}}/>
//         </Row>
//         <Row>
//           <Card>
//             <CardBody>
//               <div className="card__title">
//                 <h5 className="bold-text">Time</h5>
//                 <h5 className="subhead">set the time for <span className="red-text">data</span></h5>
//               </div>
//               <Slider min={0} max={129} value={34} />
//             </CardBody>
//           </Card>
//         </Row>
//       </Col>
//       <Col md={3}>
//         <Card>
//           <CardBody>
//             <div className="card__title">
//               <h5 className="bold-text">Variable Picker</h5>
//               <h5 className="subhead">Select Variable to Visualize</h5>
//             </div>
//             <div style={{height: '500px'}}>test</div>
//           </CardBody>
//         </Card>
//       </Col>
//     </Row>
//   </Container>
// );

export default VisDash;
